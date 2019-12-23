import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({
      errorInfo: info.componentStack,
    });
  }

  render() {
    const { hasError, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          {errorInfo && <pre>{errorInfo}</pre>}
        </div>
      );
    }

    return children;
  }
}
