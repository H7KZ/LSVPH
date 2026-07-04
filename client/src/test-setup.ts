// Node 26 exposes an experimental (non-functional) localStorage global.
// vitest's populateGlobal() skips keys that already exist in globalThis,
// so jsdom's real localStorage never gets installed. Force it here.
//
// This file runs inside the jsdom environment (after the environment is set up)
// so g.jsdom is available.

type JsdomGlobal = typeof globalThis & { jsdom?: { window: Window } }
const g = globalThis as JsdomGlobal

if (g.jsdom?.window?.localStorage) {
	Object.defineProperty(globalThis, 'localStorage', {
		configurable: true,
		writable: true,
		value: g.jsdom.window.localStorage
	})
}

if (g.jsdom?.window?.sessionStorage) {
	Object.defineProperty(globalThis, 'sessionStorage', {
		configurable: true,
		writable: true,
		value: g.jsdom.window.sessionStorage
	})
}
