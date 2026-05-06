import ParticleBackground from './components/ParticleBackground';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import CampaignBar from './sections/CampaignBar';
import WhatIs from './sections/WhatIs';
import FirstForm from './sections/FirstForm';
import HowItGrows from './sections/HowItGrows';
import UnlockArchive from './sections/UnlockArchive';
import FutureWorlds from './sections/FutureWorlds';
import MilestoneSignal from './sections/MilestoneSignal';
import HiddenArchive from './sections/HiddenArchive';
import CelestialEdition from './sections/CelestialEdition';
import UnknownGate from './sections/UnknownGate';
import Rewards from './sections/Rewards';
import Roadmap from './sections/Roadmap';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-forest-deep text-ivory overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <CampaignBar />
        <WhatIs />
        <FirstForm />
        <HowItGrows />
        <UnlockArchive />
        <FutureWorlds />
        <MilestoneSignal />
        <HiddenArchive />
        <CelestialEdition />
        <UnknownGate />
        <Rewards />
        <Roadmap />
        <FAQ />
        <FinalCTA />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
