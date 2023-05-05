/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import * as Sentry from "@sentry/remix";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  Sentry.init({
    dsn: "https://5d95ce1a49ab4eb1956c0d5a15f55960:11e336af2ac04c3a931a5cd33230d662@o4505134083997696.ingest.sentry.io/4505134085832704",
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  });

  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
