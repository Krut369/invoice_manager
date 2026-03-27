import { Upload, ClipboardPaste, FileText } from "lucide-react";

const actions = [
  { icon: Upload, label: "Upload", description: "Import data file" },
  { icon: ClipboardPaste, label: "Paste", description: "Paste JSON/CSV" },
  { icon: FileText, label: "Example", description: "Load sample" },
];

export function QuickActions() {
  return (
    <div className="glass-panel p-4">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
        Quick Actions
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-200 group"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
