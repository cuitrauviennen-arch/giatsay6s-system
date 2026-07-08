import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactBar from "@/components/ContactBar";
import OurServices from "@/components/OurServices";
import Contact from "@/components/Contact";
import { getHeroData, getContactData, getProcessStepsData, getServicesData } from "@/lib/api";

export default async function Home() {
  const [heroData, contactData, processStepsData, servicesData] = await Promise.all([
    getHeroData(),
    getContactData(),
    getProcessStepsData(),
    getServicesData(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={heroData} />
      <Services data={processStepsData} />
      <ContactBar data={contactData} />
      <OurServices data={servicesData} />
      <Contact data={contactData} />
    </div>
  );
}
