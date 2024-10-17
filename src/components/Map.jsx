import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ setShowPanel, setActiveCountry }) => {
	const [coords, setCoords] = useState({});
	const [country, setCountry] = useState("");

	const mapRef = useRef();
	const mapContainerRef = useRef();

	const reverseGeo = async (object) => {
		axios
			.get(
				`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${object.lng}&latitude=${object.lat}.json?types=place&access_token=pk.eyJ1Ijoic2ViLWJsYWNrbGV5IiwiYSI6ImNtMHptZTZsajA2ZWMybHNjZXBicHUyZmsifQ.IE-v0h0e-BAN9B1S8hHyMw`
			)
			.then(function (response) {
				// handle success
				if (response.data.features.length) {
                    setShowPanel(true);
					setActiveCountry(
						response.data.features[0].properties.context.country
							.name
					);
				}
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
			});
	};

	useEffect(() => {
		mapboxgl.accessToken =
			"pk.eyJ1Ijoic2ViLWJsYWNrbGV5IiwiYSI6ImNtMHptZTZsajA2ZWMybHNjZXBicHUyZmsifQ.IE-v0h0e-BAN9B1S8hHyMw";
		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
            style: "mapbox://styles/seb-blackley/cm2c44bds00o101pialjl4ok6"
		});

		mapRef.current.on("click", (e) => {
			setCoords(e.lngLat);
			reverseGeo(e.lngLat);
		});

		return () => {
			mapRef.current.remove();
		};
	}, []);

	return (
		<>
			<div id="map-container" ref={mapContainerRef}>
				{/* <div className="relative text-2xl text-white z-10">
					lat: {coords.lat}
				</div>
				<div className="relative text-2xl text-white z-10">
					long: {coords.lat}
				</div>
				<div className="relative z-10 text-red-400 text-3xl">
					clicked country: {country}
				</div> */}
			</div>
		</>
	);
};

export default Map;
