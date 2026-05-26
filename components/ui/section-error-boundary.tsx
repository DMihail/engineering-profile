"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error("[SectionError]", error);
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="py-16 px-4 text-center">
          <p className="mono-label mb-2">{"// section_error"}</p>
          <p className="text-sm text-muted-foreground">
            This section failed to load.{" "}
            <button
              type="button"
              onClick={() => this.setState({ error: null })}
              className="text-primary underline cursor-pointer"
            >
              Retry
            </button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
