import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface WorkflowStepData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AgentData {
  id: string;
  title: string;
  tag: string;
  description: string;
  colorAccent: 'cyan' | 'blue' | 'pink';
  icon: LucideIcon;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  agentId: string;
  inputName: string;
  resultSummary: string;
  status: 'success' | 'warning' | 'critical';
}