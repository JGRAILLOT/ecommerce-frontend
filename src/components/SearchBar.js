import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Append only non-empty and trimmed parameters
    if (name.trim()) params.append("name", name.trim());
    if (category.trim()) params.append("category", category.trim());
    if (minPrice.trim()) params.append("minPrice", minPrice.trim());
    if (maxPrice.trim()) params.append("maxPrice", maxPrice.trim());

    // Construct the query string
    const queryString = params.toString();

    // Navigate to the search page with the query string, only if it's not empty
    if (queryString) {
      navigate(`/search?${queryString}`, { replace: true });
    } else {
      navigate("/search", { replace: true }); // or handle empty search differently
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
