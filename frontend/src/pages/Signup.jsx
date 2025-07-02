// "use client"

// import { useState } from "react"
// import { Link } from "react-router-dom"

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log("Signup attempt:", formData)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Join MindBloom</h1>
//           <p className="text-gray-600">Start your mental wellness journey today</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Create a password"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Confirm your password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
//           >
//             Create Account
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup




///*****************Backend With */
// "use client"

// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
// import { doc, setDoc } from "firebase/firestore"
// import { auth, db } from "./firebase" // Adjust path as needed

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })
  
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//     // Clear errors when user starts typing
//     if (error) setError("")
//   }

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match")
//       return false
//     }
//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters long")
//       return false
//     }
//     if (!formData.name.trim()) {
//       setError("Please enter your full name")
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!validateForm()) return
    
//     setLoading(true)
//     setError("")
    
//     try {
//       // Create user with Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth, 
//         formData.email, 
//         formData.password
//       )
      
//       const user = userCredential.user
      
//       // Update the user's display name
//       await updateProfile(user, {
//         displayName: formData.name
//       })
      
//       // Save additional user data to Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name: formData.name,
//         email: formData.email,
//         createdAt: new Date().toISOString(),
//         uid: user.uid
//       })
      
//       setSuccess("Account created successfully! Welcome to MindBloom!")
      
//       // Clear form
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       })
      
//       // Optional: Redirect to dashboard or login page after successful signup
//       // You can use react-router's navigate here
//       console.log("User created successfully:", user)
      
//     } catch (error) {
//       console.error("Signup error:", error)
      
//       // Handle specific Firebase errors
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           setError("This email is already registered. Please use a different email or try logging in.")
//           break
//         case 'auth/invalid-email':
//           setError("Please enter a valid email address.")
//           break
//         case 'auth/weak-password':
//           setError("Password is too weak. Please choose a stronger password.")
//           break
//         case 'auth/network-request-failed':
//           setError("Network error. Please check your internet connection and try again.")
//           break
//         default:
//           setError("An error occurred during signup. Please try again.")
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Join MindBloom</h1>
//           <p className="text-gray-600">Start your mental wellness journey today</p>
//         </div>

//         {/* Success Message */}
//         {success && (
//           <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
//             {success}
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Enter your full name"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Enter your email"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Create a password"
//               required
//               disabled={loading}
//               minLength={6}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//               placeholder="Confirm your password"
//               required
//               disabled={loading}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${
//               loading 
//                 ? 'bg-gray-400 cursor-not-allowed text-white' 
//                 : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
//             }`}
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup


//****************Counsaling */
"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "./firebase"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      const user = userCredential.user

      // Update user profile with display name
      await updateProfile(user, {
        displayName: formData.name,
      })

      console.log("User created successfully:", user)

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      navigate("/")
    } catch (error) {
      console.error("Signup error:", error)

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists. Please sign in instead.")
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address.")
          break
        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.")
          break
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection and try again.")
          break
        default:
          setError("An error occurred during signup. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/50 to-blue-50/50">
      <div className="container px-4">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-2xl">🧠</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join MindBloom</h1>
              <p className="text-gray-600">Create your account and start your wellness journey</p>
            </div>

            {/* Error Message */}
            {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
