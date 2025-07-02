
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"

// // Mock Firebase functions for demo
// const mockDb = {}
// const collection = (db, name) => ({ name })
// const getDocs = async (query) => {
//   // Mock data with proper structure
//   return {
//     forEach: (callback) => {
//       const mockCounselors = [
//         {
//           id: "1",
//           name: "Dr. Sarah Johnson",
//           title: "Licensed Clinical Psychologist",
//           specialties: ["Anxiety", "Depression", "Trauma"],
//           rating: 4.8,
//           totalReviews: 127,
//           experience: 8,
//           pricePerSession: 120,
//           availability: "Available Today",
//           bio: "Dr. Sarah Johnson is a compassionate and experienced clinical psychologist with over 8 years of practice. She specializes in helping individuals overcome anxiety, depression, and trauma through evidence-based therapeutic approaches.",
//           credentials: ["Ph.D. in Clinical Psychology", "Licensed Clinical Psychologist", "Certified CBT Therapist"],
//           languages: ["English", "Spanish"]
//         },
//         {
//           id: "2",
//           name: "Michael Chen",
//           title: "Licensed Marriage & Family Therapist",
//           specialties: ["Relationships", "Couples Therapy", "Family Therapy"],
//           rating: 4.9,
//           totalReviews: 89,
//           experience: 12,
//           pricePerSession: 140,
//           availability: "Available This Week",
//           bio: "Michael Chen brings over 12 years of experience in marriage and family therapy. He helps couples and families navigate relationship challenges and build stronger, healthier connections.",
//           credentials: ["M.A. in Marriage & Family Therapy", "Licensed MFT", "Gottman Method Couples Therapy"],
//           languages: ["English", "Mandarin", "Cantonese"]
//         },
//         {
//           id: "3",
//           name: "Dr. Emily Rodriguez",
//           title: "Clinical Social Worker",
//           specialties: ["Addiction", "Mindfulness", "Trauma"],
//           rating: 4.7,
//           totalReviews: 156,
//           experience: 6,
//           pricePerSession: 100,
//           availability: "Next Available: Dec 15",
//           bio: "Dr. Emily Rodriguez is a dedicated clinical social worker who specializes in addiction recovery, mindfulness-based interventions, and trauma-informed care. She creates a safe, non-judgmental space for healing.",
//           credentials: ["MSW - Master of Social Work", "Licensed Clinical Social Worker", "Certified Addiction Counselor"],
//           languages: ["English", "Spanish", "Portuguese"]
//         }
//       ]
      
//       mockCounselors.forEach((counselor, index) => {
//         callback({
//           id: counselor.id,
//           data: () => counselor
//         })
//       })
//     }
//   }
// }
// const query = (ref, ...args) => ref
// const orderBy = (field, direction) => ({ field, direction })

// const ConnectCounselors = () => {
//   const navigate = useNavigate()
//   const [counselors, setCounselors] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")

//   useEffect(() => {
//     fetchCounselors()
//   }, [])

//   const fetchCounselors = async () => {
//     try {
//       const counselorsRef = collection(mockDb, "counselors")
//       const q = query(counselorsRef, orderBy("rating", "desc"))
//       const querySnapshot = await getDocs(q)

//       const counselorsData = []
//       querySnapshot.forEach((doc) => {
//         const data = doc.data()
//         // Ensure all required fields exist and are properly formatted
//         const counselorData = {
//           id: doc.id,
//           name: data.name || "Unknown Counselor",
//           title: data.title || "Licensed Therapist",
//           specialties: Array.isArray(data.specialties) ? data.specialties : [],
//           rating: typeof data.rating === 'number' ? data.rating : 0,
//           totalReviews: typeof data.totalReviews === 'number' ? data.totalReviews : 0,
//           experience: typeof data.experience === 'number' ? data.experience : 0,
//           pricePerSession: typeof data.pricePerSession === 'number' ? data.pricePerSession : 0,
//           availability: data.availability || "Availability Unknown",
//           bio: data.bio || "No bio available",
//           credentials: Array.isArray(data.credentials) ? data.credentials : [],
//           languages: Array.isArray(data.languages) ? data.languages : ["English"],
//           // Handle schedule object if it exists
//           schedule: data.schedule || null
//         }
//         counselorsData.push(counselorData)
//       })

//       setCounselors(counselorsData)
//     } catch (error) {
//       console.error("Error fetching counselors:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredCounselors = counselors.filter((counselor) => {
//     const matchesSearch =
//       counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       counselor.specialties.some((specialty) => 
//         specialty.toLowerCase().includes(searchTerm.toLowerCase())
//       )

//     if (filter === "all") return matchesSearch
//     return matchesSearch && counselor.specialties.includes(filter)
//   })

//   const specialties = ["all", "Anxiety", "Depression", "Relationships", "Trauma", "Mindfulness", "Addiction"]

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/30 to-blue-50/30">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading counselors...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30 py-8">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Connect with <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Professional Counselors</span>
//           </h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Find the right mental health professional for your journey. Our certified counselors offer personalized
//             support and evidence-based practices to help you thrive.
//           </p>
//         </div>

//         {/* Search and Filter */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Search counselors or specialties..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
//               />
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {specialties.map((specialty) => (
//                 <button
//                   key={specialty}
//                   onClick={() => setFilter(specialty)}
//                   className={`px-4 py-2 rounded-full font-medium transition-all ${
//                     filter === specialty
//                       ? "bg-green-500 text-white shadow-lg"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {specialty === "all" ? "All Specialties" : specialty}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Counselors Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredCounselors.map((counselor) => (
//             <CounselorCard key={counselor.id} counselor={counselor} navigate={navigate} />
//           ))}
//         </div>

//         {filteredCounselors.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No counselors found</h3>
//             <p className="text-gray-600">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// const CounselorCard = ({ counselor, navigate }) => {
//   // Safely handle schedule object if it exists
//   const formatSchedule = (schedule) => {
//     if (!schedule || typeof schedule !== 'object') return null
    
//     const days = Object.entries(schedule)
//       .filter(([day, available]) => available)
//       .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
    
//     return days.length > 0 ? days.join(', ') : 'Schedule not available'
//   }

//   const handleViewProfile = () => {
//     navigate(`/counselor/${counselor.id}`)
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//       <div className="p-6">
//         {/* Profile Image */}
//         <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
//           <span className="text-2xl text-white font-bold">
//             {counselor.name
//               .split(" ")
//               .map((n) => n[0])
//               .join("")
//               .toUpperCase()}
//           </span>
//         </div>

//         {/* Basic Info */}
//         <div className="text-center mb-4">
//           <h3 className="text-xl font-bold text-gray-900 mb-1">{counselor.name}</h3>
//           <p className="text-gray-600 mb-2">{counselor.title}</p>
//           <div className="flex items-center justify-center mb-3">
//             <div className="flex text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-4 h-4 ${i < Math.floor(counselor.rating) ? "fill-current" : "text-gray-300"}`}
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="ml-2 text-sm text-gray-600">
//               {counselor.rating.toFixed(1)} ({counselor.totalReviews} reviews)
//             </span>
//           </div>
//         </div>

//         {/* Specialties */}
//         <div className="mb-4">
//           <div className="flex flex-wrap gap-1 justify-center">
//             {counselor.specialties.slice(0, 3).map((specialty, index) => (
//               <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
//                 {specialty}
//               </span>
//             ))}
//             {counselor.specialties.length > 3 && (
//               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
//                 +{counselor.specialties.length - 3} more
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Experience and Price */}
//         <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
//           <span>{counselor.experience} years exp.</span>
//           <span className="font-semibold text-green-600">${counselor.pricePerSession}/session</span>
//         </div>

//         {/* Availability */}
//         <div className="mb-4">
//           <span
//             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//               counselor.availability === "Available Today"
//                 ? "bg-green-100 text-green-800"
//                 : counselor.availability === "Available This Week"
//                   ? "bg-yellow-100 text-yellow-800"
//                   : "bg-gray-100 text-gray-800"
//             }`}
//           >
//             <div
//               className={`w-2 h-2 rounded-full mr-1 ${
//                 counselor.availability === "Available Today"
//                   ? "bg-green-400"
//                   : counselor.availability === "Available This Week"
//                     ? "bg-yellow-400"
//                     : "bg-gray-400"
//               }`}
//             ></div>
//             {counselor.availability}
//           </span>
//         </div>

//         {/* Schedule (if available) */}
//         {counselor.schedule && (
//           <div className="mb-4 text-xs text-gray-600">
//             <span className="font-medium">Available: </span>
//             {formatSchedule(counselor.schedule)}
//           </div>
//         )}

//         {/* Action Button */}
//         <button
//           onClick={handleViewProfile}
//           className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
//         >
//           View Profile & Connect
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ConnectCounselors


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../pages/firebase"; // adjust if your path is different
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const ConnectCounselors = () => {
  const navigate = useNavigate();
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    try {
      const counselorsRef = collection(db, "counselors");
      const q = query(counselorsRef, orderBy("rating", "desc"));
      const querySnapshot = await getDocs(q);

      const counselorsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        counselorsData.push({
          id: doc.id,
          name: data.name || "Unknown Counselor",
          title: data.title || "Licensed Therapist",
          specialties: Array.isArray(data.specialties) ? data.specialties : [],
          rating: typeof data.rating === "number" ? data.rating : 0,
          totalReviews: typeof data.totalReviews === "number" ? data.totalReviews : 0,
          experience: typeof data.experience === "number" ? data.experience : 0,
          pricePerSession: typeof data.pricePerSession === "number" ? data.pricePerSession : 0,
          availability: data.availability || "Availability Unknown",
          bio: data.bio || "No bio available",
          credentials: Array.isArray(data.credentials) ? data.credentials : [],
          languages: Array.isArray(data.languages) ? data.languages : ["English"],
          schedule: data.schedule || null,
        });
      });

      setCounselors(counselorsData);
    } catch (error) {
      console.error("Error fetching counselors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      counselor.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (filter === "all") return matchesSearch;
    return matchesSearch && counselor.specialties.includes(filter);
  });

  const specialties = ["all", "Anxiety", "Depression", "Relationships", "Trauma", "Mindfulness", "Addiction"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/30 to-blue-50/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading counselors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-blue-50/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect with <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Professional Counselors</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the right mental health professional for your journey. Our certified counselors offer personalized
            support and evidence-based practices to help you thrive.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search counselors or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setFilter(specialty)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    filter === specialty
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {specialty === "all" ? "All Specialties" : specialty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Counselors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCounselors.map((counselor) => (
            <CounselorCard key={counselor.id} counselor={counselor} navigate={navigate} />
          ))}
        </div>

        {filteredCounselors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No counselors found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CounselorCard = ({ counselor, navigate }) => {
  const formatSchedule = (schedule) => {
    if (!schedule || typeof schedule !== "object") return null;

    const days = Object.entries(schedule)
      .filter(([day, available]) => available)
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1));

    return days.length > 0 ? days.join(", ") : "Schedule not available";
  };

  const handleViewProfile = () => {
    navigate(`/counselor/${counselor.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        {/* Avatar */}
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white font-bold">
            {counselor.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>

        {/* Basic Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{counselor.name}</h3>
          <p className="text-gray-600 mb-2">{counselor.title}</p>
          <div className="flex items-center justify-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(counselor.rating) ? "fill-current" : "text-gray-300"}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {counselor.rating.toFixed(1)} ({counselor.totalReviews} reviews)
            </span>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 justify-center">
            {counselor.specialties.slice(0, 3).map((specialty, index) => (
              <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                {specialty}
              </span>
            ))}
            {counselor.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{counselor.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Experience and Price */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <span>{counselor.experience} years exp.</span>
          <span className="font-semibold text-green-600">${counselor.pricePerSession}/session</span>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              counselor.availability === "Available Today"
                ? "bg-green-100 text-green-800"
                : counselor.availability === "Available This Week"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-1 ${
                counselor.availability === "Available Today"
                  ? "bg-green-400"
                  : counselor.availability === "Available This Week"
                  ? "bg-yellow-400"
                  : "bg-gray-400"
              }`}
            ></div>
            {counselor.availability}
          </span>
        </div>

        {/* Schedule (if available) */}
        {counselor.schedule && (
          <div className="mb-4 text-xs text-gray-600">
            <span className="font-medium">Available: </span>
            {formatSchedule(counselor.schedule)}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleViewProfile}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
        >
          View Profile & Connect
        </button>
      </div>
    </div>
  );
};

export default ConnectCounselors;
