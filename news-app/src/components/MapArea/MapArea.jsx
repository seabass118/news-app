import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./MapArea.css"

const MapArea = () => {
	const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViLWJsYWNrbGV5IiwiYSI6ImNtMHptNmxoazA2cmQybHIzZ3U5dWo4ajUifQ.PHEU4GIboW3ZCi-dG5F9GQ'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <div className="map-wrapper">
      <div id='map-container' ref={mapContainerRef}/>
    </div>
  )
};

export default MapArea;
