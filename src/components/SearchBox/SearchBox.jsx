import { changeFilter, selectFilters } from "../../redux/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const selectNameFilter = useSelector(selectFilters);

  return (
    <label htmlFor="valueContact" className={css.wrapper}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="valueContact"
        value={selectNameFilter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </label>
  );
}
