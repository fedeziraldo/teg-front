import React, { Fragment, useState, useEffect } from 'react';
import { Button, Col, Row,Table } from 'react-bootstrap';
import Chat from './Chat';
import MensajeError from './MensajeError';

function Sala({ socket, usuario }) {
    const [salas, setSalas] = useState([]);
    const [msgError, setmsgError] = useState("");

    useEffect(() => {
        socket.on("salas", salas => {
            console.log(salas)
            setSalas(salas);
        });
        socket.on("error", msg => {
            if(msg){
                setmsgError(msg)
            }
            
        });
       
        // // CLEAN UP THE EFFECT
        // return () => socket.disconnect();
        // //
    }, [socket]);

    const crearSala = e => {
        socket.emit("crearSala")
    }

    const unirseASala = userIdSala => {
        socket.emit("unirseASala", userIdSala)
    }

    return (
        <Fragment>
            {
            msgError?
            <MensajeError mensaje={msgError}/>
            :null
            }
            <Row>
                <Col>
                    <div>
                        <h2>Bienvenido {usuario.nombreCompleto}</h2>
                        {usuario._id}<br/>
                        {usuario.email}
                    </div>
                    <h2>Salas Teg</h2>
                    {
                         salas.length ?
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre Sala</th>
                                    <th>Cantidad</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                            {salas.map((sala) => (
                                <tr>
                                    <td> {sala.usuario.email}</td>
                                    <td> {sala.integrantes.length}</td>
                                    <td>  <Button size="sm" onClick={() => unirseASala(sala.userId)}>Unirse a Sala</Button></td>
                                </tr>
                            ))}
                            </tbody>
                      </Table>
                            :
                            <div><h5>No hay salas</h5></div>
                    }
                    <Button onClick={crearSala}>Crear Sala</Button>
                </Col>
                <Col>
                    <Chat socket={socket} usuario={usuario} />
                </Col>
            </Row>
        </Fragment>
    );
}

export default Sala;
