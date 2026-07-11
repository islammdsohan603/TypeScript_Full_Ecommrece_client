import Banner from '@/components/home/Banner';
import FaqSection from '@/components/home/FaqSection';
import Featured from '@/components/home/Featured';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <Features />
      <Testimonials />
      <FaqSection />
    </div>
  );
}
