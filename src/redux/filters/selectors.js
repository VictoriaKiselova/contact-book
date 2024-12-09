import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";
export const selectFilters = state => state.filters.name;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (selectContacts, selectFilters) => {
    if (!selectContacts) return [];
    return selectContacts
      .filter(elem => elem && elem.name && elem.number)
      .filter(
        elem =>
          elem.name
            .toLowerCase()
            .includes(selectFilters.toLowerCase().trim()) ||
          elem.number.includes(selectFilters)
      );
  }
);
