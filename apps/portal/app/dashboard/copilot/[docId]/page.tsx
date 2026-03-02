"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { type DocumentState } from "@/lib/copilot/document-types";
import CopilotWorkspace from "@/components/copilot/copilot-workspace";

export default function CopilotDocPage() {
  const params = useParams();
  const router = useRouter();
  const docId = params.docId as string;
  const [doc, setDoc] = useState<DocumentState | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(`copilot_doc_${docId}`);
    if (!raw) { setNotFound(true); return; }
    try { setDoc(JSON.parse(raw)); } catch { setNotFound(true); }
  }, [docId]);

  if (notFound) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Document not found.</p>
          <button onClick={() => router.push("/dashboard/copilot")} className="text-sm text-teal-600 hover:underline">
            ← Back to Copilot
          </button>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <CopilotWorkspace
      initialDoc={doc}
      onSave={(updated) => {
        localStorage.setItem(`copilot_doc_${docId}`, JSON.stringify(updated));
      }}
    />
  );
}
