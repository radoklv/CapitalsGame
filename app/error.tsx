"use client";
import React from "react";

const errorPage = (props: any) => {
  return <div>{props.error.message}</div>;
};

export default errorPage;
