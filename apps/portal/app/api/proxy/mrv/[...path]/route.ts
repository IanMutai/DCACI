import { NextRequest, NextResponse } from "next/server";

const MRV_SERVICE_URL =
  process.env.MRV_SERVICE_URL || "http://localhost:3001";

async function proxyRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetPath = path.join("/");
  const url = new URL(`/api/${targetPath}`, MRV_SERVICE_URL);

  // Forward query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  try {
    const headers = new Headers();
    headers.set("Content-Type", request.headers.get("Content-Type") || "application/json");
    headers.set("Authorization", request.headers.get("Authorization") || "");
    headers.set("X-Tenant-Id", request.headers.get("X-Tenant-Id") || "default");
    headers.set("X-Forwarded-For", request.headers.get("X-Forwarded-For") || request.headers.get("x-forwarded-for") || "unknown");

    const body =
      request.method !== "GET" && request.method !== "HEAD"
        ? await request.text()
        : undefined;

    const response = await fetch(url.toString(), {
      method: request.method,
      headers,
      body,
    });

    const responseData = await response.text();

    return new NextResponse(responseData, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[MRV Proxy Error]", error);
    return NextResponse.json(
      { error: "MRV service unavailable", service: "mrv" },
      { status: 503 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
