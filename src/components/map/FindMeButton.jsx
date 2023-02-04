import { initMap } from "./Map";

import React from 'react'

export const FindMeButton = () => {
  return (
    <button id="find-me-btn" onClick={initMap}>Map</button>
  )
}
