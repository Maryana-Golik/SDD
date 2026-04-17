import { getConnection } from '../storage/database.js';

export class MessageService {
    static async createUser(name: string): Promise<number> {
        const db = await getConnection();
        const result = await db.run('INSERT INTO users (name) VALUES (?)', [name]);
        return result.lastID!;
    }

    static async sendMessage(convId: number, senderId: number, text: string): Promise<number | null> {
        if (!text.trim()) return null;
        const db = await getConnection();
        const result = await db.run(
            'INSERT INTO messages (conversationId, senderId, text, status) VALUES (?, ?, ?, ?)',
            [convId, senderId, text, 'Sent']
        );
        return result.lastID!;
    }

   static async getHistory(convId: number) {
    const db = await getConnection();
    return db.all(`
        SELECT 
            m.id, 
            m.conversationId, 
            m.senderId, 
            u.name as senderName, 
            m.text, 
            m.status, 
            m.createdAt 
        FROM messages m
        JOIN users u ON m.senderId = u.id
        WHERE m.conversationId = ?
    `, [convId]);
}
}