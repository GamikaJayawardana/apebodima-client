// src/context/ChatProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthStore } from '@/stores/authStore';

// Type for ChatMessage.java
interface ChatMessage {
    id?: string;
    chatRoomId?: string;
    senderId: string;
    recipientId: string;
    content: string;
    timestamp?: string;
}

interface ChatContextType {
    stompClient: Client | null;
    isConnected: boolean;
    messages: ChatMessage[];
    sendMessage: (msg: ChatMessage) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (user && !stompClient) {
            // Create a new STOMP client
            const client = new Client({
                webSocketFactory: () => {
                    // Use SockJS as the transport
                    return new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
                },
                onConnect: () => {
                    console.log('STOMP connected');
                    setIsConnected(true);

                    // Subscribe to user-specific queue
                    client.subscribe(`/user/${user.id}/queue/messages`, (message) => {
                        const newMsg = JSON.parse(message.body) as ChatMessage;
                        setMessages((prev) => [...prev, newMsg]);
                    });
                },
                onDisconnect: () => {
                    console.log('STOMP disconnected');
                    setIsConnected(false);
                },
            });

            client.activate();
            setStompClient(client);
        } else if (!user && stompClient && isConnected) {
            stompClient.deactivate();
            setStompClient(null);
        }
    }, [user, stompClient, isConnected]);

    const sendMessage = (msg: ChatMessage) => {
        if (stompClient && isConnected) {
            // Send message to the backend destination
            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify(msg),
            });
        }
    };

    return (
        <ChatContext.Provider value={{ stompClient, isConnected, messages, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};