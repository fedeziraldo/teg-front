import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';

function Mapa() {

  const [image] = useImage('mapa.jpg');
  const [image2] = useImage('Paises/ANGOLA.png');
  let angola

  const rojificar = e => {
    e.target['red'](Math.random()*255)
    e.target.cache()
    e.target.drawHitFromCache();
    e.target.getLayer().batchDraw();
    console.log("roj")
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image 
          image={image2} 
          onMouseOver={e => rojificar(e)}
          filters={[Konva.Filters.RGB]}
          ref={node => {
            angola = node;
          }}
          />
      </Layer>
    </Stage>
  );
}

export default Mapa;
