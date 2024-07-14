import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("oak-routing-ctrl-cloudflare", () => {
  let worker: UnstableDevWorker;
  let workerUrl: string;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", { experimental: { disableExperimentalWarning: true } });
    const { protocol, hostname, port } = worker.proxyData.userWorkerUrl;
    workerUrl = `${protocol}//${hostname}:${port}`;
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return 200 response with expected data", async () => {
    const resp = await worker.fetch(`${workerUrl}/echo/tester`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ foo: "bar" }),
    });
    expect(resp.status).toBe(200);

    const respData = await resp.json();
    expect(respData).toMatchObject({
      body: { foo: "bar" },
      param: { name: "tester" },
    });
  });

  it("should serve Open API Spec", async () => {
    const resp = await worker.fetch(`${workerUrl}/oas.json`);
    expect(resp.status).toBe(200);

    const respData = await resp.json();
    expect(respData).toMatchSnapshot();
  });
});
