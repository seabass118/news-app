import { Map, Header, NewsPanel } from "./components";
import { useState } from "react";
import "./App.css";



function App() {

    // State to show/hide the news panel
    const [showPanel, setShowPanel] = useState(false);
    const [activeCountry, setActiveCountry] = useState("");
    const [activeCountryCode, setActiveCountryCode] = useState("");
	return (
		<>
            <Header />
            <Map 
                setShowPanel={setShowPanel} 
                setActiveCountry={setActiveCountry}
                setActiveCountryCode={setActiveCountryCode}
            />

            {/* Conditionally show the news panel component based on state */}
            {activeCountry && (
                <NewsPanel
                    activeCountry={activeCountry} 
                    setActiveCountry={setActiveCountry}
                    activeCountryCode={activeCountryCode}
                />
            )}

		</>
	);
}

export default App;
