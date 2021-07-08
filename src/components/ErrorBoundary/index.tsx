import { Component, PropsWithChildren, ReactNode } from "react";

interface Props {
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    errorInfo: string;
}

export default class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorInfo: error?.toString() };
    }

    constructor(props) {
        super(props);
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
