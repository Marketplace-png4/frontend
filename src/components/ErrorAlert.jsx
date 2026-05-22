const ErrorAlert = ({ message }) => {
  if (!message) return null;
  return (
    <div className="rounded-2xl border border-red-500 bg-red-600/15 px-4 py-3 text-red-100">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default ErrorAlert;
