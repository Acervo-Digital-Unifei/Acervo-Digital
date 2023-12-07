import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'

import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Livros from './components/pages/Livros'
import Cadastro from './components/pages/Cadastro'
import Carrinho from './components/pages/Carrinho'
import RequisitarAlteracaoDeSenha from './components/pages/RequisitarAlteracaoDeSenha'
import Contato from './components/pages/Contato'
import ConfirmarEmail from './components/pages/ConfirmarEmail'
import AlterarSenha  from './components/pages/AlterarSenha'
import AlterarEmail from './components/pages/AlterarEmail'
import RequisitarAlteracaoDeEmail from './components/pages/RequisitarAlteracaoDeEmail'
import AtualizarLivro from './components/pages/AtualizarLivro'
import Profile from './components/pages/Profile'
import CompraFinalizada from './components/pages/CompraFinalizada'
import SobreNos from './components/pages/SobreNos'
import CadastrarLivro from './components/pages/CadastrarLivro'

export const UserContext = React.createContext(null);

function App() {  
  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem('token');
    if(token)
      return jwtDecode(token.split(' ')[1]);
    return null;
  });  

  return (
    <Router>
        <UserContext.Provider value={{user, setUser}}>
          <Navbar/>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/livros" element={<Livros />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastrar" element={<Cadastro />} />
              <Route path="/carrinho" element={<Carrinho />} />   
              <Route path="/alteraremail" element={<AlterarEmail />} />  
              <Route path="/alterarsenha" element={<AlterarSenha />} />  
              <Route path="/requisicaoalteraremail" element={<RequisitarAlteracaoDeEmail />} />  
              <Route path="/requisicaoalterarsenha" element={<RequisitarAlteracaoDeSenha />}/> 
              <Route path="/contato" element={<Contato />} />        
              <Route path="/confirmaremail" element={<ConfirmarEmail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/comprafinalizada" element={<CompraFinalizada />} />
              <Route path="/sobrenos" element={<SobreNos />} />
              <Route path="/cadastrarlivro" element={<CadastrarLivro />} />
              <Route path="/atualizarlivro/:id" element={<AtualizarLivro />} />
          </Routes>
          <Footer/>
        </UserContext.Provider> 
      </Router>
  )
}

export default App
