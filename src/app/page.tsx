import Banner from '@/components/home/Banner';
import FaqSection from '@/components/home/FaqSection';
import Featured from '@/components/home/Featured';
import Features from '@/components/home/Features';
import Newsletter from '@/components/home/Newsletter';
import Testimonials from '@/components/home/Testimonials';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <div>
      <ToastContainer />
      <Banner />
      <Featured />
      <Features />
      <Testimonials />
      <FaqSection />
      <Newsletter />
    </div>
  );
}
