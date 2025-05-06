import { useEffect, useRef, useState } from "react";

export function usePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onShowPassword = () => setShowPassword((cur) => !cur);

  useEffect(() => {
    const inputEl = inputRef?.current;
    if (!inputEl) return;

    function onFocusPasswordInput() {
      console.log(true);
      setIsPasswordInputFocused(true);
    }
    function onBlurPasswordInput() {
      console.log(false);
      setIsPasswordInputFocused(false);
    }

    inputEl.addEventListener("focus", onFocusPasswordInput);
    inputEl.addEventListener("blur", onBlurPasswordInput);

    return () => {
      inputEl.removeEventListener("focus", onFocusPasswordInput);
      inputEl.addEventListener("blur", onFocusPasswordInput);
    };
  }, []);

  return { showPassword, inputRef, isPasswordInputFocused, onShowPassword };
}
