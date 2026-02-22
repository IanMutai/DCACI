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
    // Verify webhook signature
    const signature = request.headers.get("X-Webhook-Signature");
    const webhookSecret = process.env.MRV_WEBHOOK_SECRET;

    if (webhookSecret && !verifySignature(signature, webhookSecret)) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload: WebhookPayload = await request.json();

    console.log("[MRV Webhook]", payload.event, payload.timestamp);

    // Handle different MRV events
    switch (payload.event) {
      case "inventory.submitted":
        // Notify NDC service about new inventory data
        await handleInventorySubmitted(payload);
        break;

      case "inventory.approved":
        // Trigger cross-system updates
        await handleInventoryApproved(payload);
        break;

      case "qaqc.completed":
        // Update dashboard status
        await handleQaqcCompleted(payload);
        break;

      case "emission_factor.updated":
        // Propagate emission factor changes
        await handleEmissionFactorUpdated(payload);
        break;

      default:
        console.log("[MRV Webhook] Unhandled event:", payload.event);
    }

    return NextResponse.json({ received: true, event: payload.event });
  } catch (error) {
    console.error("[MRV Webhook Error]", error);
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

async function handleInventorySubmitted(payload: WebhookPayload) {
  console.log("[MRV Webhook] Inventory submitted:", payload.data);
  // TODO: Forward to NDC service for progress recalculation
}

async function handleInventoryApproved(payload: WebhookPayload) {
  console.log("[MRV Webhook] Inventory approved:", payload.data);
  // TODO: Update dashboard caches, notify NDC and Registry services
}

async function handleQaqcCompleted(payload: WebhookPayload) {
  console.log("[MRV Webhook] QA/QC completed:", payload.data);
  // TODO: Update dashboard status indicators
}

async function handleEmissionFactorUpdated(payload: WebhookPayload) {
  console.log("[MRV Webhook] Emission factor updated:", payload.data);
  // TODO: Notify dependent calculations
}
