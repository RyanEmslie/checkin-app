import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// import FormModal from "./FormModal";
// import Form from "./Form";

import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

class MainMap extends Component {
    // Component initial state to setup map
    state = {
        location: {
            lat: this.props.newLat,
            lng: this.props.newLng
        },
        zoom: 8,
        hasLocation: false
    }; // end state

    addMarker = e => {
        this.setState({
            location: { lat: e.latlng.lat, lng: e.latlng.lng }
        });
        //Passes Lat and Long up to App state
        this.props.passUp(this.state.location);
    };

    showForm = () => {
        let temp = document.querySelector(".my-form");
        temp.classList.remove("hidden");
    };

    render() {
        const position = [this.state.location.lat, this.state.location.lng];

        return (
            <div>
                <Map
                    className="map"
                    center={position}
                    zoom={this.props.zoom}
                    onClick={this.addMarker}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={position}>
                        <Popup>
                            <button onClick={this.showForm}>
                                Enter Location
                            </button>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    } // end render
} // end MainMap class

export default MainMap;
