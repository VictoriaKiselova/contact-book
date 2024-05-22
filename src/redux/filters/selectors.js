import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";
export const selectFilters = state => state.filters.name;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (selectContacts, selectFilters) => {
    return selectContacts.filter(
      elem =>
        elem.name.toLowerCase().includes(selectFilters.toLowerCase().trim()) ||
        elem.number.includes(selectFilters)
    );
  }
);
