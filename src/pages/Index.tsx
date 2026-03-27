import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DocumentDemo } from "@/components/document/DocumentDemo";
import { MatchingDemo } from "@/components/match/MatchingDemo";

type DemoTab = "stock" | "meeting" | "document" | "match";
type DemoMode = "live" | "guided" | "readonly";
type Persona = "investor" | "pm" | "legal" | "ops";

const Index = () => {
  const [activeTab, setActiveTab] = useState<DemoTab>("document");
  const [demoMode, setDemoMode] = useState<DemoMode>("live");
  const [persona, setPersona] = useState<Persona>("ops");


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        demoMode={demoMode}
        onDemoModeChange={setDemoMode}
        persona={persona}
        onPersonaChange={setPersona}
      />

      <main className="flex-1 p-4 lg:p-6 overflow-auto custom-scrollbar">
        <div className="min-h-full">
          {activeTab === "document" && <DocumentDemo persona={persona} />}
          {activeTab === "match" && <MatchingDemo />}
        </div>
      </main>
    </div>
  );
};

export default Index;
