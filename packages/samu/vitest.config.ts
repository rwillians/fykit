import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    exclude: [...configDefaults.exclude, ".turbo"],
    coverage: {
      provider: "c8",
      reportsDirectory: "coverage/",
    },
  },
});
