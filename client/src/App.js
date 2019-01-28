import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

import axios from "axios";

import AppNavbar from "./components/AppNavbar";
import MainMap from "./components/MainMap";
import SmallMap from "./components/SmallMap";
// import AllMap from "./components/AllMap";
// import Form from "./components/Form";
import Locations from "./components/layouts/Locations";

// import uuid from "uuid";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
    state = {
        placeInfo: {
            name: "Ryan",
            type: "Fuck Palace",
            rating: 10,
            comment: "Got laid"
        },
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

    formSubmit = e => {
        // e.preventDefault();
        console.log("dude");
        axios.post("/api/places", {
            name: this.state.placeInfo.name,
            type: this.state.placeInfo.type,
            rating: this.state.placeInfo.rating,
            comment: this.state.placeInfo.comment,
            latitude: this.state.location.lat,
            longitude: this.state.location.lng
        });
        let temp = document.querySelector(".my-form");
        temp.classList.add("hidden");
    };

    // State is updated as input fields
    // spread prevState to update state not override
    // event error manipulating state, destrcuture event
    formChanged = e => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            placeInfo: {
                ...prevState.placeInfo,
                [name]: value
            }
        }));
    };

    render() {
        console.log(`This is the App state: ${this.state.location.lat}`);
        if (this.state.hasLoaded) {
            // console.log(this.state.hasLoaded);
            const { lat, lng } = this.state.location;
            return (
                <div>
                    <BrowserRouter>
                        <div className="container">
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <div className="main-container">
                                            <AppNavbar />
                                            <MainMap
                                                newLat={lat}
                                                newLng={lng}
                                                zoom={this.state.zoom}
                                                passUp={this.passUp}
                                            />

                                            <Form
                                                className="my-form hidden"
                                                action="/"
                                                method="POST"
                                            >
                                                <FormGroup>
                                                    <Label for="placeName">
                                                        Location Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        id="placeName"
                                                        onChange={
                                                            this.formChanged
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="categoryMulti">
                                                        Select Location Type
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        name="type"
                                                        id="categoryMulti"
                                                        multiple
                                                        onChange={
                                                            this.formChanged
                                                        }
                                                    >
                                                        <option>
                                                            Restaurant
                                                        </option>
                                                        <option>Bar</option>
                                                        <option>Sports</option>
                                                        <option>Park</option>
                                                        <option>Other</option>
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="ratingSelect">
                                                        Rating
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        name="rating"
                                                        id="ratingSelect"
                                                        onChange={
                                                            this.formChanged
                                                        }
                                                    >
                                                        <option>5</option>
                                                        <option>4</option>
                                                        <option>3</option>
                                                        <option>2</option>
                                                        <option>1</option>
                                                    </Input>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="reviewText">
                                                        Review Comments
                                                    </Label>
                                                    <Input
                                                        type="textarea"
                                                        name="comment"
                                                        id="reviewText"
                                                        onChange={
                                                            this.formChanged
                                                        }
                                                    />
                                                </FormGroup>
                                                <Button
                                                    type="button"
                                                    onClick={this.formSubmit}
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/checkin"
                                    render={() => (
                                        <div>
                                            <AppNavbar />
                                            <Container>
                                                <Row>
                                                    <Col className="col-8">
                                                        <SmallMap
                                                            newLat={lat}
                                                            newLng={lng}
                                                            locState={
                                                                this.locState
                                                            }
                                                        />
                                                    </Col>
                                                    <Col className="col-4">
                                                        <Form />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/locations"
                                    render={() => (
                                        <div>
                                            <AppNavbar />
                                            <Locations />
                                        </div>
                                    )}
                                />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default App;
