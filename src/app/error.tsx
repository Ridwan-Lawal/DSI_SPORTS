"use client";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <h5 className="md:">{error?.message}</h5>
      <button
        className="rounded-sm bg-neutral-900 px-6 py-2 text-sm text-white"
        onClick={reset}
      >
        Go back
      </button>
    </div>
  );
}
