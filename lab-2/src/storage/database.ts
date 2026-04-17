import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function getConnection(): Promise<Database> {
    return open({ filename: './messenger.db', driver: sqlite3.Database });
}

export async function initDb() {
    const db = await getConnection();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            conversationId INTEGER, senderId INTEGER, 
            text TEXT, status TEXT DEFAULT 'Sent',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log("Database initialized");
}