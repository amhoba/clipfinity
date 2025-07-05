export default function SimpleSpinner() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-white">Loading...</span>
    </div>
  );
}