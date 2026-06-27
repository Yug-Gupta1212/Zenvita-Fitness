import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as workouts } from "./workouts-gMKnFLcC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workouts._id-CcXIZQcD.js
var $$splitComponentImporter = () => import("./workouts._id-CrCnoXav.mjs");
var $$splitErrorComponentImporter = () => import("./workouts._id-CNfarTRg.mjs");
var $$splitNotFoundComponentImporter = () => import("./workouts._id-C6dFpinn.mjs");
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
