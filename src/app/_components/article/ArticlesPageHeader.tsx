"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ArticlesPageHeader() {
  const router = useRouter();
  return (
    <>
      <button className="flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft className="size-4" />{" "}
        <span className="text-[15px] hover:underline">Back</span>
      </button>
      <header className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h4>Articles</h4>
          <p className="text-sm text-neutral-500 md:text-base">
            Manage your published and draft articles
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/admin/articles/new">
            <Button className="md:px-8 md:py-3" size="lg">
              <PenLine className="size-4" /> <span>New article</span>
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
}
