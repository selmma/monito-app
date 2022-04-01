import { combineReducers } from "@reduxjs/toolkit";
import reducerMovie from "./reducerMovie";

export const rootReducer = combineReducers({
  movies: reducerMovie,
});

export type RootState = ReturnType<typeof rootReducer>;
