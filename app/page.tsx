import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { Story } from "@/components/sections/Story";
import { Features } from "@/components/sections/Features";
import { DeepDive } from "@/components/sections/DeepDive";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { WhySwitch } from "@/components/sections/WhySwitch";
import { Audiences } from "@/components/sections/Audiences";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { FAQ } from "@/components/sections/FAQ";
import { WaitlistCTA } from "@/components/sections/WaitlistCTA";
import { Footer } from "@/components/sections/Footer";
import { WaitlistProvider } from "@/components/WaitlistContext";
import { WaitlistModal } from "@/components/WaitlistModal";

export default function Home() {
  return (
    <WaitlistProvider>
      <main className="relative">
        <Header />
        <Hero />
        <TrustMarquee />
        <Story />
        <Features />
        <DeepDive />
        <ComingSoon />
        <WhySwitch />
        <Audiences />
        <WhyDifferent />
        <FAQ />
        <WaitlistCTA />
        <Footer />
      </main>
      <WaitlistModal />
    </WaitlistProvider>
  );
}
