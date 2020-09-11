import React,{ useState } from 'react';
import { Register } from './componentes/Register';
import { Login } from './componentes/Login';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Sala from './componentes/Sala';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4001";
const socket = socketIOClient(ENDPOINT);

function App() {
  const [usuario, setusuario] = useState({email:'',contrasena:''})
  const [registrar, setregistrar] = useState(false)
  const [irChat, setirChat] = useState(false)

  const handlerChangeInput=({target})=>{
    setusuario({
        ...usuario,
        [target.name]:target.value
    })
}
  const hadlerRegister=()=>{
    setregistrar(true)
  }
  const hadlerLogin=()=>{
    setregistrar(false)
  }
  const handlerSubmitLogin=(e)=>{
  
  
    const url='http://localhost:4001/login/login'
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(usuario), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
       let status= response.status
       if(status==='success'){
        setirChat(true)
        socket.emit("conectar", response.data.token)
       }
        console.log('Success:', response)
      });
}
const handlerSubmitRegister=(e)=>{
  
  const url='http://localhost:4001/login/'
  fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(usuario), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>{
      let status= response.status
      if(status==='success'){
        setregistrar(false)
      }
      console.log('Success:', response)
    } );
}
  return (
    <Container>
      {
      irChat
     
      ?
      <>
      <Sala socket={socket}/>
      </>
      :
      
      <>
      <h1>Bienvenidos al Teg!!</h1>
     {
        registrar
        ?
        <>
        <Register handlerSubmitLogin={handlerSubmitRegister} andlerSubmitLogin={handlerChangeInput} usuario={usuario}/>
        <Button onClick={hadlerLogin} variant="outline-secondary">Login</Button>{' '}
        </>
       
        :
        <>
        <Login handlerSubmitLogin={handlerSubmitLogin} andlerSubmitLogin={handlerChangeInput} usuario={usuario}/>
        <Button onClick={hadlerRegister} variant="outline-secondary">Registrarse</Button>{' '}
        </>
       
     }
      
      </> 
      
     
  }
    </Container>
      
  );
}

export default App;
