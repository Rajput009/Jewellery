import React from 'react';
import { Gem, Send, Sparkles, X } from 'lucide-react';
import { getChatRecommendations, type ChatRecommendation } from '../api/chat';

type ChatBotProps = {
  onOpenProduct: (productId: string) => void;
  onOpenCollections: () => void;
};

type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  recommendations?: ChatRecommendation[];
};

const QUICK_PROMPTS = [
  'Wedding guest look',
  'Shaadi ke liye recommendation',
  'I have warm skin tone',
  'Meri skin tone warm hai',
  'Black dress for evening party',
  'Daily wear under $1500',
];

const ChatBot: React.FC<ChatBotProps> = ({ onOpenProduct, onOpenCollections }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: 'bot',
      text: 'Do you need recommendations, or are you looking for jewelry for a specific occasion? Aap English ya Roman Urdu dono mein pooch sakte hain.',
    },
  ]);

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      setLoading(true);
      const response = await getChatRecommendations(text);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: response.text,
          recommendations: response.recommendations,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: err instanceof Error ? err.message : 'Unable to fetch recommendations right now.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-[360px] bg-[#F6F1E8] text-[#1C1C1C] border border-[rgba(198,167,94,0.25)] shadow-2xl rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-[#0A3F30] text-[#F6F1E8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C6A75E]" />
              <p className="text-sm font-semibold tracking-wide">Stylist Assistant</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[320px] overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block max-w-[92%] px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-[#0E4F3C] text-[#F6F1E8]'
                      : 'bg-white border border-[rgba(198,167,94,0.2)] text-[#1C1C1C]'
                  }`}
                >
                  {message.text}
                </div>
                {message.recommendations?.length ? (
                  <div className="mt-2 space-y-2">
                    {message.recommendations.map((rec) => (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => onOpenProduct(rec.id)}
                        className="block w-full text-left bg-white border border-[rgba(198,167,94,0.2)] px-3 py-2 hover:border-[rgba(198,167,94,0.45)] transition-colors"
                      >
                        <p className="text-sm font-semibold text-[#0E4F3C]">{rec.name}</p>
                        <p className="text-xs text-[#6F6F6F]">{rec.price} - {rec.reason}</p>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={onOpenCollections}
                      className="text-xs uppercase tracking-widest text-[#0E4F3C] hover:text-[#B8954C] transition-colors"
                    >
                      View more in collections
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                className="text-[10px] uppercase tracking-wide px-2 py-1 bg-[#EFE7DA] border border-[rgba(198,167,94,0.2)] hover:border-[rgba(198,167,94,0.45)]"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="p-3 border-t border-[rgba(198,167,94,0.2)] flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Occasion, dress color, skin tone..."
              className="flex-1 bg-white border border-[rgba(198,167,94,0.2)] px-3 py-2 text-sm outline-none focus:border-[#C6A75E]"
            />
            <button type="submit" className="w-10 h-10 bg-[#0A3F30] text-[#F6F1E8] flex items-center justify-center hover:bg-[#115A46]" disabled={loading}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#0A3F30] text-[#F6F1E8] border border-[rgba(198,167,94,0.4)] shadow-xl hover:bg-[#115A46] transition-colors"
        aria-label="Open style chatbot"
      >
        <Gem size={22} className="mx-auto text-[#C6A75E]" />
      </button>
    </>
  );
};

export default ChatBot;
