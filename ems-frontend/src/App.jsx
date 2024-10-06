
import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import SignIn from './components/SignIn'
import NoItem from './components/NoItem'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerComponent from './components/CustomerComponent'
import HistoryCTMComponent from './components/HistoryCTMComponent'
import RoomComponent from './components/Room/RoomComponent'
import AddRoomComponent from './components/Room/AddRoomComponent'
import AccompaniedServiceComponent from './components/AccompaniedService/AccompaniedServiceComponent'
import AddOrUpdateAccompaniedServiceComponent from './components/AccompaniedService/AddOrUpdateAccompaniedServiceComponent'
import LoginComponent from './components/Account/LoginComponent'
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State để theo dõi trạng thái đăng nhập
  return (
    <>
      <BrowserRouter>
        <div className="app-container d-flex">
        {!isLoggedIn && <SignIn />} {/* Hiển thị FirstPageComponent nếu chưa đăng nhập */}
        {isLoggedIn && <HeaderComponent setIsLoggedIn={setIsLoggedIn}/>} {/* Hiển thị HeaderComponent nếu đã đăng nhập */}
          <div className="content">
            <Routes>
              <Route path='/' element={<NoItem />} />
              <Route path='/HeaderComponent' element={<HeaderComponent />} />
              <Route path='/employees' element={<ListEmployeeComponent />} />
              <Route path='/add-employee' element={<EmployeeComponent />} />

              <Route path='/edit-employee/:id' element={<EmployeeComponent />} />
              <Route path='/customers' element={<CustomerComponent />} />
              <Route path='/history/:id' element={<HistoryCTMComponent />} />

              <Route path='/rooms' element={<RoomComponent />} />
              <Route path='/add-room' element={<AddRoomComponent />} />
              <Route path='/updateRoom/:id' element={<AddRoomComponent />} />

              <Route path='/accompaniedService' element={<AccompaniedServiceComponent />} />
              <Route path='/add-accompaniedService' element={<AddOrUpdateAccompaniedServiceComponent />} />
              <Route path='/updateaccompaniedService/:id' element={<AddOrUpdateAccompaniedServiceComponent />} />


              <Route path='/login' element={<LoginComponent setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App

