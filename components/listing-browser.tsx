"use client";

import { useId, useState } from "react";
import { ArrowUpRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { Listing } from "@/lib/listings";

export function ListingBrowser({
  records,
  kind,
}: {
  records: Listing[];
  kind: "projects" | "careers";
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [sort, setSort] = useState("default");
  const careers = kind === "careers";
  const categoryLabel = careers ? "Discipline" : "Sector";
  const areaLabel = careers ? "Work area" : "Location";
  const categories = [...new Set(records.map((record) => record.category))];
  const areas = [...new Set(records.map((record) => record.area))];
  const search = query.trim().toLocaleLowerCase();
  const filtered = records.filter(
    (record) =>
      (!category || record.category === category) &&
      (!area || record.area === area) &&
      `${record.title} ${record.category} ${record.area} ${record.copy} ${record.detail}`
        .toLocaleLowerCase()
        .includes(search),
  );
  if (sort !== "default")
    filtered.sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );
  const reset = () => {
    setQuery("");
    setCategory("");
    setArea("");
    setSort("default");
  };

  return (
    <section className="listing-section" aria-labelledby={`${id}-title`}>
      <div className="section-head technical-rule">
        <div>
          <div className="eyebrow">
            {careers ? "FIND YOUR DISCIPLINE" : "PROJECT REGISTER"}
          </div>
          <h2 id={`${id}-title`}>
            {careers ? "Where you could contribute." : "Explore the work."}
          </h2>
        </div>
      </div>
      <form
        className="listing-filters"
        role="search"
        aria-label={careers ? "Career interests" : "Projects"}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="filter-field filter-search">
          <label htmlFor={`${id}-search`}>
            Search {careers ? "career interests" : "projects"}
          </label>
          <div className="search-input">
            <MagnifyingGlassIcon size={18} aria-hidden="true" />
            <input
              id={`${id}-search`}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                careers ? "Skills or discipline" : "Project, client or location"
              }
            />
          </div>
        </div>
        <div className="filter-field">
          <label htmlFor={`${id}-category`}>{categoryLabel}</label>
          <select
            id={`${id}-category`}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All {careers ? "disciplines" : "sectors"}</option>
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor={`${id}-area`}>{areaLabel}</label>
          <select
            id={`${id}-area`}
            value={area}
            onChange={(event) => setArea(event.target.value)}
          >
            <option value="">All {careers ? "work areas" : "locations"}</option>
            {areas.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor={`${id}-sort`}>Sort by</label>
          <select
            id={`${id}-sort`}
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">
              {careers ? "Discipline order" : "Register order"}
            </option>
            <option value="az">Name: A to Z</option>
            <option value="za">Name: Z to A</option>
          </select>
        </div>
      </form>
      <div className="listing-status">
        <p role="status" aria-live="polite" aria-atomic="true">
          {filtered.length} of {records.length}{" "}
          {careers ? "career interests" : "projects"}
        </p>
        <button
          type="button"
          className="filter-reset"
          onClick={reset}
          disabled={!query && !category && !area && sort === "default"}
        >
          Reset filters
        </button>
      </div>
      <div className="listing-grid">
        {filtered.map((record) => (
          <article className="listing-card" key={record.id}>
            <div className="eyebrow">
              {record.category} / {record.area}
            </div>
            <h3>{record.title}</h3>
            <p>{record.copy}</p>
            <div className="listing-detail">{record.detail}</div>
            <a
              className="text-link"
              href={`mailto:dksbuilders@gmail.com?subject=${encodeURIComponent(`${careers ? "Career expression of interest" : "Project enquiry"}: ${record.title}`)}`}
            >
              {careers ? "Introduce yourself" : "Discuss similar work"}
              <ArrowUpRightIcon size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="listing-empty">
          <h3>No matching {careers ? "career interests" : "projects"}.</h3>
          <p>Try another search or reset the filters to see all entries.</p>
          <button type="button" className="button" onClick={reset}>
            Show all {careers ? "career interests" : "projects"}
          </button>
        </div>
      )}
    </section>
  );
}
