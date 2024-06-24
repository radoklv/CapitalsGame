import React from "react";
import classes from "./List.module.scss";
import clsx from "clsx";
import type { ListProps } from "./List.types";

const List: React.FC<ListProps> = ({ data, selectedItem, onSelect }) => {
  return (
    <ul className={classes.list}>
      {data.map((data) => (
        <li
          className={clsx(
            classes.listItem,
            data === selectedItem && classes["listItem--selected"]
          )}
          onClick={() => onSelect(data)}
        >
          {data}
        </li>
      ))}
    </ul>
  );
};

export default List;
