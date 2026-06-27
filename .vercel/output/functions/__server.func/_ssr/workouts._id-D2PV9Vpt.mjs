import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as workouts } from "./workouts-BgxY0U95.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workouts._id-D2PV9Vpt.js
var $$splitComponentImporter = () => import("./workouts._id-DzApqnpt.mjs");
var $$splitErrorComponentImporter = () => import("./workouts._id-BFkBNWxQ.mjs");
var $$splitNotFoundComponentImporter = () => import("./workouts._id-Dw7v-s2q.mjs");
var Route = createFileRoute("/workouts/$id")({
	loader: ({ params }) => {
		const workout = workouts.find((w) => w.id === params.id);
		if (!workout) throw notFound();
		return { workout };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
