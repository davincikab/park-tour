import React, { useState, useEffect, useRef } from 'react';
import { Map, TileLayer,  Marker, Popup} from 'react-leaflet';
import Button from './Button/Button';
import './App.css';
import * as L from 'leaflet';
import pts from './assets/pts.json';


const myIcon = L.divIcon({className: 'custom-icon'});
function App() {
  const [isMapVisible, setMapVisible] = useState(true);
  const [isDescriptionVisible, setDescriptionVisible ] = useState(false);
  const [center, setCenter ] = useState({lat:-1.234, lng:36.987});
  const [zoom, setZoom ] = useState(12);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState({});
  const mapRef = useRef(null);

  useEffect(() => {
    setData(pts.features);
  }, []);

  // toggle map
  const updateMapState = () => {
    setMapVisible(!isMapVisible);
  }


  // toggle description
  const toggleDescription = (value, feature) => {
    setDescriptionVisible(value);
    updateDescription(feature);

    let currCenter = [];
    if(feature.properties) {
      console.log(feature);
      currCenter = feature.geometry.coordinates;

      console.log(currCenter);
      setCenter({lat:currCenter[1], lng:currCenter[0]});
      console.log(mapRef);
    }
  }

  // update the point description
  const updateDescription = (description) => {
    setDescription(description);
  }


  console.log(center);
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
            ref={mapRef}
           >
              <TileLayer 
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              />

                {
                  data &&
                  <ListMarkers data={data} toggleDescription={toggleDescription} updateDescription={updateDescription}/>
                }
           </Map>
           <div className="filter-section">
              <h6 className="filter-title">Filters</h6>
              <div className="btn-group">
                <Button className="btn-primary" text="Primary" onClick={() => console.log("Click")} />
                <Button className="btn-secondary" text="Seconday" onClick={ () => console.log("Click")} />
                <Button className="btn-tertiary" text="Update" onClick={e => toggleDescription(false, {})}/>
              </div>
           </div>

           {/* Point description sections */}
            
            {
              description.properties && 
              <div className={isDescriptionVisible ? "description-tab" : "description-tab d-none"}>
                <div className="section-intro">
                      {/* Controls */}
                      <Button className="" text="&minus;" onClick={() => console.log("Click")}/>
                      <Button className="" text="&#43;" onClick={() => console.log("Click")}/>
                      <Button className="" text="&times;"  onClick={e => toggleDescription(false, {})}/>
                </div>
                <div className="section">
                    <h5 className="section-title">
                      <div className="custom-icon mr-2">{description.properties.id}</div>
                      {description.properties.name}
                    </h5>
                </div>
                <div className="section">
                  <div className="section-text">
                    <p className="text">
                      {description.properties.description}
                    </p>
                  </div>
                  <div className="section-media">
                     <img className="img" src={require("./assets/" + description.properties.img)}/>
                  </div>
                </div>
              </div>
            }
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
      e.target.openPopup();
    }

    const onMouseOut = (e) => {
      // e.target.closePopup();
      console.log(e);
    }

    return (
        data.map(feature => 
        <Marker
                position={[...feature.geometry.coordinates].reverse()}
                icon={myIcon}
                key={feature.properties.id}
                onMouseOver={onMouseOver}
                // onClick={e => props.updateDescription(feature)}
            >
                <Popup
                  key={feature.properties.id}
                  onMouseOut={onMouseOut}
                >
                  <div className="popup-content">
                    <img src={require("./assets/" + feature.properties.img)} />
                    <div className="custom-icon marker-popup"></div>
                    <button className="btn" onClick={e => props.toggleDescription(true, feature)}>&#8594;</button>
                  </div>
                </Popup>
              </Marker>
      )
  );
}

export default App;
