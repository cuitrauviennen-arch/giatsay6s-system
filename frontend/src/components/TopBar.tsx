import { MapPin, Phone, Globe } from "lucide-react";
import { getContactData } from "@/lib/api";

export default async function TopBar() {
  const contactData = await getContactData();
  
  const address = contactData?.address || "Hẻm 350 (340/23) Nguyễn Văn Lượng, P.16, Q. Gò Vấp";
  const hotline = contactData?.hotline || "0816-366716";
  const facebook = contactData?.facebookUrl || "facebook.com/giatsay6s";

  return (
    <div className="w-full bg-secondary text-primary font-medium text-lg py-2 overflow-hidden whitespace-nowrap flex items-center shadow-sm">
      <div className="inline-block animate-marquee">
        <span className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <MapPin size={20} /> {address}
          </span>
          <span className="flex items-center gap-2">
            <Phone size={20} /> Hotline: {hotline}
          </span>
          <span className="flex items-center gap-2">
            <Globe size={20} /> {facebook}
          </span>
        </span>
      </div>
    </div>
  );
}
