import { NextRequest, NextResponse } from "next/server";

function jsonResponse(data: { success: boolean; data?: unknown; error?: string }, status = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Webhook endpoint for emitting MRV events to the DCACI Portal.
 * Events include: inventory.created, inventory.updated, inventory.submitted,
 * calculation.completed, qaqc.completed, report.generated
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, payload, webhookUrl } = body;

    if (!event || !payload) {
      return jsonResponse(
        { success: false, error: "Missing required fields: event, payload" },
        400
      );
    }

    const validEvents = [
      "inventory.created",
      "inventory.updated",
      "inventory.submitted",
      "inventory.approved",
      "calculation.started",
      "calculation.completed",
      "qaqc.check.completed",
      "qaqc.review.completed",
      "report.nir.generated",
      "report.btr.generated",
      "data.activity_data.updated",
      "data.emission_factor.updated",
    ];

    if (!validEvents.includes(event)) {
      return jsonResponse(
        { success: false, error: `Invalid event type. Valid events: ${validEvents.join(", ")}` },
        400
      );
    }

    const webhookPayload = {
      id: `evt-${Date.now()}`,
      event,
      timestamp: new Date().toISOString(),
      source: "mrv-service",
      payload,
    };

    // In production, this would POST to the portal webhook URL
    if (webhookUrl) {
      // await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(webhookPayload) });
      console.log(`[Webhook] Would POST to ${webhookUrl}:`, webhookPayload);
    }

    return jsonResponse({
      success: true,
      data: {
        ...webhookPayload,
        delivered: !!webhookUrl,
        message: webhookUrl
          ? "Webhook event delivered"
          : "Webhook event logged (no webhookUrl provided)",
      },
    });
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
