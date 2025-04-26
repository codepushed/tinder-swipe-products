import React, { useState, useMemo } from "react";
import ExploreGrid from "../components/ExploreGrid";
import { demoProducts } from "../data";

const Explore = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(
    () =>
      demoProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  
  const TOP_NAV_HEIGHT = 72; 

  return (
    <div className="min-h-screen w-full bg-[#18191A] flex flex-col">
      <div
        className="w-full sticky z-20 bg-[#18191A]"
        style={{ top: TOP_NAV_HEIGHT, marginBottom: 0 }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-none bg-[#232323] text-white placeholder-gray-400 border-b border-[#232323] focus:outline-none focus:border-[#FF444F] transition text-lg px-4 py-3"
          style={{ borderRadius: 0 }}
        />
      </div>
      <ExploreGrid products={filteredProducts} />
    </div>
  );
};

export default Explore;
