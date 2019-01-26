import React, { Component } from "react";

import AppNavbar from "./components/AppNavbar";
import MainMap from "./components/MainMap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
    state = {
        location: {
            lat: 39.8333333,
            lng: -98.585522
        },
        hasLoaded: false,
        zoom: 6
    };

    // From GeoLocation API
    // If user declines browser location,
    //their ID will be taken from https://api.ip.sb
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(`Location received from browser`);
                this.setState({
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    hasLoaded: true,
                    zoom: 18
                });
            },
            () => {
                console.log(`Location taken from IP address`);
                fetch(`https://ipapi.co/json`)
                    .then(res => res.json())
                    .then(locData => {
                        console.log(locData);
                        this.setState({
                            location: {
                                lat: locData.latitude,
                                lng: locData.longitude
                            },
                            hasLoaded: true,
                            zoom: 8
                        });
                    })
                    .catch(err => console.log(err));
            }
        );
    } // end componentWillMount

    // the parameter is the data being sent up from child
    passUp = e => {
        console.log(e);
        this.setState({
            location: {
                lat: e.lat,
                lng: e.lng
            }
        });
    };

    render() {
        console.log(`This is the App state: ${this.state.location.lat}`);
        if (this.state.hasLoaded) {
            // console.log(this.state.hasLoaded);
            const { lat, lng } = this.state.location;
            return (
                <div>
                    <AppNavbar />
                    <MainMap
                        newLat={lat}
                        newLng={lng}
                        zoom={this.state.zoom}
                        passUp={this.passUp}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
}

export default App;
