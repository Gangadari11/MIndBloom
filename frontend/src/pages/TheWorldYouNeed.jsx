// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { 
//   collection, 
//   addDoc, 
//   query, 
//   orderBy, 
//   limit, 
//   onSnapshot, 
//   doc, 
//   updateDoc, 
//   increment,
//   arrayUnion,
//   arrayRemove,
//   getDoc,
//   serverTimestamp
// } from 'firebase/firestore';
// import { db } from '../firebase';

// const TheWorldYouNeed = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isAnonymous, setIsAnonymous] = useState(false);
//   const [showMessageForm, setShowMessageForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [messagesLoading, setMessagesLoading] = useState(true);
//   const [commentText, setCommentText] = useState('');
//   const [showComments, setShowComments] = useState({});
//   const [comments, setComments] = useState({});

//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Fetch messages from Firebase
//   useEffect(() => {
//     const q = query(
//       collection(db, 'kindness_messages'),
//       orderBy('timestamp', 'desc'),
//       limit(50)
//     );

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const messagesData = [];
//       querySnapshot.forEach((doc) => {
//         messagesData.push({
//           id: doc.id,
//           ...doc.data(),
//           timestamp: doc.data().timestamp?.toDate() || new Date()
//         });
//       });
//       setMessages(messagesData);
//       setMessagesLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   // Fetch comments for messages
//   useEffect(() => {
//     const fetchComments = async () => {
//       const commentsData = {};
//       for (const message of messages) {
//         if (message.commentCount > 0) {
//           const q = query(
//             collection(db, 'kindness_messages', message.id, 'comments'),
//             orderBy('timestamp', 'desc')
//           );
//           const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const messageComments = [];
//             querySnapshot.forEach((doc) => {
//               messageComments.push({
//                 id: doc.id,
//                 ...doc.data(),
//                 timestamp: doc.data().timestamp?.toDate() || new Date()
//               });
//             });
//             setComments(prev => ({
//               ...prev,
//               [message.id]: messageComments
//             }));
//           });
//         }
//       }
//     };

//     if (messages.length > 0) {
//       fetchComments();
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;

//     // Check if user is authenticated
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const messageData = {
//         content: newMessage,
//         authorName: isAnonymous ? 'Anonymous' : (user.displayName || 'User'),
//         authorId: user.uid,
//         authorEmail: user.email,
//         isAnonymous: isAnonymous,
//         timestamp: serverTimestamp(),
//         likes: 0,
//         likedBy: [],
//         commentCount: 0,
//         createdAt: new Date().toISOString(),
//         category: 'kindness' // Add category for filtering
//       };

//       await addDoc(collection(db, 'kindness_messages'), messageData);
      
//       // Reset form
//       setNewMessage('');
//       setIsAnonymous(false);
//       setShowMessageForm(false);
      
//       console.log('Message saved to Firebase successfully');
//     } catch (error) {
//       console.error('Error saving message:', error);
//       alert('Error sending message. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async (messageId) => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     try {
//       const messageRef = doc(db, 'kindness_messages', messageId);
//       const messageDoc = await getDoc(messageRef);
      
//       if (messageDoc.exists()) {
//         const messageData = messageDoc.data();
//         const likedBy = messageData.likedBy || [];
//         const hasLiked = likedBy.includes(user.uid);

//         if (hasLiked) {
//           // Unlike
//           await updateDoc(messageRef, {
//             likes: increment(-1),
//             likedBy: arrayRemove(user.uid)
//           });
//         } else {
//           // Like
//           await updateDoc(messageRef, {
//             likes: increment(1),
//             likedBy: arrayUnion(user.uid)
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error updating like:', error);
//     }
//   };

//   const handleAddComment = async (messageId) => {
//     if (!commentText.trim() || !user) return;

//     try {
//       const commentData = {
//         content: commentText,
//         authorName: user.displayName || 'User',
//         authorId: user.uid,
//         timestamp: serverTimestamp(),
//         createdAt: new Date().toISOString()
//       };

//       await addDoc(collection(db, 'kindness_messages', messageId, 'comments'), commentData);
      
//       // Update comment count
//       const messageRef = doc(db, 'kindness_messages', messageId);
//       await updateDoc(messageRef, {
//         commentCount: increment(1)
//       });

//       setCommentText('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   const toggleComments = (messageId) => {
//     setShowComments(prev => ({
//       ...prev,
//       [messageId]: !prev[messageId]
//     }));
//   };

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return 'Just now';
    
//     const now = new Date();
//     const diff = now - timestamp;
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);

//     if (days > 0) return `${days}d ago`;
//     if (hours > 0) return `${hours}h ago`;
//     if (minutes > 0) return `${minutes}m ago`;
//     return 'Just now';
//   };

//   const isLikedByUser = (message) => {
//     return user && message.likedBy && message.likedBy.includes(user.uid);
//   };

//   if (messagesLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-pink-50/30 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading messages...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-pink-50/30">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="mb-6">
//             <span className="text-6xl mb-4 block">🌍</span>
//             <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
//               The World You Need
//             </h1>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-orange-100">
//             <p className="text-xl sm:text-2xl text-gray-700 italic font-medium mb-2">
//               "Be the kind of world you wish you were born into."
//             </p>
//             <p className="text-lg sm:text-xl text-gray-600 italic">
//               "Someone out there needs what your heart can give."
//             </p>
//           </div>

//           {/* User Status */}
//           {user && (
//             <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
//               <p className="text-green-800">
//                 Welcome back, {user.displayName || user.email}! 👋
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Send Message Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">Share Your Kindness</h2>
//             <button
//               onClick={() => setShowMessageForm(!showMessageForm)}
//               className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center"
//             >
//               <span className="mr-2">📤</span>
//               Send Message
//             </button>
//           </div>

//           {showMessageForm && (
//             <div className="space-y-4">
//               <textarea
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Share a moment of kindness, gratitude, or inspiration..."
//                 className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 rows="4"
//               />
              
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={isAnonymous}
//                     onChange={(e) => setIsAnonymous(e.target.checked)}
//                     className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
//                   />
//                   <span className="text-sm text-gray-600">Share anonymously</span>
//                 </label>
                
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowMessageForm(false)}
//                     className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={loading || !newMessage.trim()}
//                     className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? 'Sending...' : 'Send'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Messages Feed */}
//         <div className="space-y-6">
//           {messages.map((message) => (
//             <div key={message.id} className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
//               {/* Message Header */}
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">👤</span>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{message.authorName}</p>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <span className="mr-1">📅</span>
//                       {formatTimestamp(message.timestamp)}
//                     </div>
//                   </div>
//                 </div>
                
//                 {message.isAnonymous && (
//                   <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
//                     Anonymous
//                   </span>
//                 )}
//               </div>

//               {/* Message Content */}
//               <p className="text-gray-700 leading-relaxed mb-4">{message.content}</p>

//               {/* Message Actions */}
//               <div className="flex items-center space-x-6 mb-4">
//                 <button
//                   onClick={() => handleLike(message.id)}
//                   className={`flex items-center space-x-2 transition-colors ${
//                     isLikedByUser(message)
//                       ? 'text-red-500 hover:text-red-600' 
//                       : 'text-gray-500 hover:text-red-500'
//                   }`}
//                 >
//                   <span className="text-lg">
//                     {isLikedByUser(message) ? '❤️' : '🤍'}
//                   </span>
//                   <span className="text-sm font-medium">{message.likes || 0}</span>
//                 </button>
                
//                 <button 
//                   onClick={() => toggleComments(message.id)}
//                   className="flex items-center space-x-2 text-gray-500 hover:text-orange-500 transition-colors"
//                 >
//                   <span className="text-lg">💬</span>
//                   <span className="text-sm font-medium">{message.commentCount || 0}</span>
//                 </button>
//               </div>

//               {/* Comments Section */}
//               {showComments[message.id] && (
//                 <div className="border-t pt-4">
//                   {/* Add Comment */}
//                   {user && (
//                     <div className="flex space-x-3 mb-4">
//                       <input
//                         type="text"
//                         value={commentText}
//                         onChange={(e) => setCommentText(e.target.value)}
//                         placeholder="Add a comment..."
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                         onKeyPress={(e) => e.key === 'Enter' && handleAddComment(message.id)}
//                       />
//                       <button
//                         onClick={() => handleAddComment(message.id)}
//                         className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
//                       >
//                         Post
//                       </button>
//                     </div>
//                   )}

//                   {/* Comments List */}
//                   <div className="space-y-3">
//                     {comments[message.id]?.map((comment) => (
//                       <div key={comment.id} className="flex space-x-3 bg-gray-50 p-3 rounded-lg">
//                         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                           <span className="text-gray-600 text-xs">👤</span>
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center space-x-2 mb-1">
//                             <span className="font-medium text-sm text-gray-900">{comment.authorName}</span>
//                             <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
//                           </div>
//                           <p className="text-sm text-gray-700">{comment.content}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {messages.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">💝</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               Be the first to share kindness
//             </h3>
//             <p className="text-gray-600">
//               Start spreading positivity and inspire others to do the same
//             </p>
//           </div>
//         )}

//         {/* Call to Action */}
//         <div className="mt-12 text-center">
//           <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl p-8 text-white">
//             <h3 className="text-2xl font-bold mb-4">Make Someone's Day Brighter</h3>
//             <p className="text-lg opacity-90 mb-6">
//               Your words of kindness can create ripples of positivity that reach far beyond what you imagine
//             </p>
//             <button
//               onClick={() => setShowMessageForm(true)}
//               className="bg-white text-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
//             >
//               Share Your Story
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TheWorldYouNeed;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  doc, 
  updateDoc, 
  increment,
  arrayUnion,
  arrayRemove,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const TheWorldYouNeed = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});

  // New states for Light a Candle feature
  const [candles, setCandles] = useState([]);
  const [candlesLoading, setCandlesLoading] = useState(true);
  const [showWishForm, setShowWishForm] = useState(false);
  const [wishMessage, setWishMessage] = useState('');
  const [wishIsAnonymous, setWishIsAnonymous] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch messages from Firebase
  useEffect(() => {
    const q = query(
      collection(db, 'kindness_messages'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        });
      });
      setMessages(messagesData);
      setMessagesLoading(false);
    });

    return unsubscribe;
  }, []);

  // Fetch candles from Firebase
  useEffect(() => {
    const q = query(
      collection(db, 'wish_candles'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const candlesData = [];
      querySnapshot.forEach((doc) => {
        candlesData.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        });
      });
      setCandles(candlesData);
      setCandlesLoading(false);
    });

    return unsubscribe;
  }, []);

  // Fetch comments for messages
  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = {};
      for (const message of messages) {
        if (message.commentCount > 0) {
          const q = query(
            collection(db, 'kindness_messages', message.id, 'comments'),
            orderBy('timestamp', 'desc')
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messageComments = [];
            querySnapshot.forEach((doc) => {
              messageComments.push({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date()
              });
            });
            setComments(prev => ({
              ...prev,
              [message.id]: messageComments
            }));
          });
        }
      }
    };

    if (messages.length > 0) {
      fetchComments();
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Check if user is authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      const messageData = {
        content: newMessage,
        authorName: isAnonymous ? 'Anonymous' : (user.displayName || 'User'),
        authorId: user.uid,
        authorEmail: user.email,
        isAnonymous: isAnonymous,
        timestamp: serverTimestamp(),
        likes: 0,
        likedBy: [],
        commentCount: 0,
        createdAt: new Date().toISOString(),
        category: 'kindness' // Add category for filtering
      };

      await addDoc(collection(db, 'kindness_messages'), messageData);
      
      // Reset form
      setNewMessage('');
      setIsAnonymous(false);
      setShowMessageForm(false);
      
      console.log('Message saved to Firebase successfully');
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendWish = async () => {
    if (!wishMessage.trim()) return;

    // Check if user is authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    setWishLoading(true);
    
    try {
      const wishData = {
        authorName: wishIsAnonymous ? 'Anonymous' : (user.displayName || 'User'),
        authorId: user.uid,
        authorEmail: user.email,
        message: wishMessage,
        isAnonymous: wishIsAnonymous,
        timestamp: serverTimestamp(),
        blessCount: 0,
        blessedBy: [],
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'wish_candles'), wishData);
      
      // Reset form
      setWishMessage('');
      setWishIsAnonymous(false);
      setShowWishForm(false);
      
      console.log('Wish saved to Firebase successfully');
    } catch (error) {
      console.error('Error saving wish:', error);
      alert('Error lighting candle. Please try again.');
    } finally {
      setWishLoading(false);
    }
  };

  const handleLike = async (messageId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const messageRef = doc(db, 'kindness_messages', messageId);
      const messageDoc = await getDoc(messageRef);
      
      if (messageDoc.exists()) {
        const messageData = messageDoc.data();
        const likedBy = messageData.likedBy || [];
        const hasLiked = likedBy.includes(user.uid);

        if (hasLiked) {
          // Unlike
          await updateDoc(messageRef, {
            likes: increment(-1),
            likedBy: arrayRemove(user.uid)
          });
        } else {
          // Like
          await updateDoc(messageRef, {
            likes: increment(1),
            likedBy: arrayUnion(user.uid)
          });
        }
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleBlessWish = async (wishId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const wishRef = doc(db, 'wish_candles', wishId);
      const wishDoc = await getDoc(wishRef);
      
      if (wishDoc.exists()) {
        const wishData = wishDoc.data();
        const blessedBy = wishData.blessedBy || [];
        const hasBlessed = blessedBy.includes(user.uid);

        if (hasBlessed) {
          // Remove blessing
          await updateDoc(wishRef, {
            blessCount: increment(-1),
            blessedBy: arrayRemove(user.uid)
          });
        } else {
          // Add blessing
          await updateDoc(wishRef, {
            blessCount: increment(1),
            blessedBy: arrayUnion(user.uid)
          });
        }
      }
    } catch (error) {
      console.error('Error updating blessing:', error);
    }
  };

  const handleAddComment = async (messageId) => {
    if (!commentText.trim() || !user) return;

    try {
      const commentData = {
        content: commentText,
        authorName: user.displayName || 'User',
        authorId: user.uid,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'kindness_messages', messageId, 'comments'), commentData);
      
      // Update comment count
      const messageRef = doc(db, 'kindness_messages', messageId);
      await updateDoc(messageRef, {
        commentCount: increment(1)
      });

      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleComments = (messageId) => {
    setShowComments(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const isLikedByUser = (message) => {
    return user && message.likedBy && message.likedBy.includes(user.uid);
  };

  const isBlessedByUser = (wish) => {
    return user && wish.blessedBy && wish.blessedBy.includes(user.uid);
  };

  if (messagesLoading || candlesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-pink-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">🌍</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              The World You Need
            </h1>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-orange-100">
            <p className="text-xl sm:text-2xl text-gray-700 italic font-medium mb-2">
              "Be the kind of world you wish you were born into."
            </p>
            <p className="text-lg sm:text-xl text-gray-600 italic">
              "Someone out there needs what your heart can give."
            </p>
          </div>

          {/* User Status */}
          {user && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-800">
                Welcome back, {user.displayName || user.email}! 👋
              </p>
            </div>
          )}
        </div>

        {/* Light a Candle Section */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl shadow-lg p-8 mb-8 border border-purple-200">
          <div className="text-center mb-6">
            <span className="text-5xl mb-4 block">🕯️</span>
            <h2 className="text-3xl font-bold text-white mb-2">Light a Candle</h2>
            <p className="text-purple-100 text-lg">
              Make a wish and let your light shine in the darkness
            </p>
          </div>

          {/* Light Candle Form */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowWishForm(!showWishForm)}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              🕯️ Light a Candle
            </button>
          </div>

          {showWishForm && (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <textarea
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  placeholder="Make a wish, send a prayer, or share hope..."
                  className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="3"
                />
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={wishIsAnonymous}
                      onChange={(e) => setWishIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600">Wish anonymously</span>
                  </label>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowWishForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendWish}
                      disabled={wishLoading || !wishMessage.trim()}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {wishLoading ? 'Lighting...' : 'Light Candle'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wishing Wall */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              ✨ Wishing Wall ✨
            </h3>
            
            {candles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candles.map((candle) => (
                  <div key={candle.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">🕯️</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{candle.authorName}</p>
                          <p className="text-xs text-gray-500">{formatTimestamp(candle.timestamp)}</p>
                        </div>
                      </div>
                      {candle.isAnonymous && (
                        <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                          Anonymous
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">{candle.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleBlessWish(candle.id)}
                        className={`flex items-center space-x-1 transition-colors text-sm ${
                          isBlessedByUser(candle)
                            ? 'text-purple-600 hover:text-purple-700' 
                            : 'text-gray-500 hover:text-purple-600'
                        }`}
                      >
                        <span className="text-base">
                          {isBlessedByUser(candle) ? '🙏' : '🤲'}
                        </span>
                        <span className="font-medium">{candle.blessCount || 0}</span>
                        <span>Bless</span>
                      </button>
                      
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>✨</span>
                        <span>Lit {formatTimestamp(candle.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🕯️</div>
                <p className="text-white/80 text-lg">
                  Be the first to light a candle of hope
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Send Message Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Share Your Kindness</h2>
            <button
              onClick={() => setShowMessageForm(!showMessageForm)}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center"
            >
              <span className="mr-2">📤</span>
              Send Message
            </button>
          </div>

          {showMessageForm && (
            <div className="space-y-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share a moment of kindness, gratitude, or inspiration..."
                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows="4"
              />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">Share anonymously</span>
                </label>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowMessageForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !newMessage.trim()}
                    className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages Feed */}
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
              {/* Message Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{message.authorName}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">📅</span>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
                
                {message.isAnonymous && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    Anonymous
                  </span>
                )}
              </div>

              {/* Message Content */}
              <p className="text-gray-700 leading-relaxed mb-4">{message.content}</p>

              {/* Message Actions */}
              <div className="flex items-center space-x-6 mb-4">
                <button
                  onClick={() => handleLike(message.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    isLikedByUser(message)
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <span className="text-lg">
                    {isLikedByUser(message) ? '❤️' : '🤍'}
                  </span>
                  <span className="text-sm font-medium">{message.likes || 0}</span>
                </button>
                
                <button 
                  onClick={() => toggleComments(message.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <span className="text-lg">💬</span>
                  <span className="text-sm font-medium">{message.commentCount || 0}</span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments[message.id] && (
                <div className="border-t pt-4">
                  {/* Add Comment */}
                  {user && (
                    <div className="flex space-x-3 mb-4">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(message.id)}
                      />
                      <button
                        onClick={() => handleAddComment(message.id)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-3">
                    {comments[message.id]?.map((comment) => (
                      <div key={comment.id} className="flex space-x-3 bg-gray-50 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-xs">👤</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">{comment.authorName}</span>
                            <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Be the first to share kindness
            </h3>
            <p className="text-gray-600">
              Start spreading positivity and inspire others to do the same
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Make Someone's Day Brighter</h3>
            <p className="text-lg opacity-90 mb-6">
              Your words of kindness can create ripples of positivity that reach far beyond what you imagine
            </p>
            <button
              onClick={() => setShowMessageForm(true)}
              className="bg-white text-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheWorldYouNeed;