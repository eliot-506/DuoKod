import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: 'white', backgroundColor: '#900', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>Dasturda kutilmagan JavaScript xatosi yuz berdi ⚠️</h2>
          <br/>
          <h3 style={{color: '#ffaaaa'}}>{this.state.error && this.state.error.toString()}</h3>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', background: 'rgba(0,0,0,0.3)', padding: '20px' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <br/>
          <p>Iltimos ushbu rasmni dasturchiga yuboring!</p>
          <button onClick={() => window.location.href = '/'} style={{marginTop: '20px', padding: '10px 20px', background: '#fff', color: '#900', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>Bosh sahifaga qaytish</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
