import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CharacterCard from '../components/CharacterCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { DragonBallAPI } from '../services/dragonballAPI'
import { notifyError, notifyRandomGeneration } from '../utils/notifications'
import useLocalStorage from '../hooks/useLocalStorage'

function Home() {
  const [randomCharacters, setRandomCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites] = useLocalStorage('dbz-favorites', [])

  useEffect(() => {
    loadRandomCharacters()
  }, [])

  const loadRandomCharacters = async () => {
    setIsLoading(true)
    try {
      const result = await DragonBallAPI.getRandomCharacters(8)
      if (result.success) {
        setRandomCharacters(result.characters)
      } else {
        notifyError('Error cargando personajes')
      }
    } catch (error) {
      notifyError('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  const generateNewCharacters = async () => {
    notifyRandomGeneration()
    await loadRandomCharacters()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4">
          🐉 Dragon Ball Explorer
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Descubre a todos los guerreros del universo Dragon Ball
        </p>
        
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-md mx-auto mb-8">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">70+</div>
            <div className="text-white/80">Guerreros</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{favorites.length}</div>
            <div className="text-white/80">Favoritos</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 md:col-span-1 col-span-2">
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="text-white/80">Poder</div>
          </div>
        </div>
        
        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/warriors"
            className="bg-dbz-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            👊 Explorar Guerreros
          </Link>
          <Link 
            to="/favorites"
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ❤️ Mis Favoritos ({favorites.length})
          </Link>
        </div>
      </div>
      
      {/* Personajes aleatorios */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            🎲 Guerreros Aleatorios
          </h2>
          <p className="text-white/80">
            Descubre nuevos personajes cada vez
          </p>
        </div>
        
        {isLoading ? (
          <LoadingSkeleton count={8} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {randomCharacters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            
            <div className="text-center mt-6">
              <button 
                onClick={generateNewCharacters}
                className="bg-dbz-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🔄 Generar Nuevos
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Favoritos */}
      {favorites.length > 0 && (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              ❤️ Tus Favoritos
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.slice(0, 4).map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          
          {favorites.length > 4 && (
            <div className="text-center mt-6">
              <Link 
                to="/favorites"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ver todos ({favorites.length})
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home