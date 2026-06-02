import Hero from '../components/Hero';
import QuickFacts from '../components/QuickFacts';
import HomeServices from '../components/HomeServices';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import CTABanner from '../components/CTABanner';

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans pt-24 md:pt-32">
      <Hero />
      <QuickFacts />
      <HomeServices />
      <Features />
      <FAQ />
      <CTABanner />
    </div>
  );
}