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
  const [center, setCenter ] = useState({lat:-1.234, lng:36.987});
  const [zoom, setZoom ] = useState(12);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(pts.features);
  }, []);

  // toggle map
  const updateMapState = () => {
    setMapVisible(!isMapVisible);
  }

  return (
    <div className="App">
      <header className="App-header">
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
              <Marker
                position={center}
                icon={myIcon}
              >
                <Popup>
                  <div className="popup-content">
                    <img src={sunrise} />

                    <button className="bnt">Go ---</button>
                  </div>
                </Popup>
              </Marker>
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

           <div className="description-tab">
            <div className="section-intro">

            </div>
            <div className="section-intro">

            </div>
            <div className="section-intro">

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
  console.log(data);
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
                    <img src={sunrise} />

                    <button className="bnt">Go ---</button>
                  </div>
                </Popup>
              </Marker>
      )
  );
}

export default App;
