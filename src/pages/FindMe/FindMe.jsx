import React from 'react'
import Map from '../../components/map/Map'

const FindMe = () => {
  return (
    <div style={{margin: 0, width: "100%", height: "100vh", position: "absolute"}}>
        <div style={{display:"flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", alignItems: "center"}}>
        <Map />
        </div>
    </div>
  )
}

export default FindMe