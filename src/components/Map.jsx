import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {

    const mapRef = useRef();
	const mapContainerRef = useRef();

	useEffect(() => {
		mapboxgl.accessToken =
			"pk.eyJ1Ijoic2ViLWJsYWNrbGV5IiwiYSI6ImNtMHptZTZsajA2ZWMybHNjZXBicHUyZmsifQ.IE-v0h0e-BAN9B1S8hHyMw";
		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
		});

		return () => {
			mapRef.current.remove();
		};
	}, []);

	return (
		<>
			<div id="map-container" ref={mapContainerRef} />
		</>
	);

  
}

export default Map