const SearchBar = () => {
  return (
    <div className="flex-grow w-full lg:max-w-md xl:max-w-xl mx-0 lg:mx-7 my-4 lg:my-0 order-1 lg:order-none ">
      <input
        type="text"
        name="search"
        placeholder="Поиск..."
        className="py-2 px-4 outline-none shadow border-0 text-lg rounded w-full"
      />
    </div>
  );
};

export default SearchBar;
