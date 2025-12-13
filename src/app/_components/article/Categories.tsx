"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/src/app/_lib/data-service/articles/categories";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

interface CategoriesProps {
  defaultValue: string;
  setFormData: Dispatch<
    SetStateAction<{
      title: string;
      excerpt: string;
      category: string;
      tags: string;
      seoTitle: string;
      seoDescription: string;
      featuredImage: string;
    }>
  >;
  disabled: boolean;
}

export default function Categories({
  setFormData,
  defaultValue,
  disabled,
}: CategoriesProps) {
  const { data: categoriesData } = useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return (
    <Select
      value={defaultValue}
      onValueChange={(value) =>
        setFormData((cur) => ({ ...cur, category: value }))
      }
      disabled={disabled}
    >
      <SelectTrigger className="h-10 w-full capitalize">
        <SelectValue
          placeholder={
            <span className="capitalize">
              Select <span className="lowercase">a</span> category
            </span>
          }
          className="placeholder:lowercase"
        />
      </SelectTrigger>
      <SelectContent className="border-neutral-100">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categoriesData?.map((categoryData) => (
            <SelectItem
              key={categoryData?.id}
              value={categoryData?.category}
              className="capitalize"
            >
              {categoryData?.category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
