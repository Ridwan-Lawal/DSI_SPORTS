"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@tiptap/react";
import { Link, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LinkToggle({ editor }: { editor: Editor | null }) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkFieldOpen, setLinkFieldOpen] = useState(false);

  const setLink = useCallback(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;
    console.log(hasSelection);
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      console.log(editor?.getJSON(), "Okay");
    }

    try {
      setIsLoading(false);
      console.log(url);
      console.log(editor?.getJSON(), "omya");

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();

      console.log(editor?.getJSON());
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Something went wrong");
      }
    } finally {
      setUrl("");
      setIsLoading(false);
      setLinkFieldOpen(false);
    }
  }, [editor, url]);

  function onAddLink() {
    if (!editor) return;
    const existingUrl = editor.getAttributes("link").href;
    setUrl(existingUrl || "");
    setLinkFieldOpen(true);
  }

  function onRemoveLink() {
    if (!editor) return;
    if (editor.isActive(`link`)) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
  }

  useEffect(() => {
    function onBlurLinkModal(e: MouseEvent) {
      const targetEl = e.target as HTMLElement;

      if (!targetEl.closest(".link-block")) {
        setLinkFieldOpen(false);
      } else {
        setLinkFieldOpen(true);
      }
    }

    window.addEventListener("click", onBlurLinkModal);

    return () => window.removeEventListener("click", onBlurLinkModal);
  }, []);

  return (
    <div className="link-block flex flex-col items-center gap-2">
      <button type="button" onClick={onAddLink}>
        <Link className="h-4 w-4" onClick={onAddLink} />
      </button>
      {linkFieldOpen && (
        <div className="absolute top-12 right-4 z-30 w-[300px] rounded-md bg-white p-2 shadow-md shadow-neutral-200 md:w-fit">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Paste a link..."
              className="text-sm"
              aria-label="enter a link"
              aria-live="polite"
              disabled={isLoading}
              aria-disabled={isLoading}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              disabled={isLoading || !url}
              aria-disabled={isLoading}
              type="button"
              className="text-sm disabled:bg-neutral-600"
              onClick={setLink}
            >
              {isLoading ? "..." : "Apply"}
            </Button>

            <button
              type="button"
              className="rounded-md p-1 hover:bg-neutral-100"
            >
              <X
                className="h-4 w-4 cursor-pointer"
                onClick={() => {
                  onRemoveLink();
                  setLinkFieldOpen(false);
                  setUrl("");
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
