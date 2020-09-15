import React, {  useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
function AlertDismissibleExample({mensaje}) {
    const [show, setShow] = useState(false);

    if(mensaje){
        setShow(true);
    }
  
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
    // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  export default AlertDismissibleExample;