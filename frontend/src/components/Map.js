import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Spinner from './Spinner';
import axios from 'axios';

const Map = () => {
  const [nodeData, updateNodeData] = useState();

  const getNodesData = async () => {
    const nodes = await axios.get('/api/smartcontrol/ubic');
    updateNodeData(nodes.data.data);
  };

  useEffect(() => {
    getNodesData();
  }, []);
  return (
    <>
      {!nodeData ? (
        <Spinner />
      ) : (
        <MapContainer
          style={{ height: '100vh' }}
          center={[nodeData[0].latitude, nodeData[0].longitude]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <MarkerClusterGroup>
            {nodeData.map((light) => (
              <Marker
                key={light.id}
                position={[light.latitude, light.longitude]}
              >
                <Popup>
                  {light.light_status}. <br /> Easily customizable.
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
