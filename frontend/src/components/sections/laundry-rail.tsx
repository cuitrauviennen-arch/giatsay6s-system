"use client";

import * as React from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import type { RailGarment, ClothingRailHeroLabels } from "@/components/ui/product-rail-gallery";

const HOTLINE = "0816366176";
const HOTLINE_DISPLAY = "0816.366.176";
const HOTLINE_2 = "0907452299";
const HOTLINE_2_DISPLAY = "0907.45.22.99";
const MESSENGER_URL = "https://m.me/107621841054546?ref=WelcomeMessage";
const MAP_URL = "https://maps.app.goo.gl/z3EnHuSEejSjS28X8";

// Below 640px the hang-tags are wider than a resting piece and get covered by the next one, so drop
// the "Lấy liền" piece and the tags; the caption under the rail still names each service.
const MOBILE_QUERY = "(max-width: 639px)";
const MOBILE_HIDDEN = new Set(["dong-phuc"]);

function useIsMobile() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return mobile;
}

const LABELS_VI: ClothingRailHeroLabels = {
  front: "Mặt trước",
  back: "Mặt sau",
  close: "Đóng",
  show: "Xem",
};

export const LAUNDRY_RAIL_ITEMS: RailGarment[] = [
  {
    id: "ao-thun",
    name: "Áo thun · Giặt sạch xếp gọn",
    kind: "tee",
    color: "#F4F1EA",
    tag: "Giặt xếp",
    description: "Phân loại đồ trắng và đồ màu, giặt xả bằng OMO và Downy, sấy khô rồi xếp gọn như vừa mua ở tiệm.",
    details: ["Phân loại màu", "Giặt xả cao cấp", "Xếp gọn"],
  },
  {
    id: "so-mi",
    name: "Sơ mi · Giặt và ủi",
    kind: "shirt",
    color: "#DCE8F2",
    tag: "Ủi",
    description: "Giặt theo chế độ phù hợp chất vải, ủi theo yêu cầu để áo thẳng và tinh tươm.",
    details: ["Chế độ giặt riêng", "Ủi theo yêu cầu", "Giữ form"],
  },
  {
    id: "hoodie",
    name: "Hoodie · Sấy khô diệt khuẩn",
    kind: "hoodie",
    color: "#A3A8AE",
    tag: "Sấy khô",
    description: "Đồ nỉ dày được sấy khô kỹ, diệt khuẩn và chống nhăn, không cần phơi.",
    details: ["Sấy khô", "Diệt khuẩn", "Chống nhăn"],
  },
  {
    id: "ao-len",
    name: "Áo len · Giặt chế độ nhẹ",
    kind: "knit",
    color: "#8A9466",
    tag: "Giặt xếp",
    description: "Chọn chế độ giặt nhẹ và nước giặt phù hợp để sợi len sạch mà vẫn bền màu.",
    details: ["Chế độ nhẹ", "Bền màu", "Xếp gọn"],
  },
  {
    id: "ao-khoac",
    name: "Áo khoác · Giặt sấy",
    kind: "jacket",
    color: "#004B9B",
    trim: "#F5C518",
    tag: "Giặt sấy",
    description: "Giặt sạch, sấy khô chống nhăn và trả đồ trong ngày tại tiệm Gò Vấp.",
    details: ["Lấy liền", "Sấy chống nhăn", "Thơm mát"],
  },
  {
    id: "dong-phuc",
    name: "Đồng phục · Giặt sấy lấy liền",
    kind: "tee",
    color: "#1A3A6B",
    tag: "Lấy liền",
    description: "Đồng phục đi làm, đi học cần gấp: mang đến tiệm buổi sáng, ghé nhận lại sạch thơm trong ngày.",
    details: ["Giặt nhanh", "Sấy khô", "Mở cửa 08:00 - 19:00"],
  },
];

export default function LaundryRail({ autoplay = true }: { autoplay?: boolean }) {
  const mobile = useIsMobile();
  const items = React.useMemo(() => (mobile ? LAUNDRY_RAIL_ITEMS.filter((item) => !MOBILE_HIDDEN.has(item.id)).map((item) => ({ ...item, tag: undefined })) : LAUNDRY_RAIL_ITEMS), [mobile]);
  return (
    <ClothingRailHero
      key={mobile ? "mobile" : "desktop"}
      items={items}
      hanger="matte"
      labels={LABELS_VI}
      eyebrow="Giặt nhanh · Sấy khô · Diệt khuẩn"
      heading="Quần áo sạch thơm, lấy liền tại Gò Vấp."
      caption={`Lướt dọc giá treo để xem 6S chăm sóc từng loại đồ. Nhận cả chăn, ga, mền, rèm và giày. Hotline phụ: ${HOTLINE_2_DISPLAY}.`}
      autoplay={autoplay}
      onOpenChange={(index) => {
        if (index === null) return;
        const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
        (w.dataLayer ??= []).push({ event: "view_service_detail", service_id: items[index]?.id, viewport: mobile ? "mobile" : "desktop" });
      }}
      action={
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${HOTLINE}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-sm outline-none transition-[transform,box-shadow,background-color] hover:-translate-y-px hover:bg-[#ffda44] hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <Phone className="size-4" aria-hidden="true" />
            Gọi {HOTLINE_DISPLAY}
          </a>
          <a
            href={MESSENGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Nhắn Messenger
          </a>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Tìm đường đi
          </a>
          <a
            href={`tel:${HOTLINE_2}`}
            className="w-full text-center text-xs text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            Hoặc gọi {HOTLINE_2_DISPLAY}
          </a>
        </div>
      }
    />
  );
}
