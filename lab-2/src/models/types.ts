export type MessageStatus = "Created" | "Sent" | "Delivered" | "Read" | "Failed" | "Retried";

export interface User {
    readonly id: number;
    name: string;
}

export interface Message {
    readonly id: number;
    conversationId: number;
    senderId: number;
    senderName?: string; 
    text: string;
    status: MessageStatus;
    createdAt: string;
}