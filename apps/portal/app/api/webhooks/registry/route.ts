import { NextRequest, NextResponse } from "next/server";

interface WebhookPayload {
  event: string;
  service: string;
  tenantId: string;
  timestamp: string;
  data: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("X-Webhook-Signature");
    const webhookSecret = process.env.REGISTRY_WEBHOOK_SECRET;

    if (webhookSecret && !verifySignature(signature, webhookSecret)) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload: WebhookPayload = await request.json();

    console.log("[Registry Webhook]", payload.event, payload.timestamp);

    switch (payload.event) {
      case "project.registered":
        await handleProjectRegistered(payload);
        break;

      case "credits.issued":
        await handleCreditsIssued(payload);
        break;

      case "credits.transferred":
        await handleCreditsTransferred(payload);
        break;

      case "credits.retired":
        await handleCreditsRetired(payload);
        break;

      case "itmo.created":
        await handleItmoCreated(payload);
        break;

      default:
        console.log("[Registry Webhook] Unhandled event:", payload.event);
    }

    return NextResponse.json({ received: true, event: payload.event });
  } catch (error) {
    console.error("[Registry Webhook Error]", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

function verifySignature(
  _signature: string | null,
  _secret: string
): boolean {
  // TODO: Implement HMAC signature verification
  return true;
}

async function handleProjectRegistered(payload: WebhookPayload) {
  console.log("[Registry Webhook] Project registered:", payload.data);
  // TODO: Request MRV baseline data for the project
}

async function handleCreditsIssued(payload: WebhookPayload) {
  console.log("[Registry Webhook] Credits issued:", payload.data);
  // TODO: Update dashboard credit totals
}

async function handleCreditsTransferred(payload: WebhookPayload) {
  console.log("[Registry Webhook] Credits transferred:", payload.data);
  // TODO: Notify NDC service for corresponding adjustments
}

async function handleCreditsRetired(payload: WebhookPayload) {
  console.log("[Registry Webhook] Credits retired:", payload.data);
  // TODO: Update NDC progress if retirement counts toward target
}

async function handleItmoCreated(payload: WebhookPayload) {
  console.log("[Registry Webhook] ITMO created:", payload.data);
  // TODO: Update cross-system integration logs
}
