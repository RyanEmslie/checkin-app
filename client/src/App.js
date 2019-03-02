import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import MainMap from "./components/MainMap";
import Locations from "./components/Locations";
import MyForm from "./components/MyForm";

import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

// Submitted from <MyForm />
const formSubmit = frog => {
  axios
    .post("/api/places", {
      name: frog.state.placeInfo.name,
      type: frog.state.placeInfo.type,
      rating: frog.state.placeInfo.rating,
      comment: frog.state.placeInfo.comment,
      latitude: frog.state.location.lat,
      longitude: frog.state.location.lng
    })
    .then(console.log("Posted"));

  document.querySelector("#success-alert").classList.remove("hidden");
  setTimeout(function() {
    document.querySelector(".my-form").classList.add("hidden");
    document.querySelector("#success-alert").classList.add("hidden");
  }, 2500);
  frog.clearForm();
};

const getLocationUpdateApp = self => {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(`Location received from browser`);
      self.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        hasLoaded: true,
        zoom: 18
      });
    },
    async () => {
      try {
        console.log(`Location taken from IP address`);
        const locData = await fetch(`https://ipapi.co/json`).json();
        console.log(locData);
        self.setState({
          location: {
            lat: locData.latitude,
            lng: locData.longitude
          },
          hasLoaded: true,
          zoom: 8
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
};

class App extends Component {
  // initial State with default location
  state = {
    placeInfo: {
      name: "",
      type: "",
      rating: "",
      comment: ""
    },
    location: {
      lat: 40.71155678564452,
      lng: -74.01324570178987
    },
    hasLoaded: false,
    zoom: 6,
    formValididation: {
      name: false,
      type: false,
      rating: false,
      comment: false
    }
  };

  // From GeoLocation API
  // If user declines browser location,
  //their ID will be taken from https://api.ip.sb
  componentDidMount() {
    getLocationUpdateApp(this);
  } // end componentWillMount

  // the parameter is the data being sent up from child
  passUp = e => {
    this.setState({
      location: {
        lat: e.lat,
        lng: e.lng
      }
    });
  };

  checkValidity = ({ Name, Type }) => {
    const { name, type, rating, comment } = this.state.placeInfo;
    let {
      nameVal,
      typeVal,
      ratingVal,
      commentVal
    } = this.state.formValididation;

    // return (
    // 	<div>
    // 	{
    // 		<div>
    // 			<div className={"" + (name.length < 1) ? "input-error" : ""}> <Name/></div>
    // 			<div className={"" + (type.length < 1) ? "input-error" : ""} ><Type/></div>
    // 			<div className={"" + (name.length < 1) ? "input-error" : ""}><Name/></div>
    // 			<div className={"" + (type.length < 1) ? "input-error" : ""} ><Type/></div>
    // 			<div className={"" + (name.length < 1) ? "input-error" : ""}><Name/></div>
    // 		</div>
    // 	}
    // 	</div>
    // )
    if (name.length < 1) {
      console.log("Please enter name");
      document.querySelector("#placeName").classList.add("input-error");
    } else {
      document.querySelector("#placeName").classList.remove("input-error");
      nameVal = true;
    }

    if (type.length < 1) {
      document.querySelector("#categoryMulti").classList.add("input-error");
      console.log("Please enter type");
    } else {
      document.querySelector("#categoryMulti").classList.remove("input-error");
      typeVal = true;
    }

    if (rating === null) {
      console.log("Please leave a rating");
      document.querySelector("#ratingSelect").classList.add("input-error");
    } else {
      document.querySelector("#ratingSelect").classList.remove("input-error");
      ratingVal = true;
    }

    if (comment.length < 1) {
      document.querySelector("#reviewText").classList.add("input-error");
      console.log("Please leave a comment");
    } else {
      document.querySelector("#reviewText").classList.remove("input-error");
      commentVal = true;
    }
    nameVal && typeVal && ratingVal && commentVal
      ? formSubmit(this)
      : console.log("Please review form");

    if (nameVal && typeVal && ratingVal && commentVal) {
      document.querySelector("#my-submit-btn").classList.remove("disabled");
    }
  };

  clearForm = () => {
    this.setState({
      placeInfo: {
        name: "",
        type: "",
        rating: null,
        comment: ""
      },
      formValididation: {
        name: true,
        type: true,
        rating: true,
        comment: true
      }
    });
    document.querySelector("#placeName").value = "";
    document.querySelector("#reviewText").value = "";
    document.querySelector("#ratingSelect").value = null;
    document.querySelector("#categoryMulti").value = "";
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
    if (this.state.hasLoaded) {
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
                      <MyForm
                        formChanged={this.formChanged}
                        formSubmit={this.checkValidity}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/locations"
                  render={() => (
                    <div>
                      <AppNavbar />
                      <Locations newLat={lat} newLng={lng} />
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
