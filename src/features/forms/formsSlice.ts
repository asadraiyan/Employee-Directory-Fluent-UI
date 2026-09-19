import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  activeTab: "personal" | "contact" | "work";
  isSubmitting: boolean;
  selectedEmployeeId: number | null;
};

const initialState: FormState = {
  activeTab: "personal",
  isSubmitting: false,
  selectedEmployeeId: null,
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
    setSelectedEmployeeId: (state, action: PayloadAction<number | null>) => {
      state.selectedEmployeeId = action.payload;
    },
  },
});

export const { setActiveTab, setSubmitting, setSelectedEmployeeId } =
  formsSlice.actions;
export default formsSlice.reducer;
