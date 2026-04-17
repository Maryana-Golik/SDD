import { Router } from 'express';
import { MessageService } from '../services/MessageService.js';

const router = Router();

router.post('/users', async (req, res) => {
    const id = await MessageService.createUser(req.body.name);
    res.json({ id });
});

router.post('/messages', async (req, res) => {
    const { conversationId, senderId, text } = req.body;
    const mid = await MessageService.sendMessage(conversationId, senderId, text);
    if (!mid) return res.status(400).json({ detail: "Invalid message" });
    res.json({ messageId: mid, status: "Sent" });
});

router.get('/conversations/:id/messages', async (req, res) => {
    const history = await MessageService.getHistory(Number(req.params.id));
    res.json(history);
});

export default router;