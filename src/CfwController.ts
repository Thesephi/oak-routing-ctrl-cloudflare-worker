import { Controller, ControllerMethodArgs, Get, Post, z, type zInfer } from "@dklab/oak-routing-ctrl";
import type { Context, RouteContext } from "@oak/oak";

const EchoNamePathParamsSchema = z.object({ name: z.string() });
const OpenApiSpecForEchoName = {
  request: { params: EchoNamePathParamsSchema },
  responses: {
    "200": {
      description: "Success response",
      content: {
        "application/json": {
          schema: z.object({
            query: z.object({}),
            body: z.object({}),
            param: z.object({}),
            headers: z.object({}),
          })
        }
      }
    }
  },
}

@Controller()
export class CfwController {
  @Get("/echo/:name", /* API spec is entirely optional */ OpenApiSpecForEchoName)
  @Post("/echo/:name", /* API spec is entirely optional */ OpenApiSpecForEchoName)
  @ControllerMethodArgs("query", "body", "param")
  public echo(
    query: Record<string, string>,
    body: Record<string, string>,
    param: zInfer<typeof EchoNamePathParamsSchema>, // or type it however else you like
    ctx: Context & RouteContext<"/echo/:name">
  ) {
    const headers = {};
    ctx.request.headers.forEach((val, key) => headers[key] = val);
    console.log(`${ctx.params.name} is the same as ${param.name}`);
    return { query, body, param, headers };
  }
}
