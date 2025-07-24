/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import TypingIndicator from "../components/TypingIndicator";
import ChatInput from "../components/ChatInput";
import { askAI } from "../services/ChatService";

type Message = {
    sender: 'user' | 'ai';
    content: string;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [currentAiMessage, setCurrentAiMessage] = useState<string>('');
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const simulateTyping = async (text: string) => {
        setIsTyping(false);
        setCurrentAiMessage('');
        for (let i = 0; i < text.length; i++) {
            setCurrentAiMessage(text.slice(0, i));
            await new Promise((resolve) => setTimeout(resolve, 20));
        }
        setMessages((prev) => [...prev, { sender: 'ai', content: text }]);
        setCurrentAiMessage('');
    }

    const handleSend = async (message: string) => {

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', content: message },
        ]);

        setCurrentAiMessage('');
        setIsTyping(true);

        try {
            const response = await askAI({ question: message });
            const fullResponse = response.success ? response.data.answer : 'Maaf, terjadi kesalahan saat memproses jawaban AI.';
            await simulateTyping(fullResponse);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: 'ai',
                    content: 'Maaf, terjadi error saat menghubungi server.',
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, currentAiMessage]);

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-[#1F1F1F] text-white">

            <div className="p-4 bg-[#ED1C24] text-white text-lg font-semibold text-center shadow-md">
                Chat AI - IDStar
            </div>

            <div className="flex-1 p-3 overflow-y-auto bg-white text-black">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} message={msg.content} sender={msg.sender} />
                ))}

                {isTyping && <TypingIndicator />}

                {currentAiMessage != '' && (<ChatMessage message={currentAiMessage} sender="ai" />)}
                <div ref={chatEndRef} />
            </div>

            <ChatInput onSend={handleSend} />
        </div>
    );
}

export default ChatPage;