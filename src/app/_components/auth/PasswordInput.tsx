import { Eye, EyeClosed } from "lucide-react";

interface PasswordInputProps {
  htmlFor: string;
  label: string;
  children: React.ReactNode;
  onShowPassword: () => void;
  showPassword: boolean;
  error?: string;
  isPasswordInputFocused: boolean;
}

export default function PasswordInput({
  htmlFor,
  label,
  children,
  onShowPassword,
  showPassword,
  isPasswordInputFocused,
  error,
}: PasswordInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[15px] font-medium text-neutral-800 capitalize md:text-base"
      >
        {label}
      </label>
      <div
        className={`password-field transition ${isPasswordInputFocused && "password-field-focus"} ${error && "border border-red-600"}`}
      >
        {children}

        <button
          type="button"
          className="cursor-pointer"
          onClick={onShowPassword}
        >
          {showPassword ? (
            <EyeClosed className="size-[18px] text-neutral-400" />
          ) : (
            <Eye className="size-[18px] text-neutral-400" />
          )}
        </button>
      </div>

      {error && <p className="text-right text-xs text-red-600">{error}</p>}
    </div>
  );
}
