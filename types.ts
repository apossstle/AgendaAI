
export interface Stakeholder {
  name: string;
  role: string;
  avatar?: string;
}

export interface AgendaTopic {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  startTime?: string;
  presenter?: string;
}

export interface MeetingAgenda {
  title: string;
  objective: string;
  stakeholders: Stakeholder[];
  topics: AgendaTopic[];
  totalDuration: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
