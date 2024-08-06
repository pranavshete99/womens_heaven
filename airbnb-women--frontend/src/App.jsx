import './App.css'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider } from './contexts/UserContext'
import AccountPage from './pages/Account'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingsList from './pages/BookingsList'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />          
          <Route path='/account/:subpage/:action' element={<AccountPage />} />          
          <Route path='/account/:subpage/:id' element={<AccountPage />} />          
          <Route path='/account/bookings' element={<BookingsList />} />          
          <Route path='/account/bookings/:id' element={<BookingsPage />} />          
          <Route path='/place/:id' element={<PlacePage />} />          
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
