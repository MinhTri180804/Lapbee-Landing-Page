/** Kiểu cho mocks/handler.mjs (để lib/api/inline-mock.ts import được khi `allowJs: false`). */
export type MockResponse = { status: number; body: unknown };

export function createMockHandler(options: {
  load: (relativePath: string) => Promise<unknown>;
}): (url: URL, imageUrl: (path: string) => string) => Promise<MockResponse>;
