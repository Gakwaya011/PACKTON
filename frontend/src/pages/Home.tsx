import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition'; // <-- Imported the new component
import QuickFacts from '../components/QuickFacts';
import HomeServices from '../components/HomeServices';
import CTABanner from '../components/CTABanner';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Cinematic Header */}
      <Hero />
      
      {/* 2. The New Enterprise Value Proposition */}
      <ValueProposition /> 
      
      {/* 3. Services Grid */}
      <HomeServices />
      
      {/* 4. Trust/Data Points */}
      <QuickFacts />
      <FAQ />
      
      {/* 5. Bottom Call to Action */}
      <CTABanner />
    </div>
  );
}