import { Todo } from "../../../typings";
import React from "react";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    todoId: string;
  };
};

// toggle ability to try to server-side render a page (that is not cached, and then to cache it)
export const dynamicParams = true; // default tru

const fetchTodo = async (todoId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    // @ts-ignore
    { cache: "force-cache" } // equilent to static-side generation
    // {
    //   next: {
    //     // re-validate pages after certain time
    //     // this will delete the cache after the revalidate time and get the new one
    //     revalidate: 60, // seconds
    //   },
    // }
  );
  const todo: Todo = await res.json();
  return todo;
};

export default async function TodoPage({ params: { todoId } }: PageProps) {
  const todo = await fetchTodo(todoId);
  //   let todo = props.params.todoId;
  //   console.log(`Props: ${todo}`);

  //   to avoid un-expected behaviour in ssr of the unavailable pages
  if (!todo.id) return notFound();

  return (
    <div className="p-10 bg-green-300 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Complete: {todo.completed ? "Yes" : "No"}</p>
      <p className="border-t border-black mt-5 text-right">
        By User: {todo.userId}
      </p>
    </div>
  );
}

// To chace

export async function generateStaticParams() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/`
    // {
    //   // @ts-ignore
    //   caches: "force-cache",
    // }
  );
  const todos: Todo[] = await res.json();

  const trimedTodos = todos.splice(0, 30);

  //   we have to return [{todoId: "1"}. {todoId: "2"}, ...]
  // this will create a cached static and will serve it without server-side-rendering
  // this is faster and good
  return trimedTodos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
