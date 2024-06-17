import { Controller, ControllerMethodArgs, Get, Post } from "@dklab/oak-routing-ctrl";
import type { Context, RouteContext } from "@oak/oak";

@Controller()
export class CfwController {
  @Get("/echo/:name")
  @Post("/echo/:name")
  @ControllerMethodArgs("query", "body", "param")
  public echo(
    query: Record<string, string>,
    body: Record<string, string>,
    param: Record<string, string>,
    ctx: Context & RouteContext<"/echo/:name">
  ) {
    const headers = {}
    ctx.request.headers.forEach((val, key) => headers[key] = val)
    return { query, body, param, headers };
  }
}
