import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react'

import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Livros from './components/pages/Livros'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
          <Navbar/>
            <Container>
              <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/livros" element={<Livros />} />
                    <Route path="/login" element={<Login />} />
              </Routes>
            </Container>
            <Footer/>
      </Router>
  )
}

export default App
