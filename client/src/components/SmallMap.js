import React, { Component } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";

import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

class MainMap extends Component {
    // Component initial state to setup map
    state = {
        location: {
            lat: this.props.newLat,
            lng: this.props.newLng
        },
        zoom: 16
        // hasLocation: false
    }; // end state

    render() {
        const position = [this.state.location.lat, this.state.location.lng];

        return (
            <Map
                dragging={false}
                className="map-small"
                center={position}
                zoom={this.state.zoom}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} />
            </Map>
        );
    } // end render
} // end MainMap class

export default MainMap;
