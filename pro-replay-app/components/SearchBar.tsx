import React, { useState } from "react";

const SearchBar = ({
  onSearch,
}: {
  onSearch: (summoner: string, region: string) => void;
}) => {
  const [summoner, setSummoner] = useState("");
  const [region, setRegion] = useState("na1"); // default region

  const handleSearch = () => {
    onSearch(summoner, region);
  };

  return (
    <div className="flex mt-4 items-center">
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mr-2 text-black"
      >
        <option value="na1">NA1</option>
        <option value="euw1">EUW1</option>
        <option value="eun1">EUN1</option>
        <option value="kr">KR</option>
        <option value="jp1">JP1</option>
        <option value="br1">BR1</option>
        <option value="la1">LA1</option>
        <option value="la2">LA2</option>
        <option value="oc1">OC1</option>
        <option value="tr1">TR1</option>
        <option value="ru">RU</option>
      </select>
      <input
        type="text"
        placeholder="Search Summoner"
        value={summoner}
        onChange={(e) => setSummoner(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-black"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white p-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
