import { RootState } from "@/src/app/_lib/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface layoutProps {
  mobileSidebarIsOpen: boolean;
}

const initialState: layoutProps = {
  mobileSidebarIsOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    onToggleSidebar(state, action: PayloadAction<undefined | boolean>) {
      if (action?.payload === true || action?.payload === false) {
        state.mobileSidebarIsOpen = action.payload;
      } else {
        state.mobileSidebarIsOpen = !state.mobileSidebarIsOpen;
      }
    },
  },
});

export const { onToggleSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;

export const getLayout = (store: RootState) => store?.layout;
