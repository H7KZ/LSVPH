// Node 26 exposes an experimental (non-functional) localStorage global.
// vitest's populateGlobal() skips keys that already exist in globalThis,
// so jsdom's real localStorage never gets installed. Force it here.
//
// This file runs inside the jsdom environment (after the environment is set up)
// so globalThis.jsdom is available.

declare const globalThis: typeof global & { jsdom?: { window: Window } }

if (globalThis.jsdom?.window?.localStorage) {
	Object.defineProperty(globalThis, 'localStorage', {
		configurable: true,
		writable: true,
		value: globalThis.jsdom.window.localStorage,
	})
}

if (globalThis.jsdom?.window?.sessionStorage) {
	Object.defineProperty(globalThis, 'sessionStorage', {
		configurable: true,
		writable: true,
		value: globalThis.jsdom.window.sessionStorage,
	})
}
