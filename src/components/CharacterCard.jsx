import useLocalStorage from '../hooks/useLocalStorage'
import { notifyCharacterAdded, notifyCharacterRemoved } from '../utils/notifications'

function CharacterCard({ character }) {
  const [favorites, setFavorites] = useLocalStorage('dbz-favorites', [])
  const isFavorite = favorites.some(fav => fav.id === character.id)

  const toggleFavorite = () => {
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== character.id)
      setFavorites(newFavorites)
      notifyCharacterRemoved(character.name)
    } else {
      const newFavorites = [...favorites, character]
      setFavorites(newFavorites)
      notifyCharacterAdded(character.name)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Imagen */}
      <div className="relative">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
          } transition-colors`}
        >
          ❤️
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {character.name}
        </h3>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p><strong>Raza:</strong> {character.race || 'Desconocido'}</p>
          <p><strong>Ki:</strong> {character.ki || 'Desconocido'}</p>
          <p><strong>Género:</strong> {character.gender || 'Desconocido'}</p>
        </div>

        <button 
          className="w-full mt-3 bg-dbz-orange hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors"
          onClick={() => console.log('Ver detalles:', character.name)}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  )
}

export default CharacterCard