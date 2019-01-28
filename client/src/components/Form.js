import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class Example extends React.Component {
    submit = () => {
        alert("Form Submitted");
    };

    render() {
        return (
            <Form className="myForm">
                <FormGroup>
                    <Label for="placeName">Location Name</Label>
                    <Input type="text" name="name" id="placeName" />
                </FormGroup>
                <FormGroup>
                    <Label for="categoryMulti">Select Location Type</Label>
                    <Input
                        type="select"
                        name="selectMulti"
                        id="categoryMulti"
                        multiple
                    >
                        <option>Restaurant</option>
                        <option>Bar</option>
                        <option>Sports</option>
                        <option>Park</option>
                        <option>Other</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="ratingSelect">Rating</Label>
                    <Input type="select" name="select" id="ratingSelect">
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="reviewText">Review Comments</Label>
                    <Input type="textarea" name="text" id="reviewText" />
                </FormGroup>
                <Button href="/locations">Submit</Button>
            </Form>
        );
    }
}
