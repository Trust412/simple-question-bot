import Database from 'better-sqlite3';
import path from 'path';
import { ChatMessage, MessageRole } from '../types/chat';

// Initialize database
const db = new Database(path.join(process.cwd(), 'chat_history.db'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME NOT NULL
  );
`);

interface DBMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

// Message operations
export const saveMessage = (message: ChatMessage) => {
  const stmt = db.prepare(`
    INSERT INTO messages (id, role, content, timestamp)
    VALUES (@id, @role, @content, @timestamp)
  `);
  stmt.run({
    id: message.id,
    role: message.role,
    content: message.content,
    timestamp: message.timestamp.toISOString()
  });
};

export const getAllMessages = (): DBMessage[] => {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY timestamp ASC');
  return stmt.all() as DBMessage[];
};

// Cleanup function
export const closeDatabase = () => {
  db.close();
}; 