import { useEffect } from 'react'
import FloatingShape from './components/FloatingShape'
import { Routes, Route, Navigate } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { useAuthStore } from './store/authStore.js'
import LoadingSpinner from './components/LoadingSpinner.jsx'

const ProtectedRoutes = ({ children }) => {
  const { isAuthenicated, user } = useAuthStore()
  if (!isAuthenicated) {
    return <Navigate to="/login" />
  }  // if not authenicated 
  if (!user.isVerified) {
    return <Navigate to="/verify-email" />
  }  // if not verified 

  return children

}


const RedirectAuthenicatedUser = ({ children }) => {
  const { isAuthenicated, user } = useAuthStore()
  if (isAuthenicated && user.isVerified) {
    return <Navigate to="/" />
  }  // if authenicated and verified navigate to homepage else no change

  return children

}

const App = () => {
  const { isCheckingAuth, checkauth } = useAuthStore()


  // useAuthStore() (whole store)	 On any change	
  // useAuthStore(state => state.user)	 Only if user changes	 
  // useEffect(..., [])	❌ Never re-runs after mount	
  // useEffect(..., [user, isAuthenicated])	 Runs when values change	 


  useEffect(() => {
    const fetchAuth = async () => {
      console.log("First UseEffect")
      const result = await checkauth();
      if (!result.success) {
        console.error("Auth failed:", result.error);
      }
    };
    fetchAuth();
    //Because useEffect callbacks can’t be async, and calling an async function directly inside useEffect without awaiting it

  }, []);


  if (isCheckingAuth) {
    return <LoadingSpinner />
  }


  return (
    <div className='min-h-screen bg-gradient-to-br 
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden '>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="30%" left="-10%" delay={10} />

      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>} />

        <Route path="/signup" element={
          <RedirectAuthenicatedUser>
            <SignUpPage />
          </RedirectAuthenicatedUser>} />

        <Route path="/login" element={
          <RedirectAuthenicatedUser>
            <LoginPage />
          </RedirectAuthenicatedUser>} />

        <Route path="/verify-email" element={
          <VerifyEmail />} />

        <Route path="/forgot-password" element={
        <RedirectAuthenicatedUser><ForgotPassword /></RedirectAuthenicatedUser>} />

        <Route path="/reset-password/:token" element={
        <RedirectAuthenicatedUser><ResetPassword /></RedirectAuthenicatedUser>} />


          {/*catch all files  */}
        <Route path="*" element={<Navigate to="/" replace />} />  
        {/* if above routes dont match navigate to home page and replace the invalid url to / in the browser stack  */}

      </Routes>
    </div>
  )
}

export default App
