# KUTAWRAP — Website bán đồ ăn nhanh (Hip-hop & Urban Style)

Next.js (App Router) + Tailwind CSS + Framer Motion. Gà rán, khoai chiên, combo — street vibe.

## Chạy dev

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Telegram thông báo đơn hàng

1. Tạo bot qua [@BotFather](https://t.me/BotFather), lấy token.
2. Nhắn tin cho bot, rồi mở: `https://api.telegram.org/bot<TOKEN>/getUpdates` để xem `chat_id`.
3. Tạo file `.env.local`:

```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

Khi khách nhấn **Thanh toán**, đơn (Tên, SĐT, Địa chỉ, Món, Tổng tiền) sẽ được gửi vào Telegram.

## Tùy chọn

- **Âm thanh click**: Đặt file `click.mp3` (lo-fi/trap) vào `public/sounds/`. Nếu không có file, app dùng tiếng bíp Web Audio.
- **Ảnh sản phẩm**: Trong `src/data/products.ts` có thể đổi `image` sang đường dẫn ảnh thật (hoặc đặt ảnh trong `public/images/` và dùng `/images/xxx.jpg`).

## Cấu trúc chính

- **Trang chủ**: Hero + Best-seller grid
- **Sản phẩm** (`/san-pham`): Lọc theo loại, card hover glow
- **Chi tiết** (`/san-pham/[slug]`): Combo, topping, nút "Chốt đơn"
- **Sự kiện** (`/su-kien`): Layout poster khuyến mãi
- **Giỏ hàng** (`/gio-hang`) + **Thanh toán** (`/thanh-toan`) → API `POST /api/notify-telegram`
