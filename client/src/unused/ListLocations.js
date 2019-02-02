import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

// import data from "../testData";

export default class Example extends Component {
    state = {
        location: {
            lat: 3,
            lng: 4
        },
        testData: []
    };

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

    setLocation = e => {
        let newLat = parseInt(e.target.getAttribute("lat"));
        let newLng = parseInt(e.target.getAttribute("lng"));
        this.setState = {
            location: {
                lat: newLat,
                lng: newLng
            }
        };
        this.props.locUp(this.state.location);
    };

    render() {
        if (this.state.testData.length > 0) {
            let locations = [];
            for (let i = 0; i < this.state.testData.length; i++) {
                locations.push({
                    id: this.state.testData[i].id,
                    name: this.state.testData[i].name,
                    lat: this.state.testData[i].address.geo.lat,
                    lng: this.state.testData[i].address.geo.lng
                });
            } //for
            let locLists = [];
            locLists = locations.map(locItem => (
                <ListGroupItem
                    type="button"
                    key={locItem.id}
                    lat={locItem.lat}
                    lng={locItem.lng}
                    onClick={this.setLocation}
                >
                    {locItem.name}
                </ListGroupItem>
            ));

            return (
                <div>
                    <ListGroup>{locLists}</ListGroup>
                </div>
            );
        } else {
            return null;
        }
    }
}
