// "use client"

// import { useState } from "react"

// const Profile = () => {
//   const [currentMood, setCurrentMood] = useState("")

//   const moods = [
//     { emoji: "😊", label: "Happy", color: "from-yellow-400 to-orange-400" },
//     { emoji: "😌", label: "Calm", color: "from-green-400 to-blue-400" },
//     { emoji: "😔", label: "Sad", color: "from-blue-400 to-purple-400" },
//     { emoji: "😰", label: "Anxious", color: "from-red-400 to-pink-400" },
//     { emoji: "😴", label: "Tired", color: "from-gray-400 to-gray-500" },
//     { emoji: "🤔", label: "Thoughtful", color: "from-purple-400 to-indigo-400" },
//   ]

//   const savedItems = [
//     { id: 1, title: "The Alchemist", type: "book", mood: "Inspiring", author: "Paulo Coelho" },
//     { id: 2, title: "Weightless", type: "music", mood: "Calming", author: "Marconi Union" },
//     { id: 3, title: "Inside Out", type: "movie", mood: "Uplifting", author: "Pixar" },
//     { id: 4, title: "Atomic Habits", type: "book", mood: "Motivating", author: "James Clear" },
//   ]

//   const motivationalQuotes = [
//     "Every day is a new beginning. Take a deep breath and start again.",
//     "You are stronger than you think and more capable than you imagine.",
//     "Progress, not perfection. Every small step counts on your journey.",
//     "Your mental health is just as important as your physical health.",
//     "It's okay to not be okay. What matters is that you're trying.",
//     "Healing is not linear. Be patient and kind with yourself.",
//   ]

//   const todaysQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30">
//       <div className="container section-padding">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Your Wellness Dashboard</h1>
//           <p className="text-lg sm:text-xl text-gray-600">Track your journey and celebrate your progress</p>
//         </div>

//         {/* Main Grid */}
//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* Daily Quote - Large Card */}
//           <div className="lg:col-span-8">
//             <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white card-shadow h-full flex flex-col justify-center">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <span className="text-3xl">✨</span>
//                 </div>
//                 <h2 className="text-2xl sm:text-3xl font-bold mb-6">Today's Inspiration</h2>
//                 <blockquote className="text-lg sm:text-xl leading-relaxed italic max-w-2xl mx-auto">
//                   "{todaysQuote}"
//                 </blockquote>
//               </div>
//             </div>
//           </div>

//           {/* Mood Tracker */}
//           <div className="lg:col-span-4">
//             <div className="bg-white rounded-2xl p-6 card-shadow h-full">
//               <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">How are you feeling?</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {moods.map((mood) => (
//                   <button
//                     key={mood.label}
//                     onClick={() => setCurrentMood(mood.label)}
//                     className={`p-4 rounded-xl border-2 transition-all duration-300 ${
//                       currentMood === mood.label
//                         ? "border-green-400 bg-green-50 shadow-md transform scale-105"
//                         : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
//                     }`}
//                   >
//                     <div className="text-2xl mb-2">{mood.emoji}</div>
//                     <div className="text-sm font-medium text-gray-700">{mood.label}</div>
//                   </button>
//                 ))}
//               </div>
//               {currentMood && (
//                 <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
//                   <p className="text-sm text-green-700 text-center">
//                     You're feeling {currentMood.toLowerCase()} today. Remember, all feelings are valid and temporary.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Saved Items */}
//           <div className="lg:col-span-8">
//             <div className="bg-white rounded-2xl p-6 card-shadow">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">Your Saved Items</h3>
//                 <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                   {savedItems.length} items
//                 </span>
//               </div>
//               <div className="space-y-4">
//                 {savedItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-md">
//                         {item.type === "book" ? "📚" : item.type === "music" ? "🎵" : "🎬"}
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900">{item.title}</h4>
//                         <p className="text-sm text-gray-600">
//                           {item.author} • {item.type} • {item.mood}
//                         </p>
//                       </div>
//                     </div>
//                     <button className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Weekly Progress */}
//           <div className="lg:col-span-4">
//             <div className="bg-white rounded-2xl p-6 card-shadow">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">This Week</h3>
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                       <span className="text-green-600">💬</span>
//                     </div>
//                     <span className="text-gray-700 font-medium">Chat Sessions</span>
//                   </div>
//                   <span className="font-bold text-green-600 text-xl">5</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <span className="text-blue-600">📚</span>
//                     </div>
//                     <span className="text-gray-700 font-medium">Media Explored</span>
//                   </div>
//                   <span className="font-bold text-blue-600 text-xl">12</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//                       <span className="text-orange-600">📊</span>
//                     </div>
//                     <span className="text-gray-700 font-medium">Mood Entries</span>
//                   </div>
//                   <span className="font-bold text-orange-600 text-xl">7</span>
//                 </div>
//               </div>
//               <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
//                 <div className="text-center">
//                   <span className="text-2xl mb-2 block">🎉</span>
//                   <p className="text-sm text-gray-700 font-medium">
//                     Great job staying consistent with your wellness routine!
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile


//**********After counsalrsfunctionility */
"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { auth, db } from "./firebase"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        fetchAppointments(currentUser.uid)
      } else {
        navigate("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const fetchAppointments = async (userId) => {
    try {
      const appointmentsRef = collection(db, "appointments")
      const q = query(appointmentsRef, where("userId", "==", userId), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)

      const appointmentsData = []
      querySnapshot.forEach((doc) => {
        appointmentsData.push({ id: doc.id, ...doc.data() })
      })

      setAppointments(appointmentsData)
    } catch (error) {
      console.error("Error fetching appointments:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white font-bold">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.displayName || "User"}</h1>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Member since{" "}
                  {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {appointments.length} appointments
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Info
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`px-6 py-4 font-medium text-sm ${
                  activeTab === "appointments"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                My Appointments ({appointments.length})
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                      <p className="text-gray-900">{user?.displayName || "Not set"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                      <p className="text-gray-900">
                        {user?.metadata?.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Sign In</label>
                      <p className="text-gray-900">
                        {user?.metadata?.lastSignInTime
                          ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Journey</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{appointments.length}</div>
                      <div className="text-sm text-green-700">Total Appointments</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {appointments.filter((apt) => apt.status === "completed").length}
                      </div>
                      <div className="text-sm text-blue-700">Completed Sessions</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {appointments.filter((apt) => apt.status === "pending").length}
                      </div>
                      <div className="text-sm text-orange-700">Pending Appointments</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Appointments</h3>
                  <button
                    onClick={() => navigate("/connect-counselors")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Book New Appointment
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments yet</h3>
                    <p className="text-gray-600 mb-4">Start your wellness journey by booking your first session</p>
                    <button
                      onClick={() => navigate("/connect-counselors")}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Find a Counselor
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const AppointmentCard = ({ appointment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{appointment.counselorName}</h4>
          <p className="text-gray-600 capitalize">{appointment.appointmentType} session</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Preferred Date:</span>
          <span className="ml-2 text-gray-600">{appointment.preferredDate}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Preferred Time:</span>
          <span className="ml-2 text-gray-600">{appointment.preferredTime}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Booked:</span>
          <span className="ml-2 text-gray-600">{formatDate(appointment.createdAt)}</span>
        </div>
      </div>

      {appointment.message && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <span className="font-medium text-gray-700">Message:</span>
          <p className="text-gray-600 mt-1">{appointment.message}</p>
        </div>
      )}
    </div>
  )
}

export default Profile

