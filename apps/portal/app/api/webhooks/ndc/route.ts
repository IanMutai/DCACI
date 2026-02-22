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
    const webhookSecret = process.env.NDC_WEBHOOK_SECRET;

    if (webhookSecret && !verifySignature(signature, webhookSecret)) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload: WebhookPayload = await request.json();

    console.log("[NDC Webhook]", payload.event, payload.timestamp);

    switch (payload.event) {
      case "target.updated":
        await handleTargetUpdated(payload);
        break;

      case "mitigation_action.created":
        await handleMitigationActionCreated(payload);
        break;

      case "mitigation_action.progress_updated":
        await handleProgressUpdated(payload);
        break;

      case "ndc.submitted":
        await handleNdcSubmitted(payload);
        break;

      case "corresponding_adjustment.requested":
        await handleCorrespondingAdjustment(payload);
        break;

      default:
        console.log("[NDC Webhook] Unhandled event:", payload.event);
    }

    return NextResponse.json({ received: true, event: payload.event });
  } catch (error) {
    console.error("[NDC Webhook Error]", error);
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

async function handleTargetUpdated(payload: WebhookPayload) {
  console.log("[NDC Webhook] Target updated:", payload.data);
  // TODO: Update dashboard summary cards
}

async function handleMitigationActionCreated(payload: WebhookPayload) {
  console.log("[NDC Webhook] Mitigation action created:", payload.data);
  // TODO: Notify Registry for potential credit linkage
}

async function handleProgressUpdated(payload: WebhookPayload) {
  console.log("[NDC Webhook] Progress updated:", payload.data);
  // TODO: Recalculate dashboard progress indicators
}

async function handleNdcSubmitted(payload: WebhookPayload) {
  console.log("[NDC Webhook] NDC submitted:", payload.data);
  // TODO: Trigger BTR report generation flow
}

async function handleCorrespondingAdjustment(payload: WebhookPayload) {
  console.log("[NDC Webhook] Corresponding adjustment requested:", payload.data);
  // TODO: Forward to Registry service
}
