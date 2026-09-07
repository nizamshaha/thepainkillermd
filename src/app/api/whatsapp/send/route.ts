import { NextRequest, NextResponse } from "next/server";
import { sendTextMessage, sendReportToDoctor, sendChatToDoctor, isEvolutionConfigured, getDoctorNumber } from "@/lib/evolution/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { number, message, type } = body as {
      number?: string;
      message?: string;
      type?: "chat" | "report";
    };

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    if (!isEvolutionConfigured()) {
      const phone = getDoctorNumber();
      const waUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
      return NextResponse.json({ success: true, fallback: true, waUrl });
    }

    let result;
    if (type === "report") {
      result = await sendReportToDoctor(message);
    } else {
      result = await sendChatToDoctor(message, number);
    }

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    }

    const phone = getDoctorNumber();
    const waUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    return NextResponse.json({ success: true, fallback: true, waUrl, apiError: result.error });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}