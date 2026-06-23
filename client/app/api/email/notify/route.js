import { NextResponse } from "next/server";
import {
  notifyNewPressRelease,
  notifyNewNssecNews,
  notifyNewPublication,
  notifyNewSubscriber,
  notifyContactForm,
} from "@/app/lib/emailService";

const HANDLERS = {
  "press-release": notifyNewPressRelease,
  "nssec-news": notifyNewNssecNews,
  publication: notifyNewPublication,
  subscriber: notifyNewSubscriber,
  contact: notifyContactForm,
};

export async function POST(req) {
  try {
    const { type, data } = await req.json();
    const handler = HANDLERS[type];
    if (!handler) {
      return NextResponse.json({ error: `Unknown notification type: ${type}` }, { status: 400 });
    }
    await handler(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
