import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
// import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Professors from './pages/Professors'
import Recommender from './pages/Recommender'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import AddProfessor from './pages/AddProfessor'
import AddStudent from './pages/AddStudent'
import StudentDashboard from './pages/StudentDashboard'
import ProfessorDashboard from './pages/ProfessorDashboard'
import ProfessorProfile from './components/ProfessorProfile'
import Wishlist from './pages/Wishlist'
import Publication from './pages/Publication'
import PageNotFound from './components/PageNotFound'
import ProfessorForm from './components/ProfessorForm'
import StudentForm from './components/StudentForm'

function App() {
  
  return (
    <div className='bg-[#d9ba98] w-full min-h-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/professors' element={<Professors />} />
        <Route path='/recommender' element={<Recommender />} />
        {/* <Route path='/about' element={<About />} /> */}
        <Route path='/contact' element={<Contact />} />
        <Route path='/login/:id' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/addprofessor' element={<AddProfessor />} />
        {/* <Route path='/admin/addprofessor/new' element={<ProfessorForm />} /> */}
        <Route path='/admin/addprofessor/:id' element={<ProfessorForm />} />
        <Route path='/admin/addstudent' element={<AddStudent />} />
        {/* <Route path='/admin/addstudent/new' element={<StudentForm />} /> */}
        <Route path='/admin/addstudent/:id' element={<StudentForm />} />

        <Route path='/professor' element={<ProfessorDashboard />} />
        <Route path='/professor/addPublication' element={<Publication />} />  
        <Route path='/professors/:id' element={<ProfessorProfile />} />

        <Route path='/student' element={<StudentDashboard />} />
        <Route path='/student/wishlist' element={<Wishlist />} />

        {/* page not found */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
