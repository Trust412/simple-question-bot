import { ChatMessage } from '../types/chat';

interface DBMessage {
  id: string;
  role: string;
  content: string;
  timestamp: string;
  session_id: string;
  user_id: string;
}

export const exportMessagesToCSV = (messages: DBMessage[]): string => {
  // CSV header
  const header = 'Timestamp,Role,Content,Session ID,User ID\n';
  
  // Convert messages to CSV rows
  const rows = messages.map(message => {
    const timestamp = message.timestamp;
    const role = message.role;
    const content = `"${message.content.replace(/"/g, '""')}"`;
    const sessionId = message.session_id;
    const userId = message.user_id;
    return `${timestamp},${role},${content},${sessionId},${userId}`;
  }).join('\n');
  
  return header + rows;
};

export const downloadCSV = (csvContent: string, filename: string = 'chat_history.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 