import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function Login({handlerSubmitLogin,andlerSubmitLogin,usuario}) {
   

    const {email,contrasena}=usuario
  
    const handlerSubmit=(e)=>{
        e.preventDefault()
        handlerSubmitLogin(e)
    }
    const handlerChange=(e)=>{
      
        andlerSubmitLogin(e)
    }

    return (
        <>
        <h3>Login</h3>
        <p>Si no tiene una cuenta debes registrarte</p>
        <Form onSubmit={handlerSubmit}>
            <Form.Group controlId="formBasicEmailRegister">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handlerChange} autoComplete='off' name='email' type="email" placeholder="Enter email" value={email} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPasswordRegister">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handlerChange} name='contrasena' type="password" placeholder="Password" value={contrasena} />
            </Form.Group>
            <Button variant="primary" type="Enviar">
                Submit
            </Button>
        </Form>
        </>
    )
}


