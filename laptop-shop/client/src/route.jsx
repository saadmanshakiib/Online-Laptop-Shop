import { Route, Routes } from 'react-router-dom'
import Homepage from './Homepage.jsx'
import SignInPage from './SignInPage.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  )
}

export default AppRoutes
