// import { Link } from "react-router-dom"

// const Home = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="section-padding">
//         <div className="container">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Welcome to <span className="gradient-text">MindBloom</span>
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
//               Your personal sanctuary for mental wellness. Connect with our AI companion, discover inspiring content,
//               and nurture your mental health journey with compassionate support.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link to="/chat" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
//                 Start Chatting
//                 <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//               </Link>
//               <Link to="/media" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
//                 Explore Content
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="section-padding bg-white/60">
//         <div className="container">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How MindBloom Supports You</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Comprehensive tools designed to support your mental wellness journey
//             </p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <FeatureCard
//               icon="💬"
//               title="AI Companion"
//               description="Chat with our empathetic AI that listens without judgment and provides gentle guidance tailored to your needs."
//               color="from-green-500 to-green-600"
//             />
//             <FeatureCard
//               icon="📚"
//               title="Curated Content"
//               description="Discover books, movies, and music carefully selected by mental health professionals to inspire and uplift."
//               color="from-blue-500 to-blue-600"
//             />
//             <FeatureCard
//               icon="📊"
//               title="Mood Tracking"
//               description="Monitor your emotional journey with intuitive tools and celebrate your progress with personalized insights."
//               color="from-orange-500 to-orange-600"
//             />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="section-padding">
//         <div className="container">
//           <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-white">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
//             <p className="text-lg sm:text-xl mb-8 opacity-90">
//               Join thousands who have found support and growth with MindBloom
//             </p>
//             <Link
//               to="/signup"
//               className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               Get Started Free
//               <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// const FeatureCard = ({ icon, title, description, color }) => (
//   <div className="bg-white rounded-2xl p-8 card-shadow hover:-translate-y-2 group">
//     <div
//       className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
//     >
//       {icon}
//     </div>
//     <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{title}</h3>
//     <p className="text-gray-600 text-center leading-relaxed">{description}</p>
//   </div>
// )

// export default Home


////**********************After login redirect to home */
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase" // Adjust path as needed

const Home = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Get first name from display name or email
  const getFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'Friend'
  }

  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {user ? (
              // Personalized welcome for logged-in users
              <>
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {getTimeGreeting()}, <span className="gradient-text">{getFirstName()}!</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                    Welcome back to your wellness sanctuary. How are you feeling today? 
                    Let's continue your journey toward better mental health together.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center mb-4">
                      <span className="text-3xl">🌱</span>
                    </div>
                    <p className="text-green-800 font-medium">
                      "Every day is a new opportunity to nurture your mind and soul. 
                      Take a moment to appreciate how far you've come."
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/chat" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                    Continue Chatting
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </Link>
                  <Link to="/media" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                    Explore Content
                  </Link>
                  <Link to="/mood-tracker" className="btn-outline text-lg px-8 py-4 w-full sm:w-auto">
                    Track Mood
                  </Link>
                </div>
              </>
            ) : (
              // Original welcome for non-logged-in users
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Welcome to <span className="gradient-text">MindBloom</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Your personal sanctuary for mental wellness. Connect with our AI companion, discover inspiring content,
                  and nurture your mental health journey with compassionate support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                    Get Started Free
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link to="/login" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                    Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions for Logged-in Users */}
      {user && (
        <section className="section-padding bg-gradient-to-r from-green-50/50 to-blue-50/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">What would you like to do today?</h2>
              <p className="text-gray-600">Choose an activity that feels right for you</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <QuickActionCard
                icon="💭"
                title="Share Your Thoughts"
                description="Talk to our AI companion"
                link="/chat"
                color="from-green-400 to-green-500"
              />
              <QuickActionCard
                icon="📈"
                title="Check Your Progress"
                description="View your mood patterns"
                link="/mood-tracker"
                color="from-blue-400 to-blue-500"
              />
              <QuickActionCard
                icon="🎵"
                title="Find Inspiration"
                description="Discover uplifting content"
                link="/media"
                color="from-orange-400 to-orange-500"
              />
              <QuickActionCard
                icon="🧘"
                title="Practice Mindfulness"
                description="Guided meditation & exercises"
                link="/mindfulness"
                color="from-purple-400 to-purple-500"
              />
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="section-padding bg-white/60">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {user ? "Your Wellness Toolkit" : "How MindBloom Supports You"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {user 
                ? "Everything you need for your mental wellness journey, all in one place"
                : "Comprehensive tools designed to support your mental wellness journey"
              }
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="💬"
              title="AI Companion"
              description="Chat with our empathetic AI that listens without judgment and provides gentle guidance tailored to your needs."
              color="from-green-500 to-green-600"
            />
            <FeatureCard
              icon="📚"
              title="Curated Content"
              description="Discover books, movies, and music carefully selected by mental health professionals to inspire and uplift."
              color="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon="📊"
              title="Mood Tracking"
              description="Monitor your emotional journey with intuitive tools and celebrate your progress with personalized insights."
              color="from-orange-500 to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* CTA Section - Only show for non-logged-in users */}
      {!user && (
        <section className="section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
              <p className="text-lg sm:text-xl mb-8 opacity-90">
                Join thousands who have found support and growth with MindBloom
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Free
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="bg-white rounded-2xl p-8 card-shadow hover:-translate-y-2 group">
    <div
      className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{title}</h3>
    <p className="text-gray-600 text-center leading-relaxed">{description}</p>
  </div>
)

const QuickActionCard = ({ icon, title, description, link, color }) => (
  <Link
    to={link}
    className="bg-white rounded-2xl p-6 card-shadow hover:-translate-y-2 transition-all duration-300 group block"
  >
    <div
      className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center text-sm">{description}</p>
  </Link>
)

export default Home