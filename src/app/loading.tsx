export default function Loading() {
  return (
    <div role="status" className="flex min-h-[80svh] items-center justify-center bg-ink">
      <span className="display animate-pulse text-7xl italic text-accent">&amp;</span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
