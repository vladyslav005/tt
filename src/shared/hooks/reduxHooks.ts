import {type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type {AppDispatch, RootState} from "@/app/providers/store.ts";


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
