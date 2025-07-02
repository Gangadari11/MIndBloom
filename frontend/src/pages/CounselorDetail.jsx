// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore"
// import { onAuthStateChanged } from "firebase/auth"
// import { db, auth } from "./firebase"

// const CounselorDetail = () => {
//   const { counselorId } = useParams()
//   const navigate = useNavigate()
//   const [counselor, setCounselor] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [user, setUser] = useState(null)
//   const [showBookingModal, setShowBookingModal] = useState(false)
//   const [selectedCourse, setSelectedCourse] = useState(null)

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser)
//     })
//     return () => unsubscribe()
//   }, [])

//   useEffect(() => {
//     fetchCounselorDetails()
//   }, [counselorId])

//   const fetchCounselorDetails = async () => {
//     try {
//       const counselorRef = doc(db, "counselors", counselorId)
//       const counselorSnap = await getDoc(counselorRef)

//       if (counselorSnap.exists()) {
//         setCounselor({ id: counselorSnap.id, ...counselorSnap.data() })
//       } else {
//         console.error("Counselor not found")
//         navigate("/connect-counselors")
//       }
//     } catch (error) {
//       console.error("Error fetching counselor:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleBookAppointment = async (appointmentData) => {
//     if (!user) {
//       navigate("/login")
//       return
//     }

//     try {
//       const appointmentRef = collection(db, "appointments")
//       await addDoc(appointmentRef, {
//         userId: user.uid,
//         counselorId: counselor.id,
//         counselorName: counselor.name,
//         userEmail: user.email,
//         userName: user.displayName || user.email,
//         ...appointmentData,
//         status: "pending",
//         createdAt: serverTimestamp(),
//       })

//       alert("Appointment request sent successfully! The counselor will contact you soon.")
//       setShowBookingModal(false)
//     } catch (error) {
//       console.error("Error booking appointment:", error)
//       alert("Error booking appointment. Please try again.")
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading counselor details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!counselor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Counselor Not Found</h2>
//           <button
//             onClick={() => navigate("/connect-counselors")}
//             className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
//           >
//             Back to Counselors
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30 py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             {/* Profile Image */}
//             <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//               <span className="text-4xl text-white font-bold">
//                 {counselor.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </span>
//             </div>

//             {/* Basic Info */}
//             <div className="flex-1 text-center md:text-left">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{counselor.name}</h1>
//               <p className="text-xl text-gray-600 mb-4">{counselor.title}</p>

//               <div className="flex items-center justify-center md:justify-start mb-4">
//                 <div className="flex text-yellow-400 mr-2">
//                   {[...Array(5)].map((_, i) => (
//                     <svg
//                       key={i}
//                       className={`w-5 h-5 ${i < Math.floor(counselor.rating) ? "fill-current" : "text-gray-300"}`}
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <span className="text-gray-600">
//                   {counselor.rating} ({counselor.totalReviews} reviews)
//                 </span>
//               </div>

//               <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
//                 {counselor.specialties.map((specialty, index) => (
//                   <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
//                     {specialty}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
//                 <span>{counselor.experience} years experience</span>
//                 <span>•</span>
//                 <span className="font-semibold text-green-600">${counselor.pricePerSession}/session</span>
//                 <span>•</span>
//                 <span
//                   className={`font-medium ${
//                     counselor.availability === "Available Today" ? "text-green-600" : "text-yellow-600"
//                   }`}
//                 >
//                   {counselor.availability}
//                 </span>
//               </div>
//             </div>

//             {/* Connect Button */}
//             <div className="flex-shrink-0">
//               <button
//                 onClick={() => setShowBookingModal(true)}
//                 className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
//               >
//                 Book Appointment
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* About Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">About {counselor.name.split(" ")[0]}</h2>
//           <p className="text-gray-700 leading-relaxed mb-6">{counselor.bio}</p>

//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Credentials</h3>
//               <ul className="space-y-2">
//                 {counselor.credentials.map((credential, index) => (
//                   <li key={index} className="flex items-center text-gray-700">
//                     <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     {credential}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
//               <div className="flex flex-wrap gap-2">
//                 {counselor.languages.map((language, index) => (
//                   <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
//                     {language}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Courses/Practices Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses & Practices</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {counselor.courses?.map((course, index) => (
//               <CourseCard key={index} course={course} onSelect={() => setSelectedCourse(course)} />
//             )) || (
//               // Default courses if none specified
//               <>
//                 <CourseCard
//                   course={{
//                     title: "Anxiety Management Techniques",
//                     description: "Learn practical strategies to manage anxiety in daily life",
//                     duration: "45 minutes",
//                     videoId: "1Evwgu369Jw",
//                   }}
//                   onSelect={() =>
//                     setSelectedCourse({
//                       title: "Anxiety Management Techniques",
//                       description: "Learn practical strategies to manage anxiety in daily life",
//                       duration: "45 minutes",
//                       videoId: "1Evwgu369Jw",
//                     })
//                   }
//                 />
//                 <CourseCard
//                   course={{
//                     title: "Mindfulness Meditation",
//                     description: "Introduction to mindfulness and meditation practices",
//                     duration: "30 minutes",
//                     videoId: "ZToicYcHIOU",
//                   }}
//                   onSelect={() =>
//                     setSelectedCourse({
//                       title: "Mindfulness Meditation",
//                       description: "Introduction to mindfulness and meditation practices",
//                       duration: "30 minutes",
//                       videoId: "ZToicYcHIOU",
//                     })
//                   }
//                 />
//                 <CourseCard
//                   course={{
//                     title: "Stress Relief Techniques",
//                     description: "Effective methods for managing and reducing stress",
//                     duration: "35 minutes",
//                     videoId: "86HUcX8ZtAk",
//                   }}
//                   onSelect={() =>
//                     setSelectedCourse({
//                       title: "Stress Relief Techniques",
//                       description: "Effective methods for managing and reducing stress",
//                       duration: "35 minutes",
//                       videoId: "86HUcX8ZtAk",
//                     })
//                   }
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Booking Modal */}
//       {showBookingModal && (
//         <BookingModal
//           counselor={counselor}
//           onClose={() => setShowBookingModal(false)}
//           onBook={handleBookAppointment}
//           user={user}
//         />
//       )}

//       {/* Course Video Modal */}
//       {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
//     </div>
//   )
// }

// const CourseCard = ({ course, onSelect }) => {
//   return (
//     <div
//       className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
//       onClick={onSelect}
//     >
//       <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
//         <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//           <path
//             fillRule="evenodd"
//             d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//       <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
//       <p className="text-gray-600 text-sm mb-2">{course.description}</p>
//       <span className="text-green-600 text-sm font-medium">{course.duration}</span>
//     </div>
//   )
// }

// const CourseModal = ({ course, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
//               ×
//             </button>
//           </div>

//           <div className="aspect-video mb-4">
//             <iframe
//               width="100%"
//               height="100%"
//               src={`https://www.youtube.com/embed/${course.videoId}`}
//               title={course.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="rounded-lg"
//             ></iframe>
//           </div>

//           <p className="text-gray-700 mb-4">{course.description}</p>
//           <div className="flex items-center text-sm text-gray-600">
//             <span>Duration: {course.duration}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const BookingModal = ({ counselor, onClose, onBook, user }) => {
//   const [formData, setFormData] = useState({
//     appointmentType: "video",
//     preferredDate: "",
//     preferredTime: "",
//     message: "",
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onBook(formData)
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl max-w-md w-full">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
//               ×
//             </button>
//           </div>

//           <div className="mb-4 p-4 bg-green-50 rounded-lg">
//             <p className="text-sm text-green-800">
//               <strong>{counselor.name}</strong> - ${counselor.pricePerSession}/session
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
//               <select
//                 name="appointmentType"
//                 value={formData.appointmentType}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               >
//                 <option value="video">Video Call</option>
//                 <option value="phone">Phone Call</option>
//                 <option value="in-person">In-Person</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
//               <input
//                 type="date"
//                 name="preferredDate"
//                 value={formData.preferredDate}
//                 onChange={handleChange}
//                 min={new Date().toISOString().split("T")[0]}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
//               <select
//                 name="preferredTime"
//                 value={formData.preferredTime}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               >
//                 <option value="">Select time</option>
//                 <option value="09:00">9:00 AM</option>
//                 <option value="10:00">10:00 AM</option>
//                 <option value="11:00">11:00 AM</option>
//                 <option value="14:00">2:00 PM</option>
//                 <option value="15:00">3:00 PM</option>
//                 <option value="16:00">4:00 PM</option>
//                 <option value="17:00">5:00 PM</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows="3"
//                 placeholder="Tell the counselor what you'd like to discuss..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//               ></textarea>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
//               >
//                 Book Appointment
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CounselorDetail


//******************************************** */
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

// Mock data - same as in ConnectCounselors.jsx
const mockCounselors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    rating: 4.8,
    totalReviews: 127,
    experience: 8,
    pricePerSession: 120,
    availability: "Available Today",
    bio: "Dr. Sarah Johnson is a compassionate and experienced clinical psychologist with over 8 years of practice. She specializes in helping individuals overcome anxiety, depression, and trauma through evidence-based therapeutic approaches.",
    credentials: ["Ph.D. in Clinical Psychology", "Licensed Clinical Psychologist", "Certified CBT Therapist"],
    languages: ["English", "Spanish"]
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationships", "Couples Therapy", "Family Therapy"],
    rating: 4.9,
    totalReviews: 89,
    experience: 12,
    pricePerSession: 140,
    availability: "Available This Week",
    bio: "Michael Chen brings over 12 years of experience in marriage and family therapy. He helps couples and families navigate relationship challenges and build stronger, healthier connections.",
    credentials: ["M.A. in Marriage & Family Therapy", "Licensed MFT", "Gottman Method Couples Therapy"],
    languages: ["English", "Mandarin", "Cantonese"]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Clinical Social Worker",
    specialties: ["Addiction", "Mindfulness", "Trauma"],
    rating: 4.7,
    totalReviews: 156,
    experience: 6,
    pricePerSession: 100,
    availability: "Next Available: Dec 15",
    bio: "Dr. Emily Rodriguez is a dedicated clinical social worker who specializes in addiction recovery, mindfulness-based interventions, and trauma-informed care. She creates a safe, non-judgmental space for healing.",
    credentials: ["MSW - Master of Social Work", "Licensed Clinical Social Worker", "Certified Addiction Counselor"],
    languages: ["English", "Spanish", "Portuguese"]
  }
]

const CounselorDetail = () => {
  const { counselorId } = useParams()
  const navigate = useNavigate()
  const [counselor, setCounselor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({ email: "demo@example.com", displayName: "Demo User" }) // Mock user
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    fetchCounselorDetails()
  }, [counselorId])

  const fetchCounselorDetails = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Find counselor in mock data
      const foundCounselor = mockCounselors.find(c => c.id === counselorId)
      
      if (foundCounselor) {
        setCounselor(foundCounselor)
      } else {
        console.error("Counselor not found")
        navigate("/connect-counselors")
      }
    } catch (error) {
      console.error("Error fetching counselor:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async (appointmentData) => {
    if (!user) {
      navigate("/login")
      return
    }

    try {
      // Simulate booking process
      console.log("Booking appointment:", {
        counselorId: counselor.id,
        counselorName: counselor.name,
        userEmail: user.email,
        userName: user.displayName || user.email,
        ...appointmentData,
        status: "pending",
        createdAt: new Date().toISOString(),
      })

      alert("Appointment request sent successfully! The counselor will contact you soon.")
      setShowBookingModal(false)
    } catch (error) {
      console.error("Error booking appointment:", error)
      alert("Error booking appointment. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/30 to-blue-50/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading counselor details...</p>
        </div>
      </div>
    )
  }

  if (!counselor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/30 to-blue-50/30">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Counselor Not Found</h2>
          <button
            onClick={() => navigate("/connect-counselors")}
            className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
          >
            Back to Counselors
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-4xl text-white font-bold">
                {counselor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{counselor.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{counselor.title}</p>

              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(counselor.rating) ? "fill-current" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {counselor.rating} ({counselor.totalReviews} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {counselor.specialties.map((specialty, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                <span>{counselor.experience} years experience</span>
                <span>•</span>
                <span className="font-semibold text-green-600">${counselor.pricePerSession}/session</span>
                <span>•</span>
                <span
                  className={`font-medium ${
                    counselor.availability === "Available Today" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {counselor.availability}
                </span>
              </div>
            </div>

            {/* Connect Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {counselor.name.split(" ")[0]}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{counselor.bio}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Credentials</h3>
              <ul className="space-y-2">
                {counselor.credentials.map((credential, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {credential}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {counselor.languages.map((language, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courses/Practices Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses & Practices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              course={{
                title: "Anxiety Management Techniques",
                description: "Learn practical strategies to manage anxiety in daily life",
                duration: "45 minutes",
                videoId: "1Evwgu369Jw",
              }}
              onSelect={() =>
                setSelectedCourse({
                  title: "Anxiety Management Techniques",
                  description: "Learn practical strategies to manage anxiety in daily life",
                  duration: "45 minutes",
                  videoId: "1Evwgu369Jw",
                })
              }
            />
            <CourseCard
              course={{
                title: "Mindfulness Meditation",
                description: "Introduction to mindfulness and meditation practices",
                duration: "30 minutes",
                videoId: "ZToicYcHIOU",
              }}
              onSelect={() =>
                setSelectedCourse({
                  title: "Mindfulness Meditation",
                  description: "Introduction to mindfulness and meditation practices",
                  duration: "30 minutes",
                  videoId: "ZToicYcHIOU",
                })
              }
            />
            <CourseCard
              course={{
                title: "Stress Relief Techniques",
                description: "Effective methods for managing and reducing stress",
                duration: "35 minutes",
                videoId: "86HUcX8ZtAk",
              }}
              onSelect={() =>
                setSelectedCourse({
                  title: "Stress Relief Techniques",
                  description: "Effective methods for managing and reducing stress",
                  duration: "35 minutes",
                  videoId: "86HUcX8ZtAk",
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          counselor={counselor}
          onClose={() => setShowBookingModal(false)}
          onBook={handleBookAppointment}
          user={user}
        />
      )}

      {/* Course Video Modal */}
      {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
    </div>
  )
}

const CourseCard = ({ course, onSelect }) => {
  return (
    <div
      className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{course.description}</p>
      <span className="text-green-600 text-sm font-medium">{course.duration}</span>
    </div>
  )
}

const CourseModal = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          <div className="aspect-video mb-4">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${course.videoId}`}
              title={course.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>

          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="flex items-center text-sm text-gray-600">
            <span>Duration: {course.duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const BookingModal = ({ counselor, onClose, onBook, user }) => {
  const [formData, setFormData] = useState({
    appointmentType: "video",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onBook(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          <div className="mb-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>{counselor.name}</strong> - ${counselor.pricePerSession}/session
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
              <select
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Tell the counselor what you'd like to discuss..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CounselorDetail