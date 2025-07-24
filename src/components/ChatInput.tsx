import { Send } from "lucide-react";
import { useState } from "react";

type ChatInputProps = {
    onSend: (message: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [text, setText] = useState<string>('');

    const handleSend = () => {
        if (text.trim() === '') return;
        onSend(text.trim());
        setText('');
    }

    return (
        <div className="flex items-center p-3 bg-white border-t border-gray-200">
            <input 
                type="text" 
                className="flex-1 p-2 text-sm border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED1C24]"
                placeholder="Tanya AI.." 
                value={text} onChange={(e) => setText(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            />
            <button className="ml-2 p-2 bg-[#ED1C24] text-white rounded-md hover:bg-red-600" onClick={handleSend}>
                <Send size={18} />
            </button>
        </div>
    );
}

export default ChatInput;