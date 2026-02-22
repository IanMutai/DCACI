import { NextRequest, NextResponse } from "next/server";

interface WebhookEvent {
  type: string;
  source: string;
  timestamp: string;
  data: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const event: WebhookEvent = {
      type: body.type || "ndc.updated",
      source: "ndc-service",
      timestamp: new Date().toISOString(),
      data: body.data || {},
    };

    // In production, emit event to portal service and other subscribers
    const portalUrl = process.env.PORTAL_WEBHOOK_URL || "http://localhost:3000/api/webhooks";

    console.log(`[NDC Webhook] Emitting event to portal: ${event.type}`, {
      target: portalUrl,
      event,
    });

    // Simulate webhook delivery
    const deliveryResult = {
      eventId: `evt-${Date.now()}`,
      type: event.type,
      delivered: true,
      deliveredTo: [portalUrl],
      timestamp: event.timestamp,
    };

    return NextResponse.json({
      success: true,
      data: deliveryResult,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process webhook event" },
      { status: 500 }
    );
  }
}
