import React, { Component } from "react";

import { Map, TileLayer, Marker } from "react-leaflet";

import "bootstrap/dist/css/bootstrap.css";
// import "../App.css";

class Locations extends Component {
    state = {
        location: {
            lat: 39.8333333,
            lng: -98.585522
        },
        zoom: 16,
        testData: []
    }; // end state

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.json())
            .then(locData => {
                this.setState({
                    testData: locData
                });
            })
            .catch(err => console.log(err));
    } //didMount

    
    render() {
      if(this.state.testData.length > 1){
        const position = [this.state.location.lat, this.state.location.lng];
        return (
            <div>
                <Map
                    dragging={false}
                    className="map"
                    center={position}
                    zoom={this.state.zoom}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={position} />
                </Map>
            </div>
        )} else{
          return null
        }
    }// end render
}

export default Locations;
