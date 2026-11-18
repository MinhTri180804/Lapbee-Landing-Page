import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\//, replacement: root },
      // `server-only` ném lỗi khi import ngoài React Server Components; trong test thay bằng module rỗng.
      { find: /^server-only$/, replacement: `${root}tests/stubs/server-only.ts` },
    ],
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    env: {
      SITE_URL: 'http://localhost:3000',
      USE_MOCK_API: 'true',
    },
  },
});
