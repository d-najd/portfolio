import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
//@ts-ignore
import path from "path"
import { AliasOptions } from "vite"

//@ts-ignore
const root = path.resolve(__dirname, "src")

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/portfolio/",
	server: {
		open: true,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "src/setupTests",
		mockReset: true,
	},
	resolve: {
		alias: {
			"@": root,
		} as AliasOptions,
	},
})
