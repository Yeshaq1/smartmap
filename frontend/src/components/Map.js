import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Spinner from './Spinner';
import axios from 'axios';
import { LayersControl } from 'react-leaflet';
import { FeatureLayer } from 'react-esri-leaflet';
import ClusterLayer from 'react-esri-leaflet/plugins/ClusterLayer';

const Map = () => {
  const [nodeData, updateNodeData] = useState();
  const featureLayerRef = useRef();

  const getNodesData = async () => {
    const nodes = await axios.get('/api/smartcontrol/ubic');
    updateNodeData(nodes.data.data);
    //pass some sort of city name.
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
          <LayersControl position='topright'>
            <LayersControl.Overlay name='Smart Controls'>
              <MarkerClusterGroup>
                {nodeData.map((light) => (
                  <Marker
                    key={light.id}
                    position={[light.latitude, light.longitude]}
                    title={light.id}
                  >
                    <Popup>
                      <h4>Street Light</h4> Status: {light.light_status}
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </LayersControl.Overlay>
            {/* <LayersControl.Overlay name='Air Quality'>
              <FeatureLayer
                ref={featureLayerRef}
                url='https://services2.arcgis.com/e69aJifXCNR0AIA9/arcgis/rest/services/Biddeford_ME_20210222_Maintenance/FeatureServer/0'
                // eventHandlers={{
                //   loading: () => console.log('featurelayer loading'),
                //   load: () => {
                //     console.log('featurelayer loaded');
                //     if (featureLayerRef && featureLayerRef.current) {
                //       featureLayerRef.current.metadata((error, data) => {
                //         console.log(
                //           'featurelayer metadata:',
                //           featureLayerRef.current
                //         );
                //       });
                //     }
                //   },
                // }}
              />
            </LayersControl.Overlay> */}

            <LayersControl.Overlay name='Exsisting Lights'>
              <ClusterLayer
                ref={featureLayerRef}
                url='https://services2.arcgis.com/e69aJifXCNR0AIA9/arcgis/rest/services/Biddeford_ME_20210222_InstalledLights/FeatureServer/0'
              />
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
