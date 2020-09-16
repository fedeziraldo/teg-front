import React, {  useEffect,useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
function AlertDismissibleExample({mensaje}) {
  console.log('alert',mensaje)
    const [show, setShow] = useState(false);
    useEffect(() => {
        
      if(mensaje){
        setShow(true);
        console.log(show)
    }
  },[mensaje] );
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>
                {mensaje}
          </p>
        </Alert>
      );
    }
    return null
  }
  export default AlertDismissibleExample;