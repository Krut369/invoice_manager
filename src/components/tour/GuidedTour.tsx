import Joyride, { Step, CallBackProps, STATUS } from "react-joyride";
import { useEffect, useState } from "react";

type DemoTab = "stock" | "meeting" | "document";

interface GuidedTourProps {
  activeTab: DemoTab;
  isActive: boolean;
  onComplete: () => void;
}

const stockTourSteps: Step[] = [
  {
    target: "[data-tour='ticker-search']",
    content: "Search for any stock ticker here. The AI-powered search suggests similar companies based on market correlations.",
    title: "🔍 Ticker Search",
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: "[data-tour='timeframe-selector']",
    content: "Switch between different timeframes to analyze price movements and events over various periods.",
    title: "📅 Timeframe Selector",
    placement: "bottom",
  },
  {
    target: "[data-tour='price-chart']",
    content: "Interactive price chart with event overlays. Click on event markers (earnings, news, filings) to see detailed analysis in the research panel.",
    title: "📈 Price Chart",
    placement: "top",
  },
  {
    target: "[data-tour='stock-snapshot']",
    content: "Quick snapshot showing current price, AI-generated trading signal with confidence score, and a brief rationale.",
    title: "💡 Stock Snapshot",
    placement: "right",
  },
  {
    target: "[data-tour='sentiment-timeline']",
    content: "Daily sentiment analysis showing market mood over time. Hover to see sentiment scores and click to explore related news.",
    title: "😊 Sentiment Timeline",
    placement: "top",
  },
  {
    target: "[data-tour='research-panel']",
    content: "Deep-dive research panel with analyst briefs, key drivers, sentiment breakdown, and raw evidence with source citations.",
    title: "📋 Research Panel",
    placement: "left",
  },
  {
    target: "[data-tour='quick-actions']",
    content: "Quick actions to upload your own data, paste content, or load example datasets.",
    title: "⚡ Quick Actions",
    placement: "right",
  },
];

const meetingTourSteps: Step[] = [
  {
    target: "[data-tour='meeting-upload']",
    content: "Upload audio files, paste transcripts, or start a live recording to begin processing your meeting.",
    title: "🎙️ Upload Meeting",
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: "[data-tour='meeting-info']",
    content: "Meeting overview with participants, duration, and an AI-generated TL;DR summary.",
    title: "📝 Meeting Info",
    placement: "right",
  },
  {
    target: "[data-tour='waveform']",
    content: "Visual waveform with speaker segments. Click anywhere to jump to that point in the transcript.",
    title: "🎵 Audio Waveform",
    placement: "bottom",
  },
  {
    target: "[data-tour='transcript']",
    content: "AI-transcribed text with speaker diarization. Hover to highlight, click to add action items or corrections.",
    title: "📜 Transcript",
    placement: "top",
  },
  {
    target: "[data-tour='meeting-summary']",
    content: "Choose between TL;DR, Executive, or Full summary modes. Each provides different levels of detail.",
    title: "📊 Summary Modes",
    placement: "left",
  },
  {
    target: "[data-tour='action-items']",
    content: "Automatically extracted action items with assignees and due dates. Export directly to your task manager.",
    title: "✅ Action Items",
    placement: "left",
  },
];

const documentTourSteps: Step[] = [
  {
    target: "[data-tour='doc-upload']",
    content: "Drag & drop documents or select sample files. Supports invoices, contracts, forms, and more.",
    title: "📄 Document Upload",
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: "[data-tour='doc-queue']",
    content: "Document queue showing processing status. Click any document to view and edit its extracted data.",
    title: "📚 Document Queue",
    placement: "right",
  },
  {
    target: "[data-tour='doc-viewer']",
    content: "Interactive document viewer with zoom, rotate, and overlay controls. Bounding boxes highlight extracted fields.",
    title: "🔍 Document Viewer",
    placement: "top",
  },
  {
    target: "[data-tour='extracted-fields']",
    content: "Extracted data with confidence scores. Click any field to edit inline. Low-confidence fields are highlighted for review.",
    title: "📋 Extracted Fields",
    placement: "left",
  },
  {
    target: "[data-tour='auto-tags']",
    content: "AI-suggested tags for document classification. Accept or reject to improve future predictions.",
    title: "🏷️ Auto Tags",
    placement: "left",
  },
  {
    target: "[data-tour='doc-actions']",
    content: "Approve and export to your preferred format: JSON, CSV, or push directly to your ERP system.",
    title: "✅ Approve & Export",
    placement: "top",
  },
];

const tourStepsByTab: Record<DemoTab, Step[]> = {
  stock: stockTourSteps,
  meeting: meetingTourSteps,
  document: documentTourSteps,
};

export function GuidedTour({ activeTab, isActive, onComplete }: GuidedTourProps) {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (isActive) {
      // Small delay to ensure DOM elements are mounted
      const timer = setTimeout(() => {
        setStepIndex(0);
        setRun(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setRun(false);
    }
  }, [isActive, activeTab]);

  const handleCallback = (data: CallBackProps) => {
    const { status, index, type } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      onComplete();
    }

    if (type === "step:after") {
      setStepIndex(index + 1);
    }
  };

  const steps = tourStepsByTab[activeTab];

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      callback={handleCallback}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      disableOverlayClose
      spotlightClicks
      styles={{
        options: {
          primaryColor: "hsl(173, 80%, 40%)",
          backgroundColor: "hsl(222, 47%, 14%)",
          textColor: "hsl(210, 40%, 98%)",
          overlayColor: "rgba(0, 0, 0, 0.75)",
          spotlightShadow: "0 0 30px rgba(45, 212, 191, 0.5)",
          arrowColor: "hsl(222, 47%, 14%)",
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(45, 212, 191, 0.2)",
        },
        tooltipContainer: {
          textAlign: "left" as const,
        },
        tooltipTitle: {
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "8px",
        },
        tooltipContent: {
          fontSize: "14px",
          lineHeight: 1.6,
          padding: "8px 0",
        },
        buttonNext: {
          backgroundColor: "hsl(173, 80%, 40%)",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "14px",
          fontWeight: 500,
        },
        buttonBack: {
          color: "hsl(215, 20%, 65%)",
          marginRight: "8px",
        },
        buttonSkip: {
          color: "hsl(215, 20%, 65%)",
        },
        spotlight: {
          borderRadius: "12px",
        },
        beacon: {
          display: "none",
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish Tour",
        next: "Next",
        skip: "Skip Tour",
      }}
    />
  );
}
