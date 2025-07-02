import { Link } from "react-router-dom"

const Practice = () => {
  const meditationTechniques = [
    {
      id: "box-breathing",
      name: "Box Breathing",
      description: "A simple 4-4-4-4 breathing pattern that helps reduce stress and anxiety instantly.",
      color: "from-green-400 to-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-300",
      icon: "🫁",
    },
    {
      id: "body-scan",
      name: "Body Scan",
      description: "Progressive relaxation technique that brings awareness to each part of your body.",
      color: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-300",
      icon: "🧘‍♀️",
    },
    {
      id: "loving-kindness",
      name: "Loving-Kindness",
      description: "Cultivate compassion and love for yourself and others through guided intentions.",
      color: "from-pink-400 to-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      hoverColor: "hover:border-pink-300",
      icon: "💝",
    },
    {
      id: "mindful-walking",
      name: "Mindful Walking",
      description: "Transform your daily walk into a moving meditation practice with present-moment awareness.",
      color: "from-emerald-400 to-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:border-emerald-300",
      icon: "🚶‍♂️",
    },
    {
      id: "gratitude-reflection",
      name: "Gratitude Reflection",
      description: "Focus on appreciation and thankfulness to shift your mindset toward positivity.",
      color: "from-amber-400 to-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      hoverColor: "hover:border-amber-300",
      icon: "🙏",
    },
    {
      id: "visualization-meditation",
      name: "Visualization Meditation",
      description: "Use guided imagery to create peaceful mental landscapes and promote deep relaxation.",
      color: "from-purple-400 to-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-300",
      icon: "🌅",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meditation{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Practice</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover powerful meditation techniques to reduce stress, increase mindfulness, and cultivate inner peace.
            Choose a practice that resonates with you today.
          </p>
        </div>

        {/* Meditation Techniques Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {meditationTechniques.map((technique) => (
            <div
              key={technique.id}
              className={`${technique.bgColor} rounded-2xl border-2 ${technique.borderColor} ${technique.hoverColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group overflow-hidden`}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${technique.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {technique.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Meditation</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {technique.name}
                </h3>

                <p className="text-gray-700 leading-relaxed text-sm mb-6">{technique.description}</p>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <Link
                  to={`/practice/${technique.id}`}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${technique.color} text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group-hover:shadow-xl`}
                >
                  <span>Learn More</span>
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-white max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Your Journey Today</h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              Regular meditation practice can transform your mental well-being. Begin with just 5 minutes a day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chat"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="mr-2">💬</span>
                Get Personalized Guidance
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <span className="mr-2">📊</span>
                Track Your Progress
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🧠", title: "Mental Clarity", desc: "Improve focus and decision-making" },
            { icon: "❤️", title: "Emotional Balance", desc: "Manage stress and anxiety better" },
            { icon: "😴", title: "Better Sleep", desc: "Fall asleep faster and sleep deeper" },
            { icon: "🌱", title: "Personal Growth", desc: "Develop self-awareness and compassion" },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Practice
