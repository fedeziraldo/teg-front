import React, { Fragment, useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";
const socket = socketIOClient(ENDPOINT);

function Chat({userId}) {
    const [mensajes, setMensajes] = useState([]);
    
    useEffect(() => {
        //entrar()
        socket.off("chat");
        socket.on("chat", msj => {
            console.log(msj)
            setMensajes([...mensajes, msj]);
        });
        // // CLEAN UP THE EFFECT
        // return () => socket.disconnect();
        // //
      },[mensajes]);
    const entrar=()=>{
        socket.on('connect',()=>{
            socket.emit('entrarJuego',userId,function(resp){
                 console.log('Entro al Juego')
            })
        })
    }
    
     
    const enviarChat = e => {
        console.log(e.target.chat.value)
        socket.emit("chat", e.target.chat.value)
        e.preventDefault()
    }

    return (
        <Fragment>

            <ul>
                {mensajes.map((msj) => (
                    <li key={msj}>
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
