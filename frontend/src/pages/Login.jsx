// "use client"

// import { useState } from "react"
// import { Link } from "react-router-dom"

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     // Simulate API call
//     setTimeout(() => {
//       console.log("Login attempt:", formData)
//       setIsLoading(false)
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/50 to-blue-50/50">
//       <div className="container px-4">
//         <div className="max-w-md w-full mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <span className="text-white font-bold text-2xl">🧠</span>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//               <p className="text-gray-600">Sign in to continue your wellness journey</p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
//                   <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Signing In...
//                   </div>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

////****************************With Backend */
// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { signInWithEmailAndPassword } from "firebase/auth"
// import { auth } from "./firebase" // Adjust path as needed

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [rememberMe, setRememberMe] = useState(false)
  
//   const navigate = useNavigate() // For navigation after successful login

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//     // Clear errors when user starts typing
//     if (error) setError("")
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")
    
//     try {
//       // Sign in with Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(
//         auth, 
//         formData.email, 
//         formData.password
//       )
      
//       const user = userCredential.user
//       console.log("User signed in successfully:", user)
      
//       // Optional: Set persistence based on "Remember me" checkbox
//       if (rememberMe) {
//         // Firebase automatically handles persistence, but you can store user preference
//         localStorage.setItem('rememberUser', 'true')
//       } else {
//         localStorage.removeItem('rememberUser')
//       }
      
//       // Clear form on successful login
//       setFormData({
//         email: "",
//         password: "",
//       })
      
//       // Redirect to dashboard or home page
//       navigate('/dashboard') // Change this to your desired route
      
//     } catch (error) {
//       console.error("Login error:", error)
      
//       // Handle specific Firebase errors
//       switch (error.code) {
//         case 'auth/user-not-found':
//           setError("No account found with this email address. Please check your email or sign up.")
//           break
//         case 'auth/wrong-password':
//           setError("Incorrect password. Please try again.")
//           break
//         case 'auth/invalid-email':
//           setError("Please enter a valid email address.")
//           break
//         case 'auth/user-disabled':
//           setError("This account has been disabled. Please contact support.")
//           break
//         case 'auth/too-many-requests':
//           setError("Too many failed login attempts. Please try again later.")
//           break
//         case 'auth/network-request-failed':
//           setError("Network error. Please check your internet connection and try again.")
//           break
//         case 'auth/invalid-credential':
//           setError("Invalid email or password. Please check your credentials and try again.")
//           break
//         default:
//           setError("An error occurred during login. Please try again.")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/50 to-blue-50/50">
//       <div className="container px-4">
//         <div className="max-w-md w-full mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <span className="text-white font-bold text-2xl">🧠</span>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//               <p className="text-gray-600">Sign in to continue your wellness journey</p>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
//                 {error}
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                   placeholder="Enter your email"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                   placeholder="Enter your password"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="rounded border-gray-300 text-green-600 focus:ring-green-500" 
//                   />
//                   <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`w-full py-4 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${
//                   isLoading 
//                     ? 'bg-gray-400 cursor-not-allowed text-white' 
//                     : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
//                 }`}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Signing In...
//                   </div>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


// ***** After login redirect to home****//
// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { signInWithEmailAndPassword } from "firebase/auth"
// import { auth } from "./firebase" // Adjust path as needed

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [rememberMe, setRememberMe] = useState(false)
  
//   const navigate = useNavigate() // For navigation after successful login

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//     // Clear errors when user starts typing
//     if (error) setError("")
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")
    
//     try {
//       // Sign in with Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(
//         auth, 
//         formData.email, 
//         formData.password
//       )
      
//       const user = userCredential.user
//       console.log("User signed in successfully:", user)
      
//       // Optional: Set persistence based on "Remember me" checkbox
//       if (rememberMe) {
//         // Firebase automatically handles persistence, but you can store user preference
//         localStorage.setItem('rememberUser', 'true')
//       } else {
//         localStorage.removeItem('rememberUser')
//       }
      
//       // Clear form on successful login
//       setFormData({
//         email: "",
//         password: "",
//       })
      
//       // Redirect to home page
//       navigate('/')
      
//     } catch (error) {
//       console.error("Login error:", error)
      
//       // Handle specific Firebase errors
//       switch (error.code) {
//         case 'auth/user-not-found':
//           setError("No account found with this email address. Please check your email or sign up.")
//           break
//         case 'auth/wrong-password':
//           setError("Incorrect password. Please try again.")
//           break
//         case 'auth/invalid-email':
//           setError("Please enter a valid email address.")
//           break
//         case 'auth/user-disabled':
//           setError("This account has been disabled. Please contact support.")
//           break
//         case 'auth/too-many-requests':
//           setError("Too many failed login attempts. Please try again later.")
//           break
//         case 'auth/network-request-failed':
//           setError("Network error. Please check your internet connection and try again.")
//           break
//         case 'auth/invalid-credential':
//           setError("Invalid email or password. Please check your credentials and try again.")
//           break
//         default:
//           setError("An error occurred during login. Please try again.")
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50/50 to-blue-50/50">
//       <div className="container px-4">
//         <div className="max-w-md w-full mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <span className="text-white font-bold text-2xl">🧠</span>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//               <p className="text-gray-600">Sign in to continue your wellness journey</p>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
//                 {error}
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                   placeholder="Enter your email"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
//                   placeholder="Enter your password"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <input 
//                     type="checkbox" 
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="rounded border-gray-300 text-green-600 focus:ring-green-500" 
//                   />
//                   <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                 </label>
//                 <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`w-full py-4 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl ${
//                   isLoading 
//                     ? 'bg-gray-400 cursor-not-allowed text-white' 
//                     : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
//                 }`}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Signing In...
//                   </div>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-8 text-center">
//               <p className="text-gray-600">
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login


///*********************Counsaling */
"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

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

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)

      const user = userCredential.user
      console.log("User signed in successfully:", user)

      if (rememberMe) {
        localStorage.setItem("rememberUser", "true")
      } else {
        localStorage.removeItem("rememberUser")
      }

      setFormData({
        email: "",
        password: "",
      })

      navigate("/")
    } catch (error) {
      console.error("Login error:", error)

      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address. Please check your email or sign up.")
          break
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.")
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address.")
          break
        case "auth/user-disabled":
          setError("This account has been disabled. Please contact support.")
          break
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later.")
          break
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection and try again.")
          break
        case "auth/invalid-credential":
          setError("Invalid email or password. Please check your credentials and try again.")
          break
        default:
          setError("An error occurred during login. Please try again.")
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to continue your wellness journey</p>
            </div>

            {/* Error Message */}
            {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </Link>
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
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
