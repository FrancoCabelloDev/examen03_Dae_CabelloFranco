import { Link, useLocation } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

function Header() {
  const location = useLocation()
  const [favorites] = useLocalStorage('dbz-favorites', [])
  
  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-white font-bold' 
      : 'text-gray-200 hover:text-white'
  }

  return (
    <header className="bg-black/20 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-4xl">🐉</span>
            <span className="text-2xl font-bold text-white">
              Dragon Ball
            </span>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/" className={`${isActive('/')} transition-colors`}>
              🏠 Home
            </Link>

            <Link to="/favorites" className={`${isActive('/favorites')} transition-colors`}>
              ❤️ Favoritos ({favorites.length})
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header