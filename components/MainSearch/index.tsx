// components/MainSearch/index.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import SearchBox from "../SearchBox";

const MainSearch: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/page_list",
      query: { searchQuery: searchQuery }
    });
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MainSearch;
