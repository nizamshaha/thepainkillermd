/**
 * Evolution API Client - Server-side WhatsApp integration via REST API.
 * Requires: EVOLUTION_API_URL, EVOLUTION_API_KEY, EVOLUTION_INSTANCE_NAME
 */

const API_URL = process.env.EVOLUTION_API_URL || "http://localhost:8080";
const API_KEY = process.env.EVOLUTION_API_KEY || "";
const INSTANCE = process.env.EVOLUTION_INSTANCE_NAME || "thepainkillermd";
const DOCTOR_NUMBER = process.env.EVOLUTION_WHATSAPP_NUMBER || "919769682366";

export interface SendMessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface InstanceStatus {
  connected: boolean;
  instanceName: string;
  error?: string;
}

export function isEvolutionConfigured(): boolean {
  return Boolean(API_URL && API_KEY && INSTANCE);
}

export function getDoctorNumber(): string {
  return DOCTOR_NUMBER;
}

export async function sendTextMessage(number: string, text: string): Promise<SendMessageResult> {
  if (!isEvolutionConfigured()) return { success: false, error: "Evolution API not configured" };
  try {
    const clean = number.replace(/[^0-9]/g, "");
    const url = API_URL + "/message/sendText/" + INSTANCE;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: API_KEY },
      body: JSON.stringify({ number: clean, text, delay: 1200 }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[EvoAPI] sendText", res.status, body);
      return { success: false, error: "API error " + res.status };
    }
    const data = await res.json();
    return { success: true, messageId: data.key?.id };
  } catch (err) {
    console.error("[EvoAPI] exception:", err);
    return { success: false, error: "Network error" };
  }
}

export async function sendReportToDoctor(reportText: string): Promise<SendMessageResult> {
  const NL = String.fromCharCode(10);
  return sendTextMessage(DOCTOR_NUMBER, "NEW PATIENT REPORT - THE PAINKILLER MD" + NL + NL + reportText);
}

export async function sendChatToDoctor(message: string, patientPhone?: string): Promise<SendMessageResult> {
  const NL = String.fromCharCode(10);
  const prefix = patientPhone ? "Patient (" + patientPhone + ")" + NL + NL : "Website Visitor" + NL + NL;
  return sendTextMessage(DOCTOR_NUMBER, prefix + message);
}

export async function getInstanceStatus(): Promise<InstanceStatus> {
  if (!isEvolutionConfigured()) return { connected: false, instanceName: INSTANCE, error: "Not configured" };
  try {
    const url = API_URL + "/instance/connectionState/" + INSTANCE;
    const res = await fetch(url, { method: "GET", headers: { apikey: API_KEY } });
    if (!res.ok) return { connected: false, instanceName: INSTANCE, error: "HTTP " + res.status };
    const data = await res.json();
    return { connected: data.state === "open" || data.state === "CONNECTED", instanceName: INSTANCE };
  } catch {
    return { connected: false, instanceName: INSTANCE, error: "Connection failed" };
  }
}
