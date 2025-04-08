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
    timestamp DATETIME NOT NULL,
    session_id TEXT NOT NULL,
    user_id TEXT NOT NULL
  );
`);

interface DBMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  session_id: string;
  user_id: string;
}

// Message operations
export const saveMessage = (message: ChatMessage, sessionId: string, userId: string) => {
  const stmt = db.prepare(`
    INSERT INTO messages (id, role, content, timestamp, session_id, user_id)
    VALUES (@id, @role, @content, @timestamp, @session_id, @user_id)
  `);
  stmt.run({
    id: message.id,
    role: message.role,
    content: message.content,
    timestamp: message.timestamp.toISOString(),
    session_id: sessionId,
    user_id: userId
  });
};

export const getAllMessages = (): DBMessage[] => {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY timestamp ASC');
  return stmt.all() as DBMessage[];
};

export const getMessagesByUser = (userId: string): DBMessage[] => {
  const stmt = db.prepare('SELECT * FROM messages WHERE user_id = ? ORDER BY timestamp ASC');
  return stmt.all(userId) as DBMessage[];
};

export const getMessagesBySession = (sessionId: string): DBMessage[] => {
  const stmt = db.prepare('SELECT * FROM messages WHERE session_id = ? ORDER BY timestamp ASC');
  return stmt.all(sessionId) as DBMessage[];
};

// Cleanup function
export const closeDatabase = () => {
  db.close();
}; 