"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

export default function Content({
  postContent,
}: {
  postContent: string | undefined;
}) {
  const [editable] = useState(false);
  const editor = useEditor({
    shouldRerenderOnTransaction: false,
    editable,
    content: postContent,

    extensions: [StarterKit],
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
