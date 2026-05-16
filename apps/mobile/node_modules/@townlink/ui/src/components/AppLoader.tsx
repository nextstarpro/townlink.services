export function AppLoader({ className = "" }: { className?: string }) {
  return <span className={`app-loader ${className}`} />;
}
