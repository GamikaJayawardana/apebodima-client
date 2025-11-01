// src/app/dashboard/messages/page.tsx
"use client";
import { useChat } from '@/context/ChatProvider';
import { useAuthStore } from '@/stores/authStore';
import { useState } from 'react';

export default function MessagesPage() {
    const { isConnected, messages, sendMessage } = useChat();
    const user = useAuthStore((state) => state.user);
    const [content, setContent] = useState('');
    const [recipientId, setRecipientId] = useState(''); // In a real app, you'd select this from a chat list

    const handleSend = () => {
        if (user && content && recipientId) {
            sendMessage({
                senderId: user.id,
                recipientId: recipientId,
                content: content,
            });
            setContent('');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Chat</h1>
            <p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>

            {/* This is a simple test interface. You'll need to build a real chat UI. */}
            <div className="my-4">
                <input
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    placeholder="Recipient User ID"
                    className="p-2 border rounded-md"
                />
            </div>
            <div className="border rounded-lg h-96 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.senderId === user?.id ? 'text-right' : 'text-left'}>
                        <span className="inline-block p-2 bg-gray-100 rounded-md">
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-4">
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-grow p-2 border rounded-md"
                />
                <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-md">
                    Send
                </button>
            </div>
        </div>
    );
}