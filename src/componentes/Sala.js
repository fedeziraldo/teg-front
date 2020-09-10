import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Chat from './Chat';

function Sala({socket}) {
    const [salas, setSalas] = useState([]);
    const [sala, setSala] = useState("");
    
    useEffect(() => {
        socket.off("salas");
        socket.on("salas", salas => {
            console.log(salas)
            setSalas(salas);
        });
        // // CLEAN UP THE EFFECT
        // return () => socket.disconnect();
        // //
      },[salas]);    
     
    const crearSala = e => {
        socket.emit("crearSala")
    }

    const unirseASala = userIdSala => {
        socket.emit("unirseASala", userIdSala)
    }

    const abandonarSala = e => {
        socket.emit("abandonarSala")
    }

    return (
        <Fragment>

            <ol>
                {salas.map((sala) => (
                    <li key={sala.userId}>
                        {sala.userId} {sala.integrantes.length}
                        <Button onClick={() => unirseASala(sala.userId)}>Unirse a Sala</Button>
                    </li>))}
            </ol>
            <Button onClick={crearSala}>Crear Sala</Button>
            <Button onClick={abandonarSala}>Abandonar Sala</Button>

            <Chat socket={socket}/>
        </Fragment>
    );
}

export default Sala;
