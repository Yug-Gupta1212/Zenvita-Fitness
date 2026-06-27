//#region node_modules/.nitro/vite/services/ssr/assets/browser-safe-DPMYmjS3.js
function getSafeWindow() {
	return typeof window === "undefined" ? void 0 : window;
}
function getSafeDocument() {
	return typeof document === "undefined" ? void 0 : document;
}
function getSafeLocalStorage() {
	return typeof window === "undefined" ? void 0 : window.localStorage;
}
function getSafeSessionStorage() {
	return typeof window === "undefined" ? void 0 : window.sessionStorage;
}
//#endregion
export { getSafeWindow as i, getSafeLocalStorage as n, getSafeSessionStorage as r, getSafeDocument as t };
