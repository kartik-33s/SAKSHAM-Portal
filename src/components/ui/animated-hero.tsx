import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, ShieldAlert, BookOpen } from "lucide-react";
import { Button } from "./button";

interface AnimatedHeroProps {
  onOpenSOS?: () => void;
  onExploreRights?: () => void;
  customTitles?: string[];
}

function Hero({
  onOpenSOS,
  onExploreRights,
  customTitles
}: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => customTitles || ["Protected", "Empowered", "Aware", "Prepared", "Fearless"],
    [customTitles]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full relative overflow-hidden rounded-[12px] bg-[#25282b] bg-grid-lines-dark text-white border border-black shadow-xl p-6 sm:p-10 my-4">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e60000]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center text-center gap-6">
        <div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/10"
            onClick={onExploreRights}
          >
            <span className="w-2 h-2 rounded-full bg-[#e60000] animate-pulse" />
            BNSS 2023 & BNS 2023 Statutory Protection <MoveRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <h1 className="text-3xl sm:text-5xl md:text-6xl max-w-3xl tracking-tight text-center font-extrabold uppercase leading-tight">
            <span>Every Citizen Deserves To Be</span>
            <span className="relative flex w-full justify-center overflow-hidden text-center h-14 sm:h-20 pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-black text-[#e60000] drop-shadow-md"
                  initial={{ opacity: 0, y: "-100%" }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -100 : 100,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/80 max-w-2xl text-center font-light">
            Empower yourself with instant 30-second legal scripts, Supreme Court arrest safeguards (D.K. Basu), and mandatory FIR compliance rules under the Constitution of India.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onOpenSOS && (
            <Button 
              size="lg" 
              className="gap-2 bg-[#e60000] hover:bg-[#b30000] text-white font-bold text-sm shadow-lg shadow-red-950/40"
              onClick={onOpenSOS}
            >
              <ShieldAlert className="w-4 h-4" /> 30s Police SOS Trigger
            </Button>
          )}
          
          <Button 
            size="lg" 
            className="gap-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium text-sm" 
            variant="outline"
            onClick={onExploreRights}
          >
            <BookOpen className="w-4 h-4" /> Explore 6 Core Situations
          </Button>

          <a href="tel:112" className="inline-block">
            <Button size="lg" className="gap-2 bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 text-sm" variant="ghost">
              <PhoneCall className="w-4 h-4 text-[#e60000]" /> Dial 112
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export { Hero, Hero as HeroDemo };
