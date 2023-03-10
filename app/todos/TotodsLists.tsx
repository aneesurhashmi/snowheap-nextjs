import Link from "next/link";
import React from "react";
import { Todo } from "../../typings";

const fetachTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos: Todo[] = await res.json();
//   console.log(todos);

  return todos;
};

export default async function TodosList() {
  const todos = await fetachTodos();

  return (
    <>
      {todos.map((todo) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </>
  );
}

//  TodosList;
