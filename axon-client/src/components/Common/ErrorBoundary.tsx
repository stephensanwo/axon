import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps
  extends React.PropsWithChildren<{ fallback: ReactNode }> {}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error("Error caught by ErrorBoundary:", error);
    // TODO: log error to service
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // TODO: Log error to service or perform any other action
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render the fallback UI if there's an error
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
