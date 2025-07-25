"use client";

import { Editor } from "@tiptap/react";

import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { Toggle } from "@/components/ui/toggle";
import Headings from "@/src/app/_components/article/editor/Headings";
import LinkToggle from "@/src/app/_components/article/editor/LinkToggle";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  Strikethrough,
  TextQuote,
  Underline,
} from "lucide-react";

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="no-scrollbar flex items-center gap-4 overflow-auto rounded-md border border-neutral-200 px-4 py-2">
      <Headings editor={editor} />
      {/* bold */}
      <Toggle
        size="sm"
        aria-label="Toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      {/* italic */}
      <Toggle
        size="sm"
        aria-label="Toggle italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      {/* block quote */}
      <Toggle
        size="sm"
        aria-label="Toggle quote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <TextQuote className="h-4 w-4" />
      </Toggle>

      {/* list */}
      <Toggle
        size="sm"
        aria-label="Toggle list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      <div className="h-6 border-r border-neutral-200" />

      {/* underline */}
      <Toggle
        size="sm"
        aria-label="Toggle list"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      {/* strike through */}
      <Toggle
        size="sm"
        aria-label="Toggle strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      {/* link */}
      <LinkToggle editor={editor} />

      {/* image upload */}
      <ImageUploadButton editor={editor} />

      <div className="h-6 border-r border-neutral-200" />

      {/* alignments */}

      {/* left */}
      <Toggle
        size="sm"
        aria-label="Toggle align"
        onClick={() => editor.chain().focus().toggleTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      {/* center */}
      <Toggle
        size="sm"
        aria-label="Toggle align"
        onClick={() => editor.chain().focus().toggleTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      {/* right */}
      <Toggle
        size="sm"
        aria-label="Toggle align"
        onClick={() => editor.chain().focus().toggleTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      {/* justify */}
      <Toggle
        size="sm"
        aria-label="Toggle align"
        onClick={() => editor.chain().focus().toggleTextAlign("justify").run()}
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
