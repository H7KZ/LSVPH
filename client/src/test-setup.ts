// ponytail: plain mock beats the Node 26 / jsdom populateGlobal fight
const store: Record<string, string> = {}
Object.defineProperty(globalThis, 'localStorage', {
	configurable: true,
	writable: true,
	value: {
		getItem: (k: string) => store[k] ?? null,
		setItem: (k: string, v: string) => { store[k] = v },
		removeItem: (k: string) => { delete store[k] },
		clear: () => { for (const k in store) delete store[k] },
	},
})
