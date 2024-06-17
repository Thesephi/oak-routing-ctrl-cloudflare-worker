import { Application } from "@oak/oak/application";
import { useOakServer } from "@dklab/oak-routing-ctrl";
import { CfwController } from "./CfwController";

const app = new Application();
useOakServer(app, [CfwController]);
export default { fetch: app.fetch };
