"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bebasNeue } from "@/src/app/_styles/font";

export function MostRecentArticlesSkeleton() {
  return (
    <div className="mt-10 space-y-6 bg-white px-4 pt-6 pb-8 shadow-lg shadow-gray-100 sm:px-6 md:px-8 md:pt-8 md:pb-9 lg:mx-auto lg:max-w-[1100px]">
      {/* Heading */}
      <div>
        <h4 className={`${bebasNeue?.className} text-xl`}>Most Recent News</h4>
        <p className="text-sm text-neutral-500">The most recent News.</p>
      </div>

      {/* Horizontal scroll of cards */}
      <div className="relative flex">
        <div className="no-scrollbar flex gap-4 overflow-x-scroll">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex w-[300px] shrink-0 flex-col justify-between space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm md:border md:border-neutral-100 md:shadow-sm md:shadow-neutral-100"
            >
              {/* Title and image */}
              <div className="flex justify-between gap-4 md:flex-col">
                <Skeleton className="h-5 w-[80%] md:order-2 md:w-full md:px-4" />
                <Skeleton className="relative order-1 h-[90px] w-[70px] md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]" />
              </div>

              {/* Author and category */}
              <div className="flex items-center justify-between md:px-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-[20px] rounded-full" />
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-3 w-[12px] rounded-full" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>

                <Skeleton className="hidden h-4 w-[50px] xl:block" />
              </div>
            </div>
          ))}
        </div>

        {/* Right side fade effect */}
        <div className="box-shadow absolute top-0 right-0 h-full w-2 bg-white" />
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className="">
      <div className="mx-auto max-w-[900px]">
        {/* Featured Image */}
        <div className="relative aspect-video w-full">
          <Skeleton className="absolute h-full w-full" />
        </div>

        {/* Content Card */}
        <div className="z-10 bg-white px-4 pt-6 pb-10 shadow-lg shadow-neutral-100 sm:px-6 md:px-8 md:pt-8 md:pb-12 lg:relative lg:-top-16 lg:ml-auto lg:max-w-[850px]">
          {/* Author & Date */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="h-4 w-[100px]" />
              <div className="h-4 border border-neutral-300" />
              <Skeleton className="h-4 w-[80px]" />
            </div>

            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {/* Title */}
          <Skeleton className="mt-2 h-10 w-3/4" />
          <Skeleton className="mt-2 h-10 w-2/5" />

          {/* Tags */}
          <div className="mt-4 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-[70px] rounded-sm" />
            ))}
          </div>

          {/* Excerpt */}
          <div className="mt-6 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-4/6" />
          </div>
        </div>

        {/* Content */}
        <div className="-mt-4 bg-white px-4 pt-6 pb-8 shadow-lg shadow-gray-100 sm:px-6 md:px-8 lg:ml-auto lg:max-w-[850px]">
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Most Recent Articles */}
      <div className="mt-10 bg-white p-8 px-4">
        <Skeleton className="mb-4 h-6 w-1/3" />
        <div className="no-scrollbar flex gap-4 overflow-x-scroll">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-[300px] shrink-0 rounded-md" />
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-10 space-y-3 px-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
    </div>
  );
}

export default function NewsSkeleton() {
  return (
    <div className="mt-5 space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-30" />
        <Skeleton className="h-5 w-50" />
      </div>

      {/* Featured Post Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div className="flex flex-col gap-4 overflow-hidden rounded-sm border-b border-neutral-200 pb-6 md:col-span-2 md:flex-row md:items-center md:pr-4 md:pb-0 lg:col-span-4 lg:mb-6">
          <Skeleton className="relative h-[280px] w-full md:h-[400px] md:w-[50%] lg:w-[65%]" />
          <div className="space-y-3 md:w-[50%] lg:w-[35%] lg:space-y-5">
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="hidden h-4 w-[90%] md:block" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[24px] rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Other Articles Skeleton */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="space-y-4 overflow-hidden border-b border-neutral-200 pb-5 md:space-y-8 md:rounded-sm"
          >
            <div className="flex justify-between md:flex-col md:gap-4">
              <Skeleton className="h-5 w-[80%] md:order-2 md:w-full md:px-4" />
              <Skeleton className="relative order-1 h-[90px] w-[70px] md:aspect-video md:h-[220px] md:w-full md:rounded-none lg:h-[200px]" />
            </div>
            <div className="flex items-center justify-between md:px-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-[20px] rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsTabsSkeleton() {
  return (
    <div className="">
      <Tabs defaultValue="all" className="no-scrollbar">
        <div className="no-scrollbar h-full w-full overflow-hidden rounded-lg">
          <TabsList className="mx-auto w-full space-x-4 overflow-hidden">
            {/* Static "All News" tab */}
            <TabsTrigger value="all" className="text-neutral-700">
              All News
            </TabsTrigger>

            {/* Simulated category tabs */}
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-[100px] rounded-md" />
            ))}
          </TabsList>
        </div>

        {/* Optional fallback section while content is loading */}
        <div className="mt-6 px-4">
          <Skeleton className="mb-4 h-6 w-1/3" />
          <Skeleton className="h-40 w-full rounded-md" />
        </div>
      </Tabs>
    </div>
  );
}
