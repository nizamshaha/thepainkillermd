"use client";

import { useState, useEffect, useRef } from "react";
import { useT } from "@/lib/useT";

const DOCTOR_PHONE = "919769682366";

interface QuickAction { key: string; icon: string; labelKey: string; }
const QUICK_ACTIONS: QuickAction[] = [
  { key: "book", icon: "📅", labelKey: "chat.book" },
  { key: "ask", icon: "💬", labelKey: "chat.ask" },
  { key: "report", icon: "📋", labelKey: "chat.sendReport" },
];

export default function WhatsAppChatWidget() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/whatsapp/status").then(r => r.json()).then(d => setStatus(d.connected ? "online" : "offline")).catch(() => setStatus("offline"));
  }, []);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  const send = async (text: string, type?: "chat" | "report") => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/whatsapp/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, type: type || "chat" }) });
      const data = await res.json();
      if (data.fallback && data.waUrl) window.open(data.waUrl, "_blank");
      setSent(true); setMessage(""); setTimeout(() => setSent(false), 4000);
    } catch {
      window.open("https://wa.me/" + DOCTOR_PHONE + "?text=" + encodeURIComponent(text), "_blank");
      setSent(true); setMessage(""); setTimeout(() => setSent(false), 4000);
    } finally { setSending(false); }
  };

  const handleQuick = (key: string) => {
    if (key === "book") window.open("https://wa.me/" + DOCTOR_PHONE + "?text=" + encodeURIComponent("Hello, I would like to book an appointment with Dr. Shahnawaz F Shah."), "_blank");
    else if (key === "ask") inputRef.current?.focus();
    else if (key === "report") send("I would like to share my pain assessment report with Dr. Shah.", "report");
  };

  const btnCls = open ? "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 bg-gray-700" : "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 bg-[#25D366] hover:bg-[#20ba5a]";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[340px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
          <div className="bg-[#075e54] text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg"><span>{"🩺"}</span></div>
                <div>
                  <p className="font-semibold text-sm">Dr. Shahnawaz F Shah</p>
                  <div className="flex items-center gap-1.5">
                    <span className={"w-2 h-2 rounded-full " + (status === "online" ? "bg-green-400" : "bg-gray-400")} />
                    <span className="text-[11px] text-white/80">{status === "online" ? (t("chat.online") || "Online") : (t("chat.offline") || "Offline")}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Close">x</button>
            </div>
          </div>
          <div className="bg-[#e5ddd5] p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm mb-3 max-w-[90%]">
              <p className="text-sm text-gray-800">{t("chat.welcome") || "Hello! How can we help you today?"}</p>
              <p className="text-[10px] text-gray-400 mt-1">{t("chat.welcomeSub") || "Select an option or type your question below."}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK_ACTIONS.map((qa) => (
                <button key={qa.key} onClick={() => handleQuick(qa.key)} className="bg-white rounded-full px-3 py-1.5 text-xs font-medium text-[#075e54] shadow-sm hover:shadow-md transition-all border border-gray-100">
                  {qa.icon} {t(qa.labelKey) || (qa.key === "book" ? "Book Appointment" : qa.key === "ask" ? "Ask a Question" : "Send My Report")}
                </button>
              ))}
            </div>
            {sent && (<div className="bg-green-100 rounded-lg px-3 py-2 shadow-sm mb-3 border border-green-200"><p className="text-sm text-green-700">{t("chat.sent") || "Message sent! Dr. Shah will respond on WhatsApp."}</p></div>)}
          </div>

          <div className="bg-white border-t border-gray-100 px-3 py-2">
            <div className="flex items-end gap-2">
              <textarea ref={inputRef} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(message); } }} placeholder={t("chat.placeholder") || "Type your message..."} rows={1} className="flex-1 resize-none rounded-xl bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#075e54] max-h-20" />
              <button onClick={() => send(message)} disabled={!message.trim() || sending} className="w-10 h-10 rounded-full bg-[#075e54] text-white flex items-center justify-center hover:bg-[#064e46] transition-colors disabled:opacity-50" aria-label="Send">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className={btnCls} aria-label={open ? "Close chat" : "Chat on WhatsApp"}>
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        )}
      </button>
    </div>
  );
}
