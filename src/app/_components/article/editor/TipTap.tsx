"use client";

import Toolbar from "@/src/app/_components/article/editor/Toolbar";
import ListKeymap from "@tiptap/extension-list-keymap";

import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { Image } from "@tiptap/extension-image";

import "@/components/tiptap-node/image-upload-node/image-upload-node.scss";
import Placeholder from "@tiptap/extension-placeholder";
import { Dispatch, SetStateAction } from "react";
// import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

interface TiptapProps {
  content: string;
  onUpdateContent: Dispatch<SetStateAction<string>>;
}

function Tiptap({ content, onUpdateContent }: TiptapProps) {
  const editor = useEditor({
    editable: true,
    onUpdate: ({ editor }) => {
      onUpdateContent(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-10 w-full rounded-md border border-neutral-200 px-4 py-4 md:px-6 md:py-5 text-[15px] ring-neutral-300 h-[300px] overflow-auto transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50  md:text-sm",
      },
    },
    extensions: [
      Placeholder.configure({
        placeholder: "Write something about sport⚽...",
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4 list-outside",
          },
        },

        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-neutral-200 pl-4",
          },
        },
      }),
      Underline,
      Image,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      ListKeymap,

      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "justify",
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
        openOnClick: false,
        // autolink: false,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content,
  });

  return (
    <div className="space-y-4">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        placeholder="Write something about sport 🌎️ ..."
      />
    </div>
  );
}

export default Tiptap;

// fix the nav opening, on reload for mobile screen

// maybe i'll use redux to update the state and persist it so, when the page reloads, the data's will still be there

// continue with the rest of the form
