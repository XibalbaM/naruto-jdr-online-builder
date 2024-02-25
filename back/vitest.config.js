import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		dir: 'src/tests',
        globalSetup: ["./src/tests/setup.ts"],
        setupFiles: ["./src/tests/setup-each.ts"],
        threads: true,
        maxThreads: 1,
        minThreads: 1,
	}
});
