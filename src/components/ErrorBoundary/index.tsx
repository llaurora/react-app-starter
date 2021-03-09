import { Component, ErrorInfo, PropsWithChildren } from "react";

interface State {
    error: Error;
    errorInfo: ErrorInfo;
}

export default class ErrorBoundary extends Component<PropsWithChildren<any>, State> {
    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        this.setState({ error, errorInfo: info });
    }

    render() {
        const { error, errorInfo } = this.state;
        const { children } = this.props;

        if (errorInfo) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <div>{error?.toString()}</div>
                    <div>{errorInfo?.componentStack}</div>
                </div>
            );
        }

        return children;
    }
}
