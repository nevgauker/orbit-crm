
type SearchBarProps = {
    search: string
    setSearch: (value: string) => void
    handleSearch: () => void
    handleClear: () => void
    placeholder?: string
};

export function SearchBar({ search, handleSearch, setSearch, handleClear, placeholder = "Search..." }: SearchBarProps) {
    return (
        <div className="mb-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="border px-4 py-2 w-full mb-2"
            />
            <div className="flex gap-2">
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
                <button
                    onClick={handleClear}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                    Clear
                </button>
            </div>
        </div>

    );
};

