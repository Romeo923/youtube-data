"use client";

import Link from "next/link";

const Search = ({ query, setQuery }: any) => {
  return (
    <>
      <div className="max-w-sm mx-auto p-1 pr-0 flex items-center">
        <input
          className="flex-1 appearance-none rounded shadow p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
    </>
  );
};

export default Search;
