const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-4/6">
      <form>
        <input
          placeholder="Search..."
          onChange={onSearch}
          className="rounded-full px-5 py-2 bg-transparent border-2 w-full border-[#C6D48D]"
        />
      </form>
    </div>
  );
};

export default SearchBar;
