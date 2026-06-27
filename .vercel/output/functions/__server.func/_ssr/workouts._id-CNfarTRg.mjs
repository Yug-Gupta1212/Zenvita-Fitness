import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-5p7JScr3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workouts._id-CNfarTRg.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
	title: "Error",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: error.message
	})
});
//#endregion
export { SplitErrorComponent as errorComponent };
