import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';

function Mapa() {

  const [image] = useImage('mapa.jpg');
  console.log(image)
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image image={image} />
      </Layer>
    </Stage>
  );
}

export default Mapa;
