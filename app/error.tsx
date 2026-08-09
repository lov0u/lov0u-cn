"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    try {
      fetch("/api/log-error/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: error?.message || "unknown",
          stack: error?.stack || "",
          digest: error?.digest || "",
          href: window.location.href,
          ua: navigator.userAgent,
        }),
      }).catch(() => {});
    } catch {
      /* 忽略上报失败 */
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-white">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gray-900 mb-4">出错了</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">页面加载失败</h1>
        <p className="text-gray-500 mb-4">
          页面出现了一个异常，请点击「重试」或「返回首页」。如果问题持续存在，请联系网站管理员。
        </p>
        <div
          className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-left"
          style={{ wordBreak: "break-all" }}
        >
          <div className="text-xs font-medium text-red-800 mb-1">
            错误信息（digest: {error?.digest || "-"}）
          </div>
          <pre className="text-xs text-red-700 whitespace-pre-wrap font-mono">
            {error?.message || "无错误详情"}
          </pre>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            重试
          </button>
          <a
            href="/"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
