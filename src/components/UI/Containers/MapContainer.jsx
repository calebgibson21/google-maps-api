import React from 'react';
import { MainMapContainer } from './MainMapContainer';

const MapContainer = ({children}) => {
  return (
    <MainMapContainer>{children}</MainMapContainer>
  )
}

export default MapContainer