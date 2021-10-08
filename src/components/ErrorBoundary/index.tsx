import { Component, PropsWithChildren, ReactNode } from "react";

interface Properties {
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    errorInfo: string;
}

export default class ErrorBoundary extends Component<PropsWithChildren<Properties>, State> {
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorInfo: error?.toString() };
    }

    constructor(properties) {
        super(properties);
        this.state = {
            hasError: false,
            errorInfo: null,
        };
    }

    render() {
        const { hasError, errorInfo } = this.state;
        const { children, fallback } = this.props;

        if (hasError) {
            return (
                fallback ?? (
                    <div>
                        <h1>Something went wrong.</h1>
                        {errorInfo ? <div>{errorInfo}</div> : null}
                    </div>
                )
            );
        }

        return children;
    }
}
