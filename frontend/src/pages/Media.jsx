"use client"

import { useState } from "react"
import MediaCard from "../components/MediaCard"

const Media = () => {
  const [activeFilter, setActiveFilter] = useState("all")

  const mediaItems = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      type: "book",
      description: "A inspiring tale about following your dreams and finding your personal legend in life's journey.",
      mood: "Inspiring",
    },
    {
      id: 2,
      title: "Inside Out",
      author: "Pixar Animation",
      type: "movie",
      description: "A beautiful exploration of emotions and mental health through a child's perspective and growth.",
      mood: "Uplifting",
    },
    {
      id: 3,
      title: "Weightless",
      author: "Marconi Union",
      type: "music",
      description: "Scientifically designed ambient music to reduce anxiety and promote deep relaxation.",
      mood: "Calming",
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      type: "book",
      description: "Learn how small, consistent changes can create remarkable results in your mental well-being.",
      mood: "Motivating",
    },
    {
      id: 5,
      title: "Soul",
      author: "Pixar Animation",
      type: "movie",
      description: "A profound journey about finding purpose, passion, and meaning in everyday life.",
      mood: "Inspiring",
    },
    {
      id: 6,
      title: "Clair de Lune",
      author: "Claude Debussy",
      type: "music",
      description: "A peaceful classical masterpiece perfect for meditation, reflection, and inner calm.",
      mood: "Peaceful",
    },
  ]

  const filteredItems = activeFilter === "all" ? mediaItems : mediaItems.filter((item) => item.type === activeFilter)

  const filters = [
    { key: "all", label: "All", icon: "🌟" },
    { key: "book", label: "Books", icon: "📚" },
    { key: "movie", label: "Movies", icon: "🎬" },
    { key: "music", label: "Music", icon: "🎵" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      <div className="container section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Curated for Your <span className="gradient-text">Well-being</span>
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

        {/* Media Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title}
              author={item.author}
              type={item.type}
              description={item.description}
              mood={item.mood}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
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
