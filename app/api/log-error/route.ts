import { NextRequest, NextResponse } from "next/server";
import { appendFileSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const line = JSON.stringify({
      t: new Date().toISOString(),
      ...body,
    });
    console.log("[CLIENT-ERROR]", line);
    try {
      appendFileSync("/tmp/client-errors.log", line + "\n");
    } catch {
      /* 文件写入失败不影响主流程 */
    }
  } catch {
    /* 忽略 */
  }
  return NextResponse.json({ ok: true });
}
