import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, Language } from "../types";
import { DICTIONARY } from "../services/i18n";
import { askKaziAiAssistant } from "../services/api";
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Zap, 
  Scale, 
  Coins,
  User,
  Loader2,
  ExternalLink
} from "lucide-react";

interface KaziAiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  bccRate: number;
}

export const KaziAiAssistantModal: React.FC<KaziAiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  bccRate,
}) => {
  if (!isOpen) return null;

  const t = DICTIONARY[currentLanguage];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: `Mbote / Bonjour ! Je suis **Kazi-AI**, votre conseiller juridique et immobilier virtuel sur **Justone Immo (Jimmo.rdc)**.

Je peux vous assister sur :
- **Droit du bail (Loi n° 15/025)** : Plafonnement de caution à 3 mois, préavis, résiliation, conditions de résiliation pour bail commercial et résidentiel, et règles de sous-location.
- **Fiscalité immobilière** : Retenue à la source IRL 22% (DGI / DGRK), obligations déclaratives, et certificats fiscaux pour transactions immobilières.
- **Titres Fonciers** : Vérification des Certificats d'enregistrement au cadastre, recherche de servitudes, et procédures de régularisation.
- **Gestion technique** : Entretien des groupes électrogènes (Perkins, SDMO), forages, citernes, et planification de maintenance préventive.
- **Gestion à distance pour la Diaspora RDC** : contrats de gestion, procuration notariée, remises de loyers et sécurisation des paiements (Mobile Money, banques, escrow).

Ressources légales et administratives utiles :
- Loi n° 15/025 sur les baux à loyer (RDC) — plafonnement de la caution, préavis et résiliation.
- Code des impôts & circulaires DGI/DGRK — retenue IRL 22% et modalités de versement.
- Cadastre National / Office des titres fonciers — vérification des certificats.

Je peux aussi fournir des modèles (lettres de préavis, clause de caution, mandat de gestion) et vérifier la conformité d'un contrat. Comment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickQuestions = [
    "Quel est le cours de change officiel du jour selon la BCC ?",
    "Plafond légal de la caution locative (Loi n° 15/025) ?",
    "Comment calculer la retenue IRL 22% pour la DGRK ?",
    "Comment sécuriser mes loyers depuis la Diaspora ?",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsLoading(true);

    try {
      // Build history for context
      const historyContext = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const reply = await askKaziAiAssistant(query, historyContext);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "Désolé, une erreur de communication est survenue. Veuillez vérifier votre connexion.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Kazi-AI — Conseiller Immobilier RDC</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400">
                Spécialiste Droit Foncier, Loi 15/025, Fiscalité DGI/DGRK & Marché Kinois
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
          <span className="text-[11px] text-slate-400 font-semibold shrink-0">Suggestions :</span>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] border border-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    isUser
                      ? "bg-emerald-600 text-white"
                      : "bg-indigo-950 text-indigo-300 border border-indigo-800"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    isUser
                      ? "bg-emerald-600 text-white rounded-tr-none shadow-md"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div
                    className={`text-[9px] text-right font-mono ${
                      isUser ? "text-emerald-200" : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 p-3 rounded-2xl w-fit border border-slate-800">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Kazi-AI analyse le droit locatif congolais et prépare sa réponse...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Posez votre question (ex: 'Taux du jour BCC', 'Règles caution 3 mois', 'Fiscalité IRL')..."
              className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition disabled:opacity-40 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Taux de référence légal : 1 USD = {bccRate.toLocaleString()} CDF</span>
            <a
              href="https://bcc.cd/marche-des-changes/cours-de-change"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 underline font-mono"
            >
              <span>bcc.cd/marche-des-changes/cours-de-change</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
