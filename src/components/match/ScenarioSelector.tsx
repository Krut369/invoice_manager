import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ScenarioSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function ScenarioSelector({ value, onValueChange, disabled }: ScenarioSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="scenario-select" className="text-sm font-medium text-foreground whitespace-nowrap">
        Demo Scenario
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id="scenario-select" className="w-[200px] h-9 bg-background/50 border-border/50 backdrop-blur-sm">
          <SelectValue placeholder="Select a scenario" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="perfectMatch">Perfect Match</SelectItem>
          <SelectItem value="quantityMismatch">Quantity Mismatch</SelectItem>
          <SelectItem value="currencyMismatch">Currency Mismatch</SelectItem>
          <SelectItem value="itemMismatch">Item Mismatch</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
