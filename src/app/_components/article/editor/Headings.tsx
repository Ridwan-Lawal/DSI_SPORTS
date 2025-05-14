"use client";

import { Editor } from "@tiptap/react";
import { Check, Heading } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Headings({ editor }: { editor: Editor | null }) {
  const [headingSelected, setHeadingSelect] = useState<string | null>(null);

  if (!editor) {
    return null;
  }

  function onSelectHeading(heading: string) {
    setHeadingSelect((cur) => (heading === cur ? null : heading));

    if (editor) {
      if (heading === "h1") {
        return editor.chain().focus().toggleHeading({ level: 1 }).run();
      }

      if (heading === "h2") {
        return editor.chain().focus().toggleHeading({ level: 2 }).run();
      }

      if (heading === "h3") {
        return editor.chain().focus().toggleHeading({ level: 3 }).run();
      }

      if (heading === "h4") {
        return editor.chain().focus().toggleHeading({ level: 4 }).run();
      }

      if (heading === "h5") {
        return editor.chain().focus().toggleHeading({ level: 4 }).run();
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-0">
        {headingSelected ? (
          <span>
            H<span className="text-xs">{headingSelected?.slice(-1)}</span>
          </span>
        ) : (
          <Heading className="size-4 text-neutral-600" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-neutral-700">
          Headings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {[1, 2, 3, 4, 5].map((num) => (
          <DropdownMenuCheckboxItem
            key={num}
            onClick={() => onSelectHeading(`h${num}`)}
            className="flex items-center gap-2 font-medium text-neutral-600"
          >
            {headingSelected === `h${num}` && <Check />}{" "}
            <span>
              H<span className="text-xs">{num}</span>
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
