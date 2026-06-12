import { useState, useEffect, useRef } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first one
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Expanded FAQ list with realistic logistics data
  const faqs = [
    {
      q: "How fast do you deliver inside Kigali?",
      a: "Most local orders are picked up, verified, and delivered within 2 to 4 hours, depending on the chosen urgency tier and package sizing."
    },
    {
      q: "How does the Cash on Delivery (COD) workflow function?",
      a: "When booking a parcel, specify the required COD collector amount. Our rider verifies the funds directly upon handoff, logs the successful receipt on our platform, and our treasury initiates a payout loop back to your verified account within 48 hours."
    },
    {
      q: "What regions do you fully cover?",
      a: "We offer full-scale delivery solutions throughout Kigali, route links upcountry to major provincial hubs, and coordinate structured cross-border transport options."
    },
    {
      q: "What happens if a delivery attempt fails?",
      a: "If a recipient is unreachable or unavailable, our riders log the attempt and securely return the package to our hub. We automatically schedule a second delivery attempt for the following business day at no extra base charge."
    },
    {
      q: "Can I integrate my e-commerce store with Packton?",
      a: "Absolutely. We provide a robust API and plug-and-play integrations for platforms like Shopify and WooCommerce, allowing your orders to automatically generate dispatch requests in our system."
    },
    {
      q: "Do you handle bulky or oversized cargo?",
      a: "Yes. While our primary fleet consists of dispatch motorcycles for speed, we operate a dedicated fleet of cargo vans and light trucks for oversized deliveries, furniture, and bulk B2B inventory transfers."
    },
    {
      q: "How do I track my active shipments?",
      a: "Every dispatch generates a unique tracking link. Both you (via your Business Dashboard) and the recipient (via SMS) can track the package status from the moment it leaves the hub until the final signature is collected."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="bg-white py-32 w-full overflow-hidden border-t border-gray-100">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-20 lg:gap-32">
        
        {/* Left Side: Sticky Header */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <div 
            className={`flex items-center gap-3 mb-8 transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            <p className="text-gray-500 font-medium tracking-wide text-sm">
              Frequently Asked Questions
            </p>
          </div>
          
          <h2 
            className={`text-5xl md:text-6xl lg:text-[64px] font-bold text-brand-dark tracking-tighter leading-[1.05] transform transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Your Questions, <br className="hidden lg:block" /> Answered!
          </h2>
        </div>

        {/* Right Side: The Minimalist Accordion */}
        <div className="w-full lg:w-2/3 flex flex-col mt-4 lg:mt-0 border-t border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                style={{ transitionDelay: `${400 + (index * 120)}ms` }}
                className={`border-b border-gray-200 transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                }`}
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-10 lg:py-12 flex justify-between items-center text-left group focus:outline-none"
                >
                  <h3 className={`text-xl lg:text-2xl font-bold tracking-tight pr-8 transform transition-all duration-300 ease-out ${
                    isOpen ? "text-brand-orange" : "text-brand-dark group-hover:text-brand-orange group-hover:translate-x-2"
                  }`}>
                    {faq.q}
                  </h3>
                  
                  {/* The +/- Icon Toggle */}
                  <span className={`flex-shrink-0 text-3xl font-light transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "rotate-45 text-brand-orange scale-110" : "text-gray-400 group-hover:text-brand-orange group-hover:scale-110"
                  }`}>
                    +
                  </span>
                </button>

                {/* Smooth Height Animation Wrapper */}
                <div 
                  className={`grid transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-10 lg:pb-12" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* The Answer Text: Slides down and fades in when opened */}
                    <p className={`text-gray-500 font-light text-lg lg:text-xl leading-relaxed max-w-3xl transform transition-all duration-[600ms] delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                    }`}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}