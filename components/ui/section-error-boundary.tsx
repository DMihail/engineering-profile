"use client";

import { Component, type ReactNode } from "react";
import { UI_LABELS } from "@/lib/content/ui-labels";

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
        <div className="py-16 px-4 text-center" role="alert">
          <p className="mono-label mb-2">{UI_LABELS.errorBoundary.label}</p>
          <h2 className="sr-only">{UI_LABELS.errorBoundary.unavailable}</h2>
          <p className="text-sm text-muted-foreground">
            {UI_LABELS.errorBoundary.failedToLoad}{" "}
            <button
              type="button"
              onClick={() => this.setState({ error: null })}
              className="text-primary underline cursor-pointer"
            >
              {UI_LABELS.errorBoundary.retry}
            </button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
