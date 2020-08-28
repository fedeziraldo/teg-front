import React, { Fragment, useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

function App() {
    const [mensajes, setMensajes] = useState([]);
    
    const socket = socketIOClient(ENDPOINT);
    
    useEffect(() => {
        socket.on("chat", msj => {
            console.log(msj)
            setMensajes([...mensajes, msj]);
        });
        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
        //
      });

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

export default App;
