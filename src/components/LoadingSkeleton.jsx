import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function CharacterCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Skeleton height={192} />
      <div className="p-4">
        <Skeleton height={24} className="mb-2" />
        <Skeleton count={3} height={16} className="mb-1" />
        <Skeleton height={40} className="mt-3" />
      </div>
    </div>
  )
}

function LoadingSkeleton({ count = 8 }) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <CharacterCardSkeleton key={index} />
        ))}
      </div>
      
      <div className="text-center mt-6">
        <span className="text-white bg-black/20 px-4 py-2 rounded-full">
          🐉 Cargando guerreros...
        </span>
      </div>
    </SkeletonTheme>
  )
}

export default LoadingSkeleton