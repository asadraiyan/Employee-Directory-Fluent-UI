import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  activeTab: "personal" | "contact" | "work";
  isSubmitting: boolean;
};

const initialState: FormState = {
  activeTab: "personal",
  isSubmitting: false,
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setActiveTab: (
      state,
      action: PayloadAction<FormState["activeTab"]>
    ) => {
      state.activeTab = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const { setActiveTab, setSubmitting } = formsSlice.actions;
export default formsSlice.reducer;
