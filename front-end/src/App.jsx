import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Livros from './components/pages/Livros'
import Cadastro from './components/pages/Cadastro'
import Carrinho from './components/pages/Carrinho'
import Atualiza from './components/pages/Atualiza'
import TrocaSenha from './components/pages/TrocaSenha'
import Contato from './components/pages/Contato'


function App() {
  const [lista, setLista] = useState([ {
    link: "/admin",
    text: "Admin"
    
  },
   {
    link: "/cadastrar",
    text: "Cadastrar"
  }])
  

  return (
    <Router>
          <Navbar props={lista}/>
              <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/livros" element={<Livros />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Cadastro />} />
                    <Route path="/carrinho" element={<Carrinho />} />   
                    <Route path="/atualizaemail" element={<Atualiza />} />  
                    <Route path="/trocasenha" element={<TrocaSenha />} />   
                    <Route path="/contato" element={<Contato />} />        
              </Routes>
            <Footer/>
      </Router>
  )
}

export default App
