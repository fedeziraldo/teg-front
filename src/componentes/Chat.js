import React, { Fragment, useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

function App() {
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("chat", msj => {
            setMensajes(...mensajes, msj);
        });
    
        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
        //
      }, []);

    const enviarChat = e => {
        console.log(e.target.chat.value)
        socket.emit("chat", e.target.chat.value)
        e.preventDefault()
    }

    return (
        <Fragment>

            <ul>
                {mensajes.map((msj) => (
                    <li>
                        msj
                    </li>))}
            </ul>
            <form onSubmit={enviarChat}>

                <input name="chat" />
                <button type="submit">Enviar</button>
            </form>
        </Fragment>
    );
}

export default App;
