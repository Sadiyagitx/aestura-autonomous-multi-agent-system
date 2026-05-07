import { Microscope, FileSearch, HardHat } from 'lucide-react';
import { AgentData } from './types';

export const agents: AgentData[] = [
  {
    id: 'cure',
    title: 'Cure Accelerator',
    tag: 'Science & Health',
    description: 'Uses image analysis to find missing data and speed up the development of life-saving medicines.',
    colorAccent: 'cyan',
    icon: Microscope
  },
  {
    id: 'fraud',
    title: 'Fraud Auditor',
    tag: 'Banking & Finance',
    description: 'Instantly spots fraud and finds tax rules are followed across borders, building trust in complex systems.',
    colorAccent: 'blue',
    icon: FileSearch
  },
  {
    id: 'safety',
    title: 'Safety Designer',
    tag: 'Critical Systems',
    description: 'Helps experts build safe, precise technical designs by understanding both sketches and spoken intent.',
    colorAccent: 'pink',
    icon: HardHat
  }
];