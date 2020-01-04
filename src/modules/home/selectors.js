import { createSelector } from "reselect";

export const getPhrase = createSelector(
    [state => state.home],
    home => {
      return home.phrase;
    }
  );