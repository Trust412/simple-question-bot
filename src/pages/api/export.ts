import { NextApiRequest, NextApiResponse } from 'next';
import { getAllMessages, getMessagesByUser, getMessagesBySession } from '@/services/database';
import { exportMessagesToCSV } from '@/utils/export';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, sessionId } = req.query;
    let messages;

    if (userId) {
      messages = getMessagesByUser(userId as string);
    } else if (sessionId) {
      messages = getMessagesBySession(sessionId as string);
    } else {
      messages = getAllMessages();
    }

    const csvContent = exportMessagesToCSV(messages);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=chat_history.csv');
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error exporting messages:', error);
    res.status(500).json({ error: 'Failed to export messages' });
  }
} 