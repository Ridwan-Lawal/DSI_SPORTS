import { useEffect, useState } from "react";

export const initialState = {
  title: "",
  excerpt: "",
  category: "",
  tags: "",
  seoTitle: "",
  seoDescription: "",
  featuredImage: "",
};

export function useStoreFormDataInStorage(content: string) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    // getting the form data
    const storedFormData = localStorage.getItem("article-form-data");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("article-form-data", JSON.stringify(formData));

    localStorage.setItem("article-form-content", JSON.stringify(content));
  }, [formData, content]);

  return { formData, setFormData };
}
