import React, { useState, useMemo, useRef, useEffect } from "react";
import ExploreGrid from "../components/ExploreGrid";
import { demoProducts } from "../data";

const Explore = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const filteredProducts = useMemo(
    () =>
      demoProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  const TOP_NAV_HEIGHT = 0;
  const SEARCH_BAR_HEIGHT = 56; 

  return (
    <div className="min-h-screen w-full bg-[#18191A] flex flex-col">
      <div
        className="w-full sticky z-30 bg-[#18191A]"
        style={{ top: TOP_NAV_HEIGHT, height: SEARCH_BAR_HEIGHT, minHeight: SEARCH_BAR_HEIGHT }}
      >
       <h1 className="text-white text-[30px] px-[5px] font-bold" style={{ fontFamily: 'DM Serif Display, serif', fontSize: "50px" }}>Discover</h1>
      </div>
      <div className="flex-1 mt-[50px] overflow-y-auto">
        <ExploreGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Explore;
