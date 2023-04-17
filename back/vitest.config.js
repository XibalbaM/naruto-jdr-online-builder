import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		dir: 'src/tests',
		watchExclude: ['./**/*'] //To avoid starting the test runner when a file is changed, because the tests fails because the server is not fully started
	},
});
