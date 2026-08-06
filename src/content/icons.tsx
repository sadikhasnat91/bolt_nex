import {
  Megaphone, Search, Mail, Palette, Code2, Zap, Smartphone, Sparkles, Workflow,
  Compass, LineChart, PenTool, FlaskConical, TestTube2, Rocket, ShieldCheck,
  Target, Eye, Heart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Megaphone, Search, Mail, Palette, Code2, Zap, Smartphone, Sparkles, Workflow,
  Compass, LineChart, PenTool, FlaskConical, TestTube2, Rocket, ShieldCheck,
  Target, Eye, Heart,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}
