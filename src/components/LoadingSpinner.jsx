const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <div className="inline-flex flex-col items-center gap-3 text-center text-[#D4AF37]">
      <div className="h-12 w-12 rounded-full border-4 border-transparent border-t-[#D4AF37] animate-spin"></div>
      <span>{message}</span>
    </div>
  </div>
);

export default LoadingSpinner;
