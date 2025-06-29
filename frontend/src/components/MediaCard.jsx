const MediaCard = ({ title, author, type, description, mood }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "book":
        return "from-green-500 to-green-600"
      case "movie":
        return "from-blue-500 to-blue-600"
      case "music":
        return "from-orange-500 to-orange-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "book":
        return "📚"
      case "movie":
        return "🎬"
      case "music":
        return "🎵"
      default:
        return "📄"
    }
  }

  const getMoodColor = (mood) => {
    switch (mood.toLowerCase()) {
      case "inspiring":
        return "bg-yellow-100 text-yellow-800"
      case "uplifting":
        return "bg-green-100 text-green-800"
      case "calming":
        return "bg-blue-100 text-blue-800"
      case "motivating":
        return "bg-purple-100 text-purple-800"
      case "peaceful":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-2xl card-shadow hover:-translate-y-2 overflow-hidden group">
      {/* Image/Icon Section */}
      <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50"></div>
        <div
          className={`w-20 h-20 bg-gradient-to-r ${getTypeColor(type)} rounded-2xl flex items-center justify-center text-3xl shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}
        >
          {getTypeIcon(type)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 bg-gradient-to-r ${getTypeColor(type)} text-white text-xs font-semibold rounded-full uppercase tracking-wide`}
          >
            {type}
          </span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getMoodColor(mood)}`}>{mood}</span>
        </div>

        {/* Title and Author */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-600 mb-3">{author}</p>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{description}</p>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaCard
