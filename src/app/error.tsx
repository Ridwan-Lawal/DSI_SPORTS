"use client";

import React from "react";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>{error?.message}</h2>

      <button onClick={reset}>Go back</button>
    </div>
  );
}
