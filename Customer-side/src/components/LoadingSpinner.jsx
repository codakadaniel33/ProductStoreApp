const LoadingSpinner = ({ message = 'Loading...', size = 'h-14 w-14', className = '' }) => {
  return (
    <div className={`rounded-3xl bg-white px-8 py-10 shadow-lg ${className}`}>
      <div className="flex min-h-48 flex-col items-center justify-center gap-4">
        <div className={`animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 ${size}`} aria-hidden="true" />
        <p className="text-slate-600 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
