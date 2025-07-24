import { CircleUserRound } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type ChatMessageProps = {
    message: string;
    sender: 'user' | 'ai';
}
const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
    const isUser = sender === 'user';
    return (
        <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            {!isUser && (
                <img src="https://career.idstar.co.id/assets/LogoIDstar-BoBpLUi5.png" alt="AI" className="w-8 h-8 rounded-full mr-2 border" />
            )}
            <div className={`max-w[70%] px-4 py-2 rounded-lg text-sm leading-snug shadow-md ${isUser ? 'bg-[#ED1C24] text-white rounded-br-none' : 'bg-[#f0f0f0] text-gray-800 rounded-bl-none'}`}>
                <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                    {message}
                </Markdown>
            </div>
            {isUser && (
                <CircleUserRound className="w-8 h-8 rounded-full mr-2 border" />
            )}
        </div>
    );
}

export default ChatMessage;