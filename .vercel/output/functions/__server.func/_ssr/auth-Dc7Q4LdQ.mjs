import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Dc7Q4LdQ.js
var import_jsx_runtime = require_jsx_runtime();
function AuthLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-[#0D0D0D] text-foreground flex items-center justify-center px-4 py-12 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[rgba(232,93,47,0.15)] blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[rgba(232,93,47,0.08)] blur-3xl pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full max-w-[450px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-[Instrument_Serif] text-5xl tracking-tight text-white mb-2",
						children: "Zenvita"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
						children: "Your Health. Understood."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass-strong rounded-3xl p-6 md:p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] border border-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			})
		]
	});
}
//#endregion
export { AuthLayout as component };
