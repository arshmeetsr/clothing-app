import React from "react";

import "./Filter.css";
import ColorFilter from "./ColorFilter";
import MonthFilter from "./MonthFilter";

export default function Filter() {
  return (
    <div>
      <h4>Filters</h4>

      <div className="filters-container">
        <div className="filter">
          <ColorFilter />
        </div>

        <div>
          <MonthFilter />
        </div>
      </div>
    </div>
  );
}
