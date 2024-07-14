import { Application } from "@oak/oak/application";
import { useOakServer, useOas } from "@dklab/oak-routing-ctrl";
import { CfwController } from "./CfwController";

const app = new Application();
useOakServer(app, [CfwController]);
useOas(app, {
  info: {
    title: "Demo API service powered by Cloudflare Workers",
    description: "This Open API Spec is served by a Cloudflare Workers module. To see the raw spec json, simply request at `/oas.json`",
    version: "1.0.0"
  },
  // example OAS template by rapidoc; for configurations see https://rapidocweb.com/api.html
  uiTemplate: `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
    </head>
    <body>
      <rapi-doc
        spec-url="/oas.json"
        render-style="view"
        theme="dark"
        allow-server-selection="false"
        allow-authentication="false"
        allow-spec-file-load="false"
        allow-spec-url-load="false"
        allow-spec-file-download="false"
        allow-search="false"
        allow-advanced-search="false"
        show-header="true"
      >
      <div style="height:1px;background-color:rgb(52, 53, 54);margin-bottom:10px;"></div>
      </rapi-doc>
    </body>
  </html>`,
});
export default { fetch: app.fetch };
