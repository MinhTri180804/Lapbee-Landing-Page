import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

/** Phần bên trong content layer: chỉ content/ được dùng; bên ngoài đi qua `@/content`. */
const CONTENT_INTERNALS = {
  group: ['@/content/pages/*', '@/content/site', '@/content/adapters/*', '@/content/resolve'],
  message:
    'Không đọc nội dung/adapter trực tiếp. Dùng getPageContent()/getSiteSettings() từ "@/content".',
};

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },
  // Trang/route: lấy nội dung landing qua content layer, không đọc file nội dung hay adapter.
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': ['error', { patterns: [CONTENT_INTERNALS] }],
    },
  },
  // Component trình bày: CHỈ nhận dữ liệu qua props — không gọi API, không đọc nội dung.
  // Được `import type` từ "@/content" để khai báo kiểu props.
  {
    files: ['components/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            CONTENT_INTERNALS,
            {
              group: ['@/content', '@/content/schemas/*', '@/lib/api', '@/lib/api/*', '@/lib/env'],
              allowTypeImports: true,
              message:
                'Component trình bày chỉ nhận dữ liệu qua props (chỉ được `import type` từ content).',
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Design system gốc: chỉ để tham chiếu, không phải code của app.
    'design-system/**',
  ]),
]);
