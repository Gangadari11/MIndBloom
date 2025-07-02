"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const Counselors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")

  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Mindfulness", "Stress Management"],
      experience: "12 years",
      rating: 4.9,
      reviews: 156,
      availability: "Available Today",
      languages: ["English", "Mandarin"],
      sessionTypes: ["Video Call", "Phone", "In-Person"],
      price: "$120/session",
      image: "/placeholder.svg?height=200&width=200&text=Dr.+Sarah+Chen",
      bio: "Dr. Chen specializes in cognitive-behavioral therapy and mindfulness-based interventions. She has extensive experience helping clients manage anxiety and develop healthy coping strategies.",
      credentials: ["PhD in Clinical Psychology", "Licensed in CA, NY", "Certified Mindfulness Instructor"],
    },
    {
      id: 2,
      name: "Michael Rodriguez, LMFT",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationship Issues", "Family Therapy", "Communication", "Conflict Resolution"],
      experience: "8 years",
      rating: 4.8,
      reviews: 203,
      availability: "Available Tomorrow",
      languages: ["English", "Spanish"],
      sessionTypes: ["Video Call", "In-Person"],
      price: "$100/session",
      image: "/placeholder.svg?height=200&width=200&text=Michael+Rodriguez",
      bio: "Michael focuses on helping couples and families improve communication and resolve conflicts. He uses evidence-based approaches to strengthen relationships.",
      credentials: ["MA in Marriage & Family Therapy", "Licensed LMFT", "Gottman Method Certified"],
    },
    {
      id: 3,
      name: "Dr. Aisha Patel",
      title: "Psychiatrist & Meditation Teacher",
      specialties: ["Meditation", "ADHD", "Bipolar Disorder", "Holistic Mental Health"],
      experience: "15 years",
      rating: 4.9,
      reviews: 89,
      availability: "Available This Week",
      languages: ["English", "Hindi", "Gujarati"],
      sessionTypes: ["Video Call", "Phone"],
      price: "$150/session",
      image: "/placeholder.svg?height=200&width=200&text=Dr.+Aisha+Patel",
      bio: "Dr. Patel combines traditional psychiatry with mindfulness and meditation practices. She specializes in integrative approaches to mental health.",
      credentials: ["MD Psychiatry", "Board Certified", "500-Hour Yoga Teacher Training"],
    },
    {
      id: 4,
      name: "James Thompson, LCSW",
      title: "Licensed Clinical Social Worker",
      specialties: ["Trauma", "PTSD", "Addiction Recovery", "Men's Mental Health"],
      experience: "10 years",
      rating: 4.7,
      reviews: 134,
      availability: "Available Today",
      languages: ["English"],
      sessionTypes: ["Video Call", "Phone", "In-Person"],
      price: "$90/session",
      image: "/placeholder.svg?height=200&width=200&text=James+Thompson",
      bio: "James specializes in trauma-informed care and addiction recovery. He provides a safe, non-judgmental space for healing and growth.",
      credentials: ["MSW Clinical Social Work", "Licensed LCSW", "EMDR Certified"],
    },
    {
      id: 5,
      name: "Dr. Emily Foster",
      title: "Clinical Psychologist",
      specialties: ["Eating Disorders", "Body Image", "Self-Esteem", "Women's Issues"],
      experience: "9 years",
      rating: 4.8,
      reviews: 167,
      availability: "Available This Week",
      languages: ["English", "French"],
      sessionTypes: ["Video Call", "In-Person"],
      price: "$110/session",
      image: "/placeholder.svg?height=200&width=200&text=Dr.+Emily+Foster",
      bio: "Dr. Foster specializes in eating disorders and body image issues. She uses compassionate, evidence-based approaches to help clients develop a healthy relationship with themselves.",
      credentials: ["PhD Clinical Psychology", "Eating Disorder Specialist", "DBT Certified"],
    },
    {
      id: 6,
      name: "Dr. David Kim",
      title: "Neuropsychologist",
      specialties: ["ADHD", "Learning Disabilities", "Memory Issues", "Cognitive Assessment"],
      experience: "11 years",
      rating: 4.9,
      reviews: 92,
      availability: "Available Tomorrow",
      languages: ["English", "Korean"],
      sessionTypes: ["Video Call", "In-Person"],
      price: "$140/session",
      image: "/placeholder.svg?height=200&width=200&text=Dr.+David+Kim",
      bio: "Dr. Kim specializes in neuropsychological assessment and treatment. He helps clients understand and work with their unique cognitive profiles.",
      credentials: ["PhD Neuropsychology", "Board Certified", "ADHD Specialist"],
    },
  ]

  const specialties = ["all", "Anxiety", "Depression", "Mindfulness", "Trauma", "Relationships", "ADHD"]
  const availabilities = ["all", "Available Today", "Available Tomorrow", "Available This Week"]

  const filteredCounselors = counselors.filter((counselor) => {
    const specialtyMatch = selectedSpecialty === "all" || counselor.specialties.includes(selectedSpecialty)
    const availabilityMatch = selectedAvailability === "all" || counselor.availability === selectedAvailability
    return specialtyMatch && availabilityMatch
  })

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Available Today":
        return "bg-green-100 text-green-800"
      case "Available Tomorrow":
        return "bg-blue-100 text-blue-800"
      case "Available This Week":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            👨‍⚕️
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">Professional Counselors</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Connect with our certified mental health professionals for personalized support. All our counselors are
            licensed, experienced, and committed to helping you achieve better mental wellness.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === "all" ? "All Specialties" : specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Availability</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                {availabilities.map((availability) => (
                  <option key={availability} value={availability}>
                    {availability === "all" ? "All Availability" : availability}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Counselors Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredCounselors.map((counselor) => (
            <div
              key={counselor.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={counselor.image || "/placeholder.svg"}
                    alt={counselor.name}
                    className="w-20 h-20 rounded-full object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{counselor.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{counselor.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        {counselor.rating} ({counselor.reviews} reviews)
                      </span>
                      <span>{counselor.experience} experience</span>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(counselor.availability)}`}
                  >
                    {counselor.availability}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 mb-4 leading-relaxed">{counselor.bio}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {counselor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Session Types</h4>
                    <div className="space-y-1">
                      {counselor.sessionTypes.map((type, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="space-y-1">
                      {counselor.languages.map((language, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          {language}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Credentials</h4>
                  <div className="space-y-1">
                    {counselor.credentials.map((credential, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {credential}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{counselor.price}</div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      View Profile
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCounselors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No counselors found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Not Sure Which Counselor to Choose?</h3>
          <p className="text-lg mb-6 opacity-90">
            Our matching service can help you find the perfect counselor based on your specific needs and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Take Matching Quiz
            </button>
            <Link
              to="/chat"
              className="px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Chat with AI First
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counselors
