import React from "react";
import classes from "./List.module.scss";
import clsx from "clsx";
import type { ListProps } from "./List.types";
import { SATAUS } from "../types";

const List: React.FC<ListProps> = ({
  data,
  selectedItem,
  status,
  onSelect,
}) => (
  <ul className={classes.list}>
    {data.map((data) => (
      <li
        key={data}
        className={clsx(
          classes.listItem,
          data === selectedItem && classes["listItem--selected"],
          data === selectedItem &&
            status === SATAUS.CORRECT &&
            classes["listItem--correct"],
          data === selectedItem &&
            status === SATAUS.WRONG &&
            classes["listItem--wrong"]
        )}
        onClick={() => onSelect(data)}
      >
        {data}
      </li>
    ))}
  </ul>
);

export default List;
