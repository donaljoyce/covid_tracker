import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Circle, Popup ,useMap} from "react-leaflet";

function Map(props) {


    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
    return (
        <div>
         <MapContainer center={[props.centre.lat,props.centre.long]} zoom={3} scrollWheelZoom={false}>
         <ChangeView center={[props.centre.lat,props.centre.long]} zoom={3} />
        <TileLayer
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          props.tableData.map((country)=>(
         <Circle
          center={[country.countryInfo.lat,country.countryInfo.long]}
          
          color={'red'}
          fillColor={'red'}
          radius={country.cases/20}>
        <Popup>{country.country},<br/>{country.cases}</Popup>
          
        </Circle>
          ))
        }
        
      </MapContainer>   
        </div>
    )
}

export default Map
