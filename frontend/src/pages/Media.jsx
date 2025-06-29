"use client"

import { useState, useEffect, useRef } from "react"

// MediaCard component with audio player
const MediaCard = ({ title, author, type, description, mood, previewLink, thumbnail, previewUrl, rating, releaseDate }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef(null)

  const getTypeIcon = () => {
    switch (type) {
      case 'book': return '📚'
      case 'movie': return '🎬'
      case 'music': return '🎵'
      default: return '🌟'
    }
  }

  const getMoodColor = () => {
    switch (mood.toLowerCase()) {
      case 'inspiring': return 'bg-yellow-100 text-yellow-800'
      case 'uplifting': return 'bg-green-100 text-green-800'
      case 'calming': return 'bg-blue-100 text-blue-800'
      case 'motivating': return 'bg-purple-100 text-purple-800'
      case 'peaceful': return 'bg-indigo-100 text-indigo-800'
      case 'wellness': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const togglePlay = async () => {
    if (!audioRef.current || !previewUrl) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleSeek = (e) => {
    if (!audioRef.current) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const newTime = (x / width) * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {thumbnail && (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          {type === 'music' && previewUrl && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">{getTypeIcon()}</span>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodColor()}`}>
              {mood}
            </span>
            {rating && type === 'movie' && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                ⭐ {rating}
              </span>
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-green-600 font-medium mb-3">
          {author}
          {releaseDate && type === 'movie' && (
            <span className="text-gray-500 text-sm ml-2">({new Date(releaseDate).getFullYear()})</span>
          )}
        </p>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Audio Player for Music */}
        {type === 'music' && previewUrl && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <audio
              ref={audioRef}
              src={previewUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              preload="metadata"
            />
            
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              <div className="flex-1">
                <div 
                  className="h-2 bg-gray-200 rounded-full cursor-pointer"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-100"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 min-w-[70px] text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        )}
        
        {previewLink && (
          <a 
            href={previewLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
          >
            {type === 'book' ? 'Preview Book' : type === 'music' ? 'View on Platform' : 'View Movie'}
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [books, setBooks] = useState([])
  const [songs, setSongs] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchStatus, setFetchStatus] = useState({ books: 'idle', songs: 'idle', movies: 'idle' })

  // Fetch books, songs, and movies from Flask APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setFetchStatus({ books: 'loading', songs: 'loading', movies: 'loading' })
      
      // Initialize with empty arrays
      let booksData = []
      let songsData = []
      let moviesData = []
      
      try {
        console.log('Starting to fetch data...')
        
        // Try to fetch books
        try {
          console.log('Fetching books from http://localhost:5000/books')
          const booksResponse = await fetch('http://localhost:5000/books', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          console.log('Books response status:', booksResponse.status)
          
          if (booksResponse.ok) {
            const rawBooksData = await booksResponse.json()
            console.log('Books data received:', rawBooksData.length, 'books')
            
            // Transform books data
            booksData = rawBooksData.map((book, index) => ({
              id: `book-${index}`,
              title: book.title || 'Unknown Title',
              author: book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'Unknown Author',
              type: "book",
              description: book.description ? 
                book.description.length > 150 ? 
                  book.description.substring(0, 150) + '...' : 
                  book.description : 
                'No description available.',
              mood: book.categories && book.categories.length > 0 ? 
                book.categories[0] : 
                'Wellness',
              previewLink: book.previewLink,
              thumbnail: book.thumbnail
            }))
            setFetchStatus(prev => ({ ...prev, books: 'success' }))
          } else {
            console.error('Books fetch failed:', booksResponse.status, booksResponse.statusText)
            setFetchStatus(prev => ({ ...prev, books: 'error' }))
          }
        } catch (bookError) {
          console.error('Books fetch error:', bookError)
          setFetchStatus(prev => ({ ...prev, books: 'error' }))
        }
        
        // Try to fetch songs with multiple fallback queries
        const songQueries = ['calm', 'relaxing', 'peaceful', 'meditation']
        let songsFetched = false
        
        for (const query of songQueries) {
          if (songsFetched) break
          
          try {
            console.log(`Fetching songs with query: ${query}`)
            const songsResponse = await fetch(`http://localhost:5000/songs?q=${query}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            console.log('Songs response status:', songsResponse.status)
            
            if (songsResponse.ok) {
              const rawSongsData = await songsResponse.json()
              console.log('Songs data received:', rawSongsData.length, 'songs')
              
              if (rawSongsData.length > 0) {
                // Transform songs data
                songsData = rawSongsData.map((song, index) => ({
                  id: `song-${index}`,
                  title: song.trackName || 'Unknown Track',
                  author: song.artistName || 'Unknown Artist',
                  type: "music",
                  description: `A calming track by ${song.artistName || 'Unknown Artist'} perfect for relaxation and mindfulness.`,
                  mood: "Calming",
                  previewLink: `https://www.deezer.com/search/${encodeURIComponent(song.trackName + ' ' + song.artistName)}`,
                  thumbnail: song.artwork,
                  previewUrl: song.previewUrl
                }))
                setFetchStatus(prev => ({ ...prev, songs: 'success' }))
                songsFetched = true
              }
            }
          } catch (songError) {
            console.error(`Songs fetch error for query ${query}:`, songError)
          }
        }
        
        if (!songsFetched) {
          console.warn('All song queries failed, continuing without songs')
          setFetchStatus(prev => ({ ...prev, songs: 'error' }))
        }

        // Try to fetch movies with multiple fallback queries
        const movieQueries = ['calm', 'mindfulness', 'wellness', 'peaceful', 'inspiration']
        let moviesFetched = false
        
        for (const query of movieQueries) {
          if (moviesFetched) break
          
          try {
            console.log(`Fetching movies with query: ${query}`)
            const moviesResponse = await fetch(`http://localhost:5000/movies?q=${query}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            console.log('Movies response status:', moviesResponse.status)
            
            if (moviesResponse.ok) {
              const rawMoviesData = await moviesResponse.json()
              console.log('Movies data received:', rawMoviesData.length, 'movies')
              
              if (rawMoviesData.length > 0) {
                // Transform movies data
                moviesData = rawMoviesData.map((movie, index) => ({
                  id: `movie-${index}`,
                  title: movie.title || 'Unknown Movie',
                  author: `Released ${movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}`,
                  type: "movie",
                  description: movie.overview || 'No description available.',
                  mood: "Inspiring",
                  previewLink: `https://www.themoviedb.org/movie/${movie.id || ''}`,
                  thumbnail: movie.poster || '',
                  rating: movie.rating !== 'N/A' ? movie.rating : null,
                  releaseDate: movie.release_date
                }))
                setFetchStatus(prev => ({ ...prev, movies: 'success' }))
                moviesFetched = true
              }
            }
          } catch (movieError) {
            console.error(`Movies fetch error for query ${query}:`, movieError)
          }
        }
        
        if (!moviesFetched) {
          console.warn('All movie queries failed, continuing without movies')
          setFetchStatus(prev => ({ ...prev, movies: 'error' }))
        }
        
        setBooks(booksData)
        setSongs(songsData)
        setMovies(moviesData)
        console.log('Data fetch completed - Books:', booksData.length, 'Songs:', songsData.length, 'Movies:', moviesData.length)
        
      } catch (err) {
        console.error('General fetch error:', err)
        setError(`${err.message}. Make sure your Flask server is running on http://localhost:5000`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Combine all media items
  const allMediaItems = [...books, ...songs, ...movies]
  
  const filteredItems = activeFilter === "all" ? allMediaItems : allMediaItems.filter((item) => item.type === activeFilter)

  const filters = [
    { key: "all", label: "All", icon: "🌟" },
    { key: "book", label: "Books", icon: "📚" },
    { key: "movie", label: "Movies", icon: "🎬" },
    { key: "music", label: "Music", icon: "🎵" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Curated for Your <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Well-being</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover books, movies, and music carefully selected by mental health professionals to inspire, comfort, and
            uplift your spirit on your wellness journey.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex flex-wrap gap-1">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <span className="mr-2">{filter.icon}</span>
                  <span className="hidden sm:inline">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading content...</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Books: {fetchStatus.books}</p>
              <p>Songs: {fetchStatus.songs}</p>
              <p>Movies: {fetchStatus.movies}</p>
            </div>
          </div>
        )}

        {/* Retry Button */}
        {!loading && (fetchStatus.books === 'error' || fetchStatus.songs === 'error' || fetchStatus.movies === 'error') && (
          <div className="text-center mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-800 text-sm mb-2">
                {fetchStatus.books === 'error' && 'Books failed to load. '}
                {fetchStatus.songs === 'error' && 'Songs failed to load. '}
                {fetchStatus.movies === 'error' && 'Movies failed to load. '}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
              >
                Retry Loading
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-red-700 mb-2">Error Loading Content</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Media Grid */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MediaCard
                key={item.id}
                title={item.title}
                author={item.author}
                type={item.type}
                description={item.description}
                mood={item.mood}
                previewLink={item.previewLink}
                thumbnail={item.thumbnail}
                previewUrl={item.previewUrl}
                rating={item.rating}
                releaseDate={item.releaseDate}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your filter to see more content.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Media