import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface SpaceMapProps {
  latitude: number;
  longitude: number;
  spaceName: string;
  address?: string;
  height?: string;
}

const SpaceMap = ({ 
  latitude, 
  longitude, 
  spaceName, 
  address,
  height = '240px' 
}: SpaceMapProps) => {
  // Agregar clase al contenedor del mapa para theming
  useEffect(() => {
    const mapContainers = document.querySelectorAll('.leaflet-container');
    mapContainers.forEach(container => {
      container.classList.add('themed-map');
    });
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height, width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={true}
        className="themed-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">{spaceName}</p>
              {address && (
                <p className="text-muted-foreground text-xs">{address}</p>
              )}
              <p className="text-muted-foreground text-xs mt-1">
                {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SpaceMap;
