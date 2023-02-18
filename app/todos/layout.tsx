import React, { Children } from "react";
import TodosList from "./TotodsLists";
// import TodoPage from "./[todoId]/page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div>
        {/* @ts-ignore */}
        <TodosList />
      </div>
      {/* @ts-ignore */}
      {/* <TodoPage /> */}
      <div className="flex-1">{children} </div>
    </div>
  );
}
