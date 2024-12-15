import { unstable_dev } from "wrangler";
import type { Unstable_DevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("oak-routing-ctrl-cloudflare", () => {
  let worker: Unstable_DevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", { experimental: { disableExperimentalWarning: true } });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return 200 response with expected data", async () => {
    const resp = await worker.fetch(`/echo/tester`, {
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

  it("should serve /version", async () => {
    const resp = await worker.fetch(`/version`);
    const respData = await resp.json();
    const actualVersion = require("../package.json").version;
    expect(respData).toEqual({
      version: actualVersion
    });
  });

  it("should serve Open API Spec", async () => {
    const resp = await worker.fetch(`/oas.json`);
    expect(resp.status).toBe(200);

    const respData = await resp.json();
    expect(respData).toMatchSnapshot();
  });
});
