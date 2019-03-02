import React, { Component } from "react";

import { ListGroup, ListGroupItem, Row, Col, Button } from "reactstrap";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "bootstrap/dist/css/bootstrap.css";
// import axios from "axios";

class Locations extends Component {
  state = {
    location: {
      lat: this.props.newLat,
      lng: this.props.newLng
    },
    zoom: 6,
    savedLocations: [],
    hasLoaded: false
  }; // end state

  componentDidMount() {
    this.getItems();
  } //didMount

  // getts saved locations from api and enters them into component state
  getItems = async () => {
    try {
      let res = await fetch("/api/places");
      let savedLocations = await res.json();
      this.setState({ savedLocations, hasLoaded: true });
    } catch (err) {
      console.log(err);
    }
  };

  // deletes items from locations list
  // deleteItem = e => {
  // 	const delID = e.target.getAttribute("id");
  // 	let tempState = this.state.savedLocations;
  // 	axios.delete(`api/places/${delID}`).then(res => {
  // 		const filtered = tempState.filter(datum => datum._id !== delID);
  // 		this.setState({ savedLocations: filtered });
  // 	});
  // };

  // gets attribute of clicked list item and sets component state to latlong
  // centers map on clicked location
  moveTo = e => {
    const newLat = parseFloat(e.target.getAttribute("lat"));
    const newLng = parseFloat(e.target.getAttribute("lng"));
    this.setState({
      location: {
        lat: newLat,
        lng: newLng
      },
      zoom: 14
    });
  };

  renderList = () => {
    let locItemsList = this.state.savedLocations;
    let locItems = locItemsList.map(locItem => (
      <div key={locItem._id}>
        <ListGroupItem
          className="location-lists"
          type="buton"
          name={locItem.name}
          lat={locItem.latitude}
          lng={locItem.longitude}
          onClick={this.moveTo}>
          {locItem.name}
        </ListGroupItem>
      </div>
    ));
    return locItems;
  }; // renderList

  renderMarker = () => {
    let locItemsList = this.state.savedLocations;
    let markerItems = locItemsList.map(markerItem => (
      <Marker
        key={markerItem._id}
        position={[markerItem.latitude, markerItem.longitude]}>
        <Popup>
          Name: {markerItem.name}
          {"\n"}
          Category: {markerItem.type}
          {"\n"}
          Rating: {markerItem.rating}
          {"\n"}
          Comments: {markerItem.comment}
          {"\n"}
          {"\n"}
          {"\n"}
          <Button
            color="danger"
            key={markerItem.date}
            id={markerItem._id}
            className="remove-btn location-lists"
            onClick={this.deleteItem}>
            Delete/Turn Off
          </Button>
        </Popup>
      </Marker>
    ));
    return markerItems;
  };
  //*
  /////////RENDER ////////
  //*
  render() {
    console.log(this.state.savedLocations);
    if (this.state.hasLoaded === true) {
      const position = [this.state.location.lat, this.state.location.lng];
      return (
        <div>
          <Row>
            <Col className={"col-9"}>
              {" "}
              <Map
                dragging={false}
                className="map"
                center={position}
                zoom={this.state.zoom}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {this.renderMarker()}
              </Map>
            </Col>
            <Col>
              <ListGroup>{this.renderList()}</ListGroup>
            </Col>
          </Row>
        </div>
      );
    } else {
      return null;
    }
  } // end render
}

export default Locations;
