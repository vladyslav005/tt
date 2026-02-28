import {configureStore} from "@reduxjs/toolkit";
import termReducer from "@/shared/ui-state/termSlice";

export const store = configureStore({
  reducer: {
    term: termReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;