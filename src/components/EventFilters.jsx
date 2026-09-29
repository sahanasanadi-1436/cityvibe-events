function EventFilters({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
  date,
  setDate,
  sort,
  setSort
}) {
  return (
    <div className="filters">

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Music">Music</option>
        <option value="Workshop">Workshop</option>
        <option value="Sports">Sports</option>
        <option value="Food">Food</option>
        <option value="Networking">Networking</option>
        <option value="Art">Art</option>
        <option value="Community">Community</option>
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Pune">Pune</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="priceLow">
          Price: Low to High
        </option>
        <option value="priceHigh">
          Price: High to Low
        </option>
        <option value="date">
          Date
        </option>
      </select>

    </div>
  );
}

export default EventFilters;