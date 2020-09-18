import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Chat({ socket, usuario }) {
    const [mensajes, setMensajes] = useState([]);
    const [sala, setSala] = useState({ integrantes: [], usuario: {} });

    useEffect(() => {
        //entrar()
        socket.off("chat");
        socket.on("chat", msj => {
            console.log(msj)
            setMensajes([...mensajes, msj]);
        });
        socket.off("sala");
        socket.on("sala", sala => {
            console.log(sala)
            setSala(sala);
        });
        // // CLEAN UP THE EFFECT
        // return () => socket.disconnect();
        // //
    }, [mensajes, socket]);
    const entrar = () => {
        socket.on('connect', () => {
            socket.emit('entrarJuego', function (resp) {
                console.log('Entro al Juego')
            })
        })
    }


    const enviarChat = e => {
        console.log(e.target.chat.value)
        socket.emit("chat", e.target.chat.value)
        e.preventDefault()
    }

    const abandonarSala = e => {
        socket.emit("abandonarSala")
    }

    const iniciarJuego = e => {
        socket.emit("iniciarJuego")
    }

    return (
        <Fragment>

            {
                sala !== "sin sala" ?
                    <Fragment>
                        {
                            usuario._id === sala.userId ?
                                <h2>Creaste la sala <i>{sala.usuario.email}</i></h2>
                                :
                                <h2>Estas unido a la sala <i>{sala.usuario.email}</i></h2>
                        }
                        <div>
                            Integrantes:
                            <ul>
                                {sala.integrantes.map(integrante =>
                                    <li key={integrante}>{integrante.alias}</li>
                                )}
                            </ul>
                            <Button onClick={abandonarSala}>Abandonar Sala</Button>
                            {
                                usuario._id === sala.userId ?
                                    <Button onClick={iniciarJuego}>Iniciar juego</Button>
                                    :
                                    null
                            }

                        </div>
                    </Fragment>
                    :
                    null
            }

            <h2>Chat Teg</h2>
            <ul>
                {mensajes.map((msj, i) => (
                    <li key={i}>
                        {msj}
                    </li>))}
            </ul>
            <form onSubmit={enviarChat}>

                <input autoComplete='off' name="chat" />
                <button type="submit">Enviar</button>
            </form>
        </Fragment>
    );
}

export default Chat;
