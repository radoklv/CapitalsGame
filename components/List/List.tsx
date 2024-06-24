"use client";

import React from "react";

type ListProps = { data: string[] };

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <div>
      {data.map((data) => (
        <span>{data}</span>
      ))}
    </div>
  );
};

export default List;
