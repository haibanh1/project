
import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerComponent from './components/CustomerComponent'
import HistoryCTMComponent from './components/HistoryCTMComponent'
import RoomComponent from './components/Room/RoomComponent'
import AddRoomComponent from './components/Room/AddRoomComponent'
import AccompaniedServiceComponent from './components/AccompaniedService/AccompaniedServiceComponent'
import AddOrUpdateAccompaniedServiceComponent from './components/AccompaniedService/AddOrUpdateAccompaniedServiceComponent'
import LoginComponent from './components/Account/LoginComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <HeaderComponent />
          <div className="content">
            <Routes>
              <Route path='/' element={<ListEmployeeComponent />} />
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


              <Route path='/login' element={<LoginComponent/>} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App

