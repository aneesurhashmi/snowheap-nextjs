"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Reading() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  const availableLanguages = ['arabic', 'english']

  return (
    <form onSubmit={handleSearch}>
        <select>
            <option ></option>
        </select>
      {/* <input
        type={"text"}
        value={search}
        placeholder="Search something"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-2 rounded-lg"
      >
        Search
      </button> */}
    </form>
  );
}
