import React from "react";
import { useState } from "react";

export default function ServerSearch() {
  const [query, setQuery] = useState("");
  let [searchResults, setSearchResults] = useState([]);
  searchResults = Object.values(searchResults);

  const handleSearch = async () => {
    try {
      const res = await fetch(`api/servers/search?query=${query}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.log("Error server not found", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search servers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((server) => (
          <li key={server.id}>{server.name}</li>
        ))}
      </ul>
    </div>
  );
}
