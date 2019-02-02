import React, { Component } from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

export class MyForm extends Component {
	render() {
		return (
			<Form className="my-form hidden" action="/" method="POST">
				<FormGroup>
					<Label for="placeName">Location Name</Label>
					<Input
						required={true}
						type="text"
						name="name"
						id="placeName"
						onChange={this.props.formChanged}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="categoryMulti">Select Location Type</Label>
					<Input
						type="select"
						name="type"
						id="categoryMulti"
						onChange={this.props.formChanged}
					>
						<option selected disabled>
							Locations category
						</option>
						<option>Restaurant</option>
						<option>Bar</option>
						<option>Sports</option>
						<option>Park</option>
						<option>Other</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label for="ratingSelect">Rating</Label>
					<Input
						type="select"
						name="rating"
						id="ratingSelect"
						onChange={this.props.formChanged}
					>
						<option selected disabled>
							Select location rating
						</option>
						<option>5</option>
						<option>4</option>
						<option>3</option>
						<option>2</option>
						<option>1</option>
					</Input>
				</FormGroup>

				<FormGroup>
					<Label for="reviewText">Review Comments</Label>
					<Input
						type="textarea"
						name="comment"
						id="reviewText"
						onChange={this.props.formChanged}
					/>
				</FormGroup>
				<Button
					type="button"
					onClick={this.props.formSubmit}
					id="my-submit-btn"
					className="disabled"
				>
					Submit
				</Button>
				<Alert id="success-alert" color="success" className="hidden">
					Location Saved!
				</Alert>
			</Form>
		);
	}
}

export default MyForm;
