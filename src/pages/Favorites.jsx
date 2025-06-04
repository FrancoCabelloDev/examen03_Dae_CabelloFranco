import { useState } from 'react'
import { Link } from 'react-router-dom'
import CharacterCard from '../components/CharacterCard'
import useLocalStorage from '../hooks/useLocalStorage'
import { notifySuccess } from '../utils/notifications'

function Favorites() {
  const [favorites, setFavorites] = useLocalStorage('dbz-favorites', [])
  const [sortBy, setSortBy] = useState('added')

  const clearAllFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      setFavorites([])
      notifySuccess('Favoritos eliminados')
    }
  }

  const getSortedFavorites = () => {
    const sorted = [...favorites]
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'race':
        return sorted.sort((a, b) => (a.race || '').localeCompare(b.race || ''))
      case 'added':
      default:
        return sorted.reverse()
    }
  }

  const sortedFavorites = getSortedFavorites()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          ❤️ Mis Favoritos
        </h1>
        <p className="text-xl text-white/90">
          Tu equipo de guerreros favoritos
        </p>
      </div>

      {favorites.length === 0 ? (
        /* Estado vacío */
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            No tienes favoritos aún
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Explora los guerreros y agrega tus favoritos haciendo clic en el corazón
          </p>
          <Link 
            to="/warriors"
            className="bg-dbz-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            👊 Explorar Guerreros
          </Link>
        </div>
      ) : (
        <>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <span className="text-white font-semibold">
                {favorites.length} favoritos
              </span>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded border border-gray-300 text-gray-800"
              >
                <option value="added">Agregado recientemente</option>
                <option value="name">Nombre (A-Z)</option>
                <option value="race">Raza</option>
              </select>
            </div>
            
            <button
              onClick={clearAllFavorites}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              🗑️ Limpiar Todo
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFavorites.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Quieres más guerreros?
              </h3>
              <p className="text-white/80 mb-4">
                Descubre más personajes increíbles
              </p>
              <Link 
                to="/warriors"
                className="bg-dbz-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🔍 Explorar Más
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Favorites