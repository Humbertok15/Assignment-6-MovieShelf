function LoadingSpinner() {
  return (
    <div className="loading-spinner" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p>Loading movies...</p>
    </div>
  );
}

export default LoadingSpinner;