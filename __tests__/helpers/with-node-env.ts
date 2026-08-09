type NodeEnv = "development" | "production" | "test";

const mutableEnv = process.env as Record<string, string | undefined>;

export function withNodeEnv<T>(nodeEnv: NodeEnv, run: () => T): T {
  const previous = mutableEnv.NODE_ENV;
  mutableEnv.NODE_ENV = nodeEnv;
  try {
    return run();
  } finally {
    if (previous === undefined) {
      delete mutableEnv.NODE_ENV;
    } else {
      mutableEnv.NODE_ENV = previous;
    }
  }
}

export async function withNodeEnvAsync<T>(nodeEnv: NodeEnv, run: () => Promise<T>): Promise<T> {
  const previous = mutableEnv.NODE_ENV;
  mutableEnv.NODE_ENV = nodeEnv;
  try {
    return await run();
  } finally {
    if (previous === undefined) {
      delete mutableEnv.NODE_ENV;
    } else {
      mutableEnv.NODE_ENV = previous;
    }
  }
}
