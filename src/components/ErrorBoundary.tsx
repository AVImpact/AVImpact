// ErrorBoundary.tsx
// Written as a raw JS class with explicit type assertions to remain compatible
// with the project's tsconfig `useDefineForClassFields: false` setting.
import React, { ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKey?: string | number;
  componentName?: string;
}

interface BoundaryState {
  hasError: boolean;
  error: Error | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactComponent = React.Component as any;

// The `any`-based parent is required because `useDefineForClassFields: false`
// prevents TypeScript from resolving generic members on Component<P,S>.
// Runtime behaviour is fully correct — only the TS inference path differs.
export class ErrorBoundary extends ReactComponent {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const p = this.props as ErrorBoundaryProps;
    p.onError?.(error, errorInfo);
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const s = this.state as BoundaryState;
    const p = this.props as ErrorBoundaryProps;
    if (s.hasError && prevProps.resetKey !== p.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const s = this.state as BoundaryState;
    const p = this.props as ErrorBoundaryProps;
    if (s.hasError && s.error) {
      if (p.fallback) return p.fallback(s.error, this.handleReset);
      return (
        <DefaultFallback
          error={s.error}
          reset={this.handleReset}
          componentName={p.componentName}
        />
      );
    }
    return p.children;
  }
}

// ---------------------------------------------------------------------------
// Default Fallback UI — styled to match AV Impact design system
// ---------------------------------------------------------------------------
function DefaultFallback({
  error,
  reset,
  componentName,
}: {
  error: Error;
  reset: () => void;
  componentName?: string;
}) {
  const label = componentName ? `${componentName} section` : "this section";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center text-center px-6 py-12 min-h-[200px] rounded-2xl border border-slate-200/60 bg-slate-50/50"
    >
      <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mb-4">
        <svg
          className="w-5 h-5 text-rose-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>

      <h3 className="font-bold text-slate-800 text-sm mb-1 tracking-tight">
        Something went wrong
      </h3>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
        We had a problem loading {label}. This is likely a temporary issue.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-[#2559bd] text-white text-xs font-bold rounded-xl hover:bg-[#1f4a9e] transition-colors cursor-pointer shadow-sm"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Go to Homepage
        </button>
      </div>

      {import.meta.env.DEV && (
        <details className="mt-6 text-left w-full max-w-sm">
          <summary className="text-[10px] text-slate-400 cursor-pointer select-none font-mono">
            [DEV] Error details
          </summary>
          <pre className="mt-2 text-[9px] text-rose-600 bg-rose-50 border border-rose-100 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
            {error.message}
          </pre>
        </details>
      )}
    </div>
  );
}

export default ErrorBoundary;
