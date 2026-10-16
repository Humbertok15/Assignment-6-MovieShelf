function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="error-message" role="alert">
      <h2>Unable to load movies</h2>
      <p>{message}</p>
      <p>Please check your connection and try again.</p>
    </div>
  );
}

export default ErrorMessage;