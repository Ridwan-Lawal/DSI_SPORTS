import { RootState } from "@/src/app/_lib/redux/store";
import { posts } from "@/src/db/schema/article";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InferSelectModel } from "drizzle-orm";

type Article = InferSelectModel<typeof posts>;

interface articleSliceProps {
  articleToEdit: Article | null;
}

const initialState: articleSliceProps = {
  articleToEdit: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    onEditArticle(state, action: PayloadAction<Article>) {
      state.articleToEdit = action?.payload;
    },
  },
});

export const { onEditArticle } = articleSlice.actions;

export default articleSlice?.reducer;

export const getArticleReducer = (store: RootState) => store?.articles;
