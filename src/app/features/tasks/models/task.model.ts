export interface TaskItem {
  id: number;
  title: string;
  description: string;
  due_date: string;
  alert_email: string;
  is_completed: boolean;
  is_missed: boolean;
  missed_email_sent: boolean;
  created_at: string;
}

export interface TaskCreatePayload {
  title: string;
  description?: string;
  due_datetime: string;
  alert_email: string;
}

export interface TaskUpdatePayload {
  title?: string;
  description?: string;
  due_datetime?: string;
  is_completed?: boolean;
}
