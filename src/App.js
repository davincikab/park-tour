import React, { useState, useEffect } from 'react';
import { Map, TileLayer,  Marker, Popup} from 'react-leaflet';
import Button from './Button/Button';
import './App.css';
import * as L from 'leaflet';
import sunrise from './assets/sunrise.jpg'
import pts from './assets/pts.json';


const myIcon = L.divIcon({className: 'custom-icon'});
function App() {
  const [isMapVisible, setMapVisible] = useState(true);
  const [isDescriptionVisible, setDesscriptionVisible ] = useState(false);
  const [center, setCenter ] = useState({lat:-1.234, lng:36.987});
  const [zoom, setZoom ] = useState(12);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState({});

  useEffect(() => {
    setData(pts.features);
  }, []);

  // toggle map
  const updateMapState = () => {
    setMapVisible(!isMapVisible);
  }

  // toggle description
  const toggleDescription = (e) => {
    setDesscriptionVisible(!isDescriptionVisible);
  }


  return (
    <div className="App">
      <header className="">
        { !isMapVisible &&
           <div className="app-name" onClick={updateMapState}>
            Park Tour
          </div>
        }

        { isMapVisible &&
          <>
           <Map
            center={center}
            zoom={zoom}
            className="map-container"
           >
              <TileLayer 
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              />

                {
                  data &&
                  <ListMarkers data={data} />
                }
           </Map>
           <div className="filter-section">
              <h6 className="filter-title">Filters</h6>
              <div className="btn-group">
                <Button className="btn-primary" text="Primary" />
                <Button className="btn-secondary" text="Seconday" />
                <Button className="btn-tertiary" text="Update" />
              </div>
           </div>

           {/* Point description sections */}

           <div className={isDescriptionVisible ? "description-tab" : "description-tab d-none"}>
            <div className="section-intro">
                  {/* Controls */}
                  <Button className="" text="&minus;"/>
                  <Button className="" text="&#43;"/>
                  <Button className="" text="&times;"/>
            </div>
            <div className="section">
                <h5 className="section-title">Home coming</h5>
            </div>
            <div className="section">
            </div>
           </div>
           </>
        }
      </header>
    </div>
  );
}

// list markes
const ListMarkers = (props) => {
  const data = props.data;

  // mouse over event
    const onMouseOver = (e) => {
      console.log(e);
      e.target.openPopup();
    }

    const onMouseOut = (e) => {
      e.target.closePopup();
    }
    return (
        data.map(feature => 
        <Marker
                position={feature.geometry.coordinates.reverse()}
                icon={myIcon}
                key={feature.properties.id}
            >
                <Popup
                  key={feature.properties.id}
                >
                  <div className="popup-content">
                    <img src={require("./assets/" + feature.properties.img)} />
                    <div className="custom-icon marker-popup"></div>
                    <button className="bnt">&#8594;</button>
                  </div>
                </Popup>
              </Marker>
      )
  );
}

export default App;
