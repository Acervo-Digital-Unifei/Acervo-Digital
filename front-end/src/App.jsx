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

export const UserContext = React.createContext(null);


function App() {
  const [lista, setLista] = useState([ {
    link: "/admin",
    text: "Admin"
    
  },
   {
    link: "/cadastrar",
    text: "Cadastrar"
  }])
  
  const [user, setUser] = useState(null);
  
  const initialized = useRef(false);

  // On load
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const token = sessionStorage.getItem('token');
    
    if(token) {
      const content = jwtDecode(token.split(' ')[1]);
      setUser({
        username: content.username,
        email: content.email,
        privilege: content.privilege
      });
    }
    
  }, []);

  // On loggedIn/loggedOut
  useEffect(() => {
    console.log('User changed to ' + user)
  }, [user]);

  return (
    <Router>
        <UserContext.Provider value={{user, setUser}}>
          <Navbar props={lista}/>
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
          </Routes>
          <Footer/>
        </UserContext.Provider> 
      </Router>
  )
}

export default App
