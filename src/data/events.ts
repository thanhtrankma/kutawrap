export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image: string;
  highlight?: boolean;
}

export const events: EventItem[] = [
  {
    id: "1",
    title: "COMBO 2K5",
    subtitle: "Chỉ 65K — Gà + Khoai + Nước",
    date: "01.02 — 28.02.2025",
    description: "Combo 1 người no nê. Áp dụng toàn hệ thống.",
    image: "/images/event-combo.jpg",
    highlight: true,
  },
  {
    id: "2",
    title: "HAPPY HOUR",
    subtitle: "14:00 — 17:00 Mỗi ngày",
    date: "Giảm 20% đồ uống",
    description: "Trà chanh, soda, cà phê... giảm 20% trong khung giờ vàng.",
    image: "/images/event-happy.jpg",
  },
  {
    id: "3",
    title: "FREE SHIP",
    subtitle: "Đơn từ 100K",
    date: "Áp dụng bán kính 3km",
    description: "Order từ 100K được freeship trong bán kính 3km. Code: SHIPFREE.",
    image: "/images/event-ship.jpg",
  },
];
