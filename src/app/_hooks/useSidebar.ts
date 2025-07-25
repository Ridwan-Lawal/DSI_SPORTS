import { onToggleSidebar } from "@/src/app/_lib/redux/features/layoutSlice";
import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import { useEffect } from "react";

export function useSidebar() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // on reload this should run
    if (window.innerWidth >= 768) {
    
      dispatch(onToggleSidebar(true));
    } else if (window.innerWidth <= 768) {
      
      dispatch(onToggleSidebar(false));
    }
    // while this should run as the screen is being resized
    function onViewport() {
      if (window.innerWidth >= 768) {
        dispatch(onToggleSidebar(true));
      } else {
        dispatch(onToggleSidebar(false));
      }
    }

    window.addEventListener("resize", onViewport);

    return () => window.removeEventListener("resize", onViewport);
  }, [dispatch]);

  useEffect(() => {
    function onBlurSidebar(e: MouseEvent) {
      const overlayEl = e.target as HTMLDivElement;
      if (overlayEl.classList.contains("sidebar-overlay")) {
        dispatch(onToggleSidebar(false));
      }
    }

    window.addEventListener("click", onBlurSidebar);
    return () => {
      window.removeEventListener("click", onBlurSidebar);
    };
  }, [dispatch]);
}
