import { useState, useEffect } from 'react'
import useDebounce from '../hooks/useDebounce'

function SearchBar({ onSearch, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className="max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar guerreros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-dbz-orange focus:border-dbz-orange"
          disabled={isLoading}
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
          >
            ❌
          </button>
        )}
      </div>
      
      {debouncedSearchTerm && (
        <div className="text-center mt-2">
          <span className="text-white bg-black/20 px-3 py-1 rounded-full text-sm">
            Buscando: "{debouncedSearchTerm}"
          </span>
        </div>
      )}
    </div>
  )
}

export default SearchBar