import { useState } from "react";
import { 
  Upload, 
  ClipboardPaste, 
  Mic, 
  Play, 
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Download,
  Send,
  Edit3,
  TrendingUp,
  Briefcase,
  Scale,
  Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";

type Persona = "investor" | "pm" | "legal" | "ops";

interface MeetingDemoProps {
  persona: Persona;
}

// Persona-specific meeting data
const meetingsByPersona = {
  investor: {
    title: "Q4 Earnings Strategy Call",
    duration: "45:22",
    participants: [
      { name: "James Mitchell", role: "CFO", avatar: "JM" },
      { name: "Sarah Chen", role: "IR Director", avatar: "SC" },
      { name: "David Park", role: "Portfolio Manager", avatar: "DP" },
    ],
    type: "Investor Relations",
    tldr: "Discussed Q4 earnings guidance, revenue projections, and capital allocation strategy. Key focus: maintaining dividend growth while funding R&D expansion.",
  },
  pm: {
    title: "Q4 Product Strategy Review",
    duration: "32:14",
    participants: [
      { name: "Sarah Chen", role: "Product Lead", avatar: "SC" },
      { name: "Marcus Johnson", role: "Engineering", avatar: "MJ" },
      { name: "Emily Rodriguez", role: "Design", avatar: "ER" },
    ],
    type: "Strategy",
    tldr: "Discussed Q4 roadmap priorities, focusing on mobile-first approach and AI integration. Key decision: prioritize chat feature over dashboard redesign.",
  },
  legal: {
    title: "Compliance Review Meeting",
    duration: "58:41",
    participants: [
      { name: "Michael Torres", role: "General Counsel", avatar: "MT" },
      { name: "Lisa Wang", role: "Compliance Officer", avatar: "LW" },
      { name: "Robert Kim", role: "External Counsel", avatar: "RK" },
    ],
    type: "Compliance",
    tldr: "Reviewed pending regulatory requirements and contract negotiations. Key action: update data privacy policies before Q1 deadline.",
  },
  ops: {
    title: "Supply Chain Ops Sync",
    duration: "28:55",
    participants: [
      { name: "Amanda Foster", role: "Ops Director", avatar: "AF" },
      { name: "Carlos Ruiz", role: "Logistics Lead", avatar: "CR" },
      { name: "Jennifer Lee", role: "Procurement", avatar: "JL" },
    ],
    type: "Operations",
    tldr: "Reviewed Q4 inventory levels and logistics optimization. Key decision: expand secondary distribution hub to reduce lead times by 15%.",
  },
};

const actionItemsByPersona = {
  investor: [
    { text: "Prepare Q4 earnings presentation deck", owner: "Sarah Chen", dueDate: "Nov 1", priority: "high", completed: false },
    { text: "Review dividend reinvestment projections", owner: "James Mitchell", dueDate: "Oct 28", priority: "high", completed: true },
    { text: "Schedule analyst call for guidance update", owner: "Sarah Chen", dueDate: "Nov 5", priority: "medium", completed: false },
  ],
  pm: [
    { text: "Scope chat feature engineering effort", owner: "Marcus Johnson", dueDate: "Oct 15", priority: "high", completed: false },
    { text: "Review mobile performance metrics", owner: "Sarah Chen", dueDate: "Oct 12", priority: "medium", completed: true },
    { text: "Finalize chat feature mockups", owner: "Emily Rodriguez", dueDate: "Oct 18", priority: "high", completed: false },
  ],
  legal: [
    { text: "Draft updated privacy policy", owner: "Lisa Wang", dueDate: "Nov 15", priority: "high", completed: false },
    { text: "Review NDA terms with external counsel", owner: "Michael Torres", dueDate: "Oct 25", priority: "high", completed: true },
    { text: "Prepare GDPR compliance checklist", owner: "Lisa Wang", dueDate: "Nov 1", priority: "medium", completed: false },
  ],
  ops: [
    { text: "Evaluate secondary hub locations", owner: "Carlos Ruiz", dueDate: "Oct 20", priority: "high", completed: false },
    { text: "Negotiate carrier contracts", owner: "Jennifer Lee", dueDate: "Oct 18", priority: "medium", completed: true },
    { text: "Update inventory forecasting model", owner: "Amanda Foster", dueDate: "Oct 25", priority: "high", completed: false },
  ],
};

const transcriptSegments = [
  { speaker: "Sarah Chen", time: "00:00", text: "Alright team, let's start with our Q4 priorities. I've been reviewing the user feedback and there are some clear themes emerging.", sentiment: "neutral", confidence: 95 },
  { speaker: "Marcus Johnson", time: "02:15", text: "The mobile performance issues are really impacting our retention numbers. We should prioritize those fixes.", sentiment: "negative", confidence: 92, action: "Review mobile performance metrics" },
  { speaker: "Emily Rodriguez", time: "04:30", text: "I agree with Marcus. The new chat feature mockups are ready, and users have been asking for this for months.", sentiment: "positive", confidence: 88 },
  { speaker: "Sarah Chen", time: "06:45", text: "Great points. Let's commit to the chat feature as our primary Q4 deliverable. Marcus, can you scope the engineering effort?", sentiment: "positive", confidence: 94, action: "Scope chat feature engineering effort", owner: "Marcus Johnson", dueDate: "Oct 15" },
  { speaker: "Marcus Johnson", time: "08:20", text: "Will do. I'll have estimates by end of week. We should also discuss the AI integration timeline.", sentiment: "neutral", confidence: 91 },
];

const summaryModes = ["TL;DR", "Executive", "Full"];

const personaIcons = {
  investor: TrendingUp,
  pm: Briefcase,
  legal: Scale,
  ops: Settings2,
};

export function MeetingDemo({ persona }: MeetingDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedMode, setSelectedMode] = useState("TL;DR");
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const meeting = meetingsByPersona[persona];
  const actionItems = actionItemsByPersona[persona];
  const PersonaIcon = personaIcons[persona];

  // Simulated waveform data
  const waveformBars = Array.from({ length: 100 }, (_, i) => ({
    height: 20 + Math.sin(i * 0.2) * 30 + Math.random() * 30,
    sentiment: i < 30 ? "neutral" : i < 60 ? "positive" : "neutral",
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full animate-fade-in">
      {/* Left Column - Meeting Overview */}
      <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0">
        {/* Upload Actions */}
        <div data-tour="meeting-upload" className="glass-panel p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Add Recording
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors group">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Upload Audio</p>
                <p className="text-xs text-muted-foreground">MP3, WAV, M4A</p>
              </div>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-xs">
                <ClipboardPaste className="h-4 w-4 text-muted-foreground" />
                Paste Transcript
              </button>
              <button className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-xs">
                <Mic className="h-4 w-4 text-destructive animate-pulse" />
                Record Now
              </button>
            </div>
          </div>
        </div>

        {/* Meeting Info */}
        <div data-tour="meeting-info" className="glass-panel p-4 space-y-4 animate-slide-in-left">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                {meeting.type}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {meeting.duration}
              </span>
            </div>
            <h2 className="text-lg font-semibold">{meeting.title}</h2>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Participants
            </h3>
            <div className="flex flex-wrap gap-2">
              {meeting.participants.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {p.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TL;DR */}
          <div>
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              TL;DR
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {meeting.tldr}
            </p>
          </div>
        </div>
      </div>

      {/* Center - Transcript Canvas */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Waveform */}
        <div data-tour="waveform" className="glass-panel p-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 w-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-primary-foreground" />
              ) : (
                <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
              )}
            </button>
            <div className="flex-1">
              <div className="flex items-end gap-[2px] h-12">
                {waveformBars.map((bar, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-t-sm transition-all duration-150",
                      bar.sentiment === "positive" ? "bg-success/60" : 
                      bar.sentiment === "negative" ? "bg-destructive/60" : "bg-primary/40",
                      i <= currentTime && "opacity-100",
                      i > currentTime && "opacity-40"
                    )}
                    style={{ height: `${bar.height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <SkipBack className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <SkipForward className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-xs text-muted-foreground ml-2">
                12:34 / {meeting.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <select className="bg-secondary text-xs px-2 py-1 rounded-lg">
                <option>1x</option>
                <option>1.5x</option>
                <option>2x</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div data-tour="transcript" className="glass-panel flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-medium">Transcript</h3>
            <div className="flex items-center gap-2">
              <ConfidenceBadge value={92} size="sm" />
              <span className="text-xs text-muted-foreground">Avg. accuracy</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {transcriptSegments.map((segment, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredSegment(i)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={cn(
                  "group relative p-3 rounded-xl transition-all duration-200",
                  hoveredSegment === i ? "bg-secondary" : "hover:bg-secondary/50",
                  segment.action && "border-l-2 border-primary"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {segment.speaker.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{segment.speaker}</span>
                      <span className="text-xs text-muted-foreground">{segment.time}</span>
                      {segment.confidence < 90 && (
                        <span className="text-[10px] text-warning bg-warning/10 px-1.5 py-0.5 rounded">
                          Low confidence
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{segment.text}</p>
                    {segment.action && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Action: {segment.action}
                        </span>
                        {segment.owner && (
                          <span className="text-xs text-muted-foreground">→ {segment.owner}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-card rounded-lg">
                    <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Deliverables */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0">
        <div className="glass-panel h-full flex flex-col overflow-hidden animate-slide-in-right">
          {/* Summary Modes */}
          <div data-tour="meeting-summary" className="p-4 border-b border-border/50">
            <h3 className="font-semibold mb-3">Meeting Summary</h3>
            <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
              {summaryModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={cn(
                    "flex-1 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                    selectedMode === mode
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Content */}
          <div className="p-4 border-b border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedMode === "TL;DR" 
                ? meeting.tldr
                : selectedMode === "Executive"
                ? "The team met to discuss Q4 product priorities. Key decisions included prioritizing the chat feature over dashboard redesign based on user feedback. Mobile performance issues were identified as impacting retention. Next steps include engineering scoping for the chat feature and scheduling stakeholder follow-ups."
                : "Detailed meeting notes would appear here with full context, all discussion points, and comprehensive action item breakdown..."}
            </p>
          </div>

          {/* Action Items */}
          <div data-tour="action-items" className="flex-1 overflow-y-auto custom-scrollbar p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider">
                Action Items
              </h3>
              <span className="text-xs text-primary">{actionItems.filter(a => !a.completed).length} pending</span>
            </div>
            <div className="space-y-2">
              {actionItems.map((action, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-200",
                    action.completed 
                      ? "bg-success/5 border-success/20" 
                      : "bg-secondary/50 border-border/50 hover:border-primary/30"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <button className={cn(
                      "mt-0.5 h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                      action.completed 
                        ? "bg-success border-success" 
                        : "border-muted-foreground/30 hover:border-primary"
                    )}>
                      {action.completed && <CheckCircle className="h-3 w-3 text-success-foreground" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm",
                        action.completed && "line-through text-muted-foreground"
                      )}>
                        {action.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{action.owner}</span>
                        <span className="text-xs text-muted-foreground/50">•</span>
                        <span className="text-xs text-muted-foreground">{action.dueDate}</span>
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded",
                          action.priority === "high" ? "bg-destructive/10 text-destructive" :
                          action.priority === "medium" ? "bg-warning/10 text-warning" :
                          "bg-muted text-muted-foreground"
                        )}>
                          {action.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-border/50 space-y-2">
            <Button className="w-full gap-2">
              <Send className="h-4 w-4" />
              Send Minutes
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                <Download className="h-3 w-3" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                Jira
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                Slack
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
