"use client";

import { Button } from "@/components/ui/button";
import Categories from "@/src/app/_components/article/Categories";

import { Input as ShadInput } from "@/components/ui/input";
import Tiptap from "@/src/app/_components/article/editor/TipTap";
import Input from "@/src/app/_components/auth/Input";
import {
  initialState,
  useStoreFormDataInStorage,
} from "@/src/app/_hooks/useStoreFormDataInStorage";
import { useUploadImageToCloudinary } from "@/src/app/_hooks/useUploadImageToCloudinary";
import {
  draftArticleAction,
  publishArticleAction,
} from "@/src/app/_lib/actions/articles/create-article";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Suspense,
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import toast from "react-hot-toast";

export default function NewArticle() {
  const [content, setContent] = useState(() =>
    localStorage.getItem("article-form-content")
      ? JSON.parse(localStorage.getItem("article-form-content") || "")
      : "",
  );
  const { formData, setFormData } = useStoreFormDataInStorage(content);
  const { featuredImageLink, onImageUpload } = useUploadImageToCloudinary();
  const router = useRouter();
  const [isDrafting, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [state, formAction, isPublishing] = useActionState(
    publishArticleAction,
    null,
  );
  const { formErrors, inputs } = state ?? {};
  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.success);
        // clear article data, when published or drafted
        localStorage.removeItem("article-form-data");
        localStorage.removeItem("article-form-content");
        router.push("/admin/overview");
      }
    }
  }, [state, router]);

  console.log(featuredImageLink, "feature");

  function onDraftArticle() {
    const articleContentTodraft = {
      ...formData,
      content,
      featuredImageLink,
    };

    startTransition(() =>
      draftArticleAction(articleContentTodraft).then((data) => {
        if (data?.success) {
          toast.success(data.success);

          // clear article data, when published or drafted
          localStorage.removeItem("article-form-data");
          localStorage.removeItem("article-form-content");

          // redirect to dashboard
          router.push("/admin/overview");
        } else if (data?.error) {
          toast.error(data.error);
        }
      }),
    );
  }

  function onCancelArticle() {
    // clear the form state
    setFormData(initialState);
    setContent("");

    // clear the form value
    const formEl = formRef.current;
    if (formEl) {
      formEl.reset();
    }
  }

  return (
    <div className="px-4 pt-4 pb-8 lg:px-6">
      <button className="flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft className="size-4" />{" "}
        <span className="text-[15px] hover:underline">Back</span>
      </button>
      <header className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h4>Create Article</h4>
          <p className="text-sm text-neutral-500 md:text-base">
            Create and publish a new article
          </p>
        </div>

        {/* buttons */}
        <div className="flex gap-4">
          <Button
            disabled={isDrafting || isPublishing}
            aria-disabled={isDrafting || isPublishing}
            variant="outline"
            onClick={onCancelArticle}
          >
            Cancel
          </Button>
          <Button
            onClick={onDraftArticle}
            disabled={isDrafting || isPublishing}
            aria-disabled={isDrafting || isPublishing}
          >
            Save draft
          </Button>
        </div>
      </header>

      {/*  */}

      <main className="mt-8">
        <form action={formAction} autoComplete="on" ref={formRef}>
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* ====== Article content ==== */}
            <div className="space-y-6 rounded-lg border border-neutral-200 px-4 py-6 lg:w-[60%]">
              <div>
                <h5 className="font-semibold">Article Content</h5>
                <p className="text-sm text-neutral-500 md:text-base">
                  Write your article content here
                </p>
              </div>
              {/* ==== title ====  */}
              <div className="space-y-5">
                <Input
                  htmlFor="title"
                  label="Title"
                  error={formErrors?.title?.at(0)}
                >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    disabled={isPublishing || isDrafting}
                    aria-disabled={isPublishing || isDrafting}
                    onChange={(e) =>
                      setFormData((cur) => ({ ...cur, title: e.target.value }))
                    }
                    defaultValue={(inputs?.title as string) || formData?.title}
                    autoComplete="title"
                    aria-label="title"
                    aria-live="polite"
                    aria-invalid={!!formErrors?.title?.at(0)}
                    aria-describedby="title-error"
                    placeholder="Fill in the article title"
                    className="md:h-[42px] md:py-3 md:text-base"
                  />
                </Input>

                {/* ==== Excerpt ===== */}
                <Input
                  htmlFor="excerpt"
                  label="Excerpt"
                  error={formErrors?.excerpt?.at(0)}
                >
                  <textarea
                    rows={3}
                    name="excerpt"
                    id="excerpt"
                    disabled={isPublishing || isDrafting}
                    aria-disabled={isPublishing || isDrafting}
                    defaultValue={
                      (inputs?.excerpt as string) || formData?.excerpt
                    }
                    onChange={(e) =>
                      setFormData((cur) => ({
                        ...cur,
                        excerpt: e.target.value,
                      }))
                    }
                    aria-invalid={!!formErrors?.excerpt?.at(0)}
                    aria-describedby="title-error"
                    autoComplete="excerpt"
                    aria-label="excerpt"
                    aria-live="polite"
                    placeholder="Fill in a short excerpt for this article"
                    className="md:py-3 md:text-base"
                    maxLength={180}
                  />
                </Input>

                <input type="hidden" value={content} name="content" />
                <Input
                  htmlFor="content"
                  label="Content"
                  error={formErrors?.content?.at(0)}
                >
                  <Tiptap content={content} onUpdateContent={setContent} />
                </Input>
              </div>
            </div>

            {/* ==== article settings and seo settings */}
            <div className="flex flex-col gap-5 lg:w-[40%]">
              {/* ===== Article settings ======== */}
              <div className="h-fit space-y-6 rounded-lg border border-neutral-200 px-4 py-6 lg:w-full">
                <div>
                  <h5 className="font-semibold capitalize">article settings</h5>
                  <p className="text-sm text-neutral-500 md:text-base">
                    Configure article metadata
                  </p>
                </div>

                <div className="space-y-5">
                  {/* ==== category ====  */}
                  <input
                    type="hidden"
                    value={formData?.category}
                    name="category"
                  />
                  <Input
                    htmlFor="category"
                    label="Category"
                    error={formErrors?.category?.at(0)}
                  >
                    <Suspense fallback={<div>Loading...</div>}>
                      <Categories
                        disabled={isPublishing || isDrafting}
                        defaultValue={formData?.category}
                        setFormData={setFormData}
                      />
                    </Suspense>
                  </Input>

                  {/* ==== tags ===== */}
                  <Input
                    htmlFor="tags"
                    label="Tags"
                    error={formErrors?.tags?.at(0)}
                  >
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      disabled={isPublishing || isDrafting}
                      aria-disabled={isPublishing || isDrafting}
                      defaultValue={(inputs?.title as string) || formData?.tags}
                      onChange={(e) =>
                        setFormData((cur) => ({ ...cur, tags: e.target.value }))
                      }
                      autoComplete="tags"
                      aria-label="tags"
                      aria-describedby="tags-error"
                      aria-invalid={!!formErrors?.tags?.at(0)}
                      aria-live="polite"
                      placeholder="Enter tags seperated by commas e.g Transfer, Ronaldo, Al-hilal, CR7"
                      className="text-sm"
                    />
                  </Input>

                  {/* ==== Featured image ==== */}
                  <input
                    type="hidden"
                    name="featuredImageLink"
                    value={featuredImageLink || ""}
                  />
                  <Input
                    htmlFor="featuredImage"
                    label="Feature Image"
                    error={
                      formErrors?.featuredImage?.at(0) ||
                      formErrors?.featuredImageLink?.at(0)
                    }
                  >
                    <ShadInput
                      type="file"
                      disabled={isPublishing || isDrafting}
                      aria-disabled={isPublishing || isDrafting}
                      name="featuredImage"
                      id="featuredImage"
                      onChange={(e) => onImageUpload(e)}
                      defaultValue=""
                      autoComplete="featuredImage"
                      aria-label="featuredImage"
                      aria-invalid={!!formErrors?.featuredImage?.at(0)}
                      aria-describedby="featureImage-error"
                      aria-live="polite"
                      placeholder=""
                      className="flex h-10 items-center md:text-base"
                    />
                  </Input>
                </div>

                {/* ===== SEO SETTINGS ====*/}
                <div className="h-fit space-y-6 rounded-lg border border-neutral-200 px-4 py-6 lg:w-full">
                  <div>
                    <h5 className="font-semibold capitalize">SEO Settings</h5>
                    <p className="text-sm text-neutral-500 md:text-base">
                      Optimize this article for search engines
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* ==== Excerpt ===== */}
                    <Input htmlFor="seoTitle" label="SEO Title" error="">
                      <input
                        type="text"
                        name="seoTitle"
                        id="seoTitle"
                        disabled={isPublishing || isDrafting}
                        aria-disabled={isPublishing || isDrafting}
                        defaultValue={formData?.seoTitle}
                        onChange={(e) =>
                          setFormData((cur) => ({
                            ...cur,
                            seoTitle: e.target.value,
                          }))
                        }
                        autoComplete="seoTitle"
                        aria-label="seoTitle"
                        aria-live="polite"
                        placeholder="Enter SEO title"
                        className="text-sm"
                      />
                    </Input>

                    {/* ==== Meta description ===== */}
                    <Input
                      htmlFor="seoDescription"
                      label="Meta Description"
                      error=""
                    >
                      <textarea
                        rows={3}
                        name="seoDescription"
                        id="seoDescription"
                        disabled={isPublishing || isDrafting}
                        aria-disabled={isPublishing || isDrafting}
                        defaultValue={formData?.seoDescription}
                        onChange={(e) =>
                          setFormData((cur) => ({
                            ...cur,
                            seoDescription: e.target.value,
                          }))
                        }
                        autoComplete="seoDescription"
                        aria-label="seoDescription"
                        aria-live="polite"
                        placeholder="Enter meta description"
                        className="md:py-3 md:text-base"
                      />
                    </Input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              disabled={isPublishing || isDrafting}
              aria-disabled={isPublishing || isDrafting}
              className="h-10 px-8"
            >
              Publish
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

// deal with the form overflow, set a fixed height and overflow to scroll
// Store the data to the local storage, upon page reload.
