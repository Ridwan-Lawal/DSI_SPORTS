interface InputProps {
  htmlFor: string;
  children: React.ReactNode;
  label: string;
  error?: string;
}

export default function Input({ htmlFor, children, label, error }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[15px] font-medium text-neutral-800 capitalize"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-right text-xs text-red-600">{error}</p>}
    </div>
  );
}
