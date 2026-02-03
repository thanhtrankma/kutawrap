import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function formatOrderMessage(body: {
  name: string;
  phone: string;
  address: string;
  note?: string;
  items: { name: string; comboName?: string; toppingNames?: string[]; quantity: number; price: number }[];
  total: number;
}): string {
  const lines = [
    "🛒 *ĐƠN HÀNG MỚI*",
    "",
    `👤 *Tên:* ${body.name}`,
    `📱 *SĐT:* ${body.phone}`,
    `📍 *Địa chỉ:* ${body.address}`,
    body.note ? `📝 *Ghi chú:* ${body.note}` : null,
    "",
    "*Món:*",
    ...body.items.map((i) => {
      const parts = [`• ${i.name} x${i.quantity} — ${(i.price * i.quantity).toLocaleString("vi-VN")}₫`];
      if (i.comboName) parts.push(`  (${i.comboName})`);
      if (i.toppingNames?.length) parts.push(`  + ${i.toppingNames.join(", ")}`);
      return parts.join("\n");
    }),
    "",
    `💰 *Tổng tiền:* ${body.total.toLocaleString("vi-VN")}₫`,
  ].filter(Boolean) as string[];

  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return NextResponse.json(
      { error: "Telegram chưa cấu hình (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)" },
      { status: 500 }
    );
  }

  let body: {
    name?: string;
    phone?: string;
    address?: string;
    note?: string;
    items?: { name: string; comboName?: string; toppingNames?: string[]; quantity: number; price: number }[];
    total?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const address = body.address?.trim();
  const items = body.items;
  const total = typeof body.total === "number" ? body.total : 0;

  if (!name || !phone || !address || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Thiếu name, phone, address hoặc items" },
      { status: 400 }
    );
  }

  const text = formatOrderMessage({
    name,
    phone,
    address,
    note: body.note?.trim(),
    items,
    total,
  });

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json(
      { error: "Telegram API lỗi: " + err },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
