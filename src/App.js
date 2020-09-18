import React, { useState, useEffect } from 'react';
import { Register } from './componentes/Register';
import { Login } from './componentes/Login';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Sala from './componentes/Sala';
import socketIOClient from "socket.io-client";
import Mapa from './componentes/Mapa';

const ENDPOINT = "http://localhost:4001";
const socket = socketIOClient(ENDPOINT);

function App() {
    const [usuario, setusuario] = useState({ email: '', contrasena: '' })
    const [Usuario, setUsuario] = useState({})
    const [registrar, setregistrar] = useState(false)
    const [irChat, setirChat] = useState(true)

    useEffect(() => {
        socket.on("usuario", usuario => {
            console.log(usuario)
            setUsuario(usuario)
        });
        socket.on("errorConexion", () => {
            console.log("token erroneo o inexistente")
            setirChat(false)
        });
        socket.emit("conectar", localStorage.getItem("token"))
    }, []);

    const handlerChangeInput = ({ target }) => {
        setusuario({
            ...usuario,
            [target.name]: target.value
        })
    }
    const hadlerRegister = () => {
        setregistrar(true)
    }
    const hadlerLogin = () => {
        setregistrar(false)
    }
    const handlerSubmitLogin = (e) => {


        const url = 'http://localhost:4001/login/login'
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(usuario), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                let status = response.status
                if (status === 'success') {
                    localStorage.setItem("token", response.data.token)
                    setirChat(true)
                    socket.emit("conectar", response.data.token)
                }
                console.log('Success:', response)
            });
    }
    const handlerSubmitRegister = (e) => {

        const url = 'http://localhost:4001/login/'
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(usuario), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                let status = response.status
                if (status === 'success') {
                    setregistrar(false)
                }
                console.log('Success:', response)
            });
    }

    const salir = () => {
        socket.emit("desconectar")
        localStorage.removeItem("token");
        setirChat(false)
    }

    return (
        <Container>
            {
                irChat

                    ?
                    <>
                        <Button onClick={salir}>Salir</Button> 
                        <Sala socket={socket} usuario={Usuario} />
                    </>
                    :

                    <>
                        <h1>Bienvenidos al Teg!!</h1>
                        {
                            registrar
                                ?
                                <>
                                    <Register handlerSubmitLogin={handlerSubmitRegister} andlerSubmitLogin={handlerChangeInput} usuario={usuario} />
                                    <Button onClick={hadlerLogin} variant="outline-secondary">Login</Button>{' '}
                                </>

                                :
                                <>
                                    <Login handlerSubmitLogin={handlerSubmitLogin} andlerSubmitLogin={handlerChangeInput} usuario={usuario} />
                                    <Button onClick={hadlerRegister} variant="outline-secondary">Registrarse</Button>{' '}
                                </>

                        }

                    </>


            }
            <Mapa />
        </Container>

    );
}

export default App;
