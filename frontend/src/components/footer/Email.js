import React from 'react'
import {
 
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import { SMTPCLinkent } from "emailjs";

// const cLinkent = new SMTPCLinkent({
//   user: "user",
//   password: "password",
//   host: "smtp.your-email.com",
//   ssl: true,
// });

// try {
//   const message = await cLinkent.sendAsync({
//     text: "i hope this works",
//     from: "you <username@your-email.com>",
//     to: "someone <someone@your-email.com>, another <another@your-email.com>",
//     cc: "else <else@your-email.com>",
//     subject: "testing emailjs",
//   });
//   console.log(message);
// } catch (err) {
//   console.error(err);
// }

export default function Email(props) {
  return (
    <div id="contact">
      <Container className="container">
        <Card className="my-2 p-3 rounded">
          <Row>
            <Col className="col-md-8">
              <Row className="row">
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </p>
                </div>
                <form
                  name="sentMessage"
                  /* onSubmit={handleSubmit}*/
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          required
                          /*onChange={handleChange}*/
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required
                          /*onChange={handleChange}*/
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                      /* onChange={handleChange}*/
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </Row>
            </Col>
            <Col className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker"></i> Address
                  </span>
                  {props.data ? props.data.address : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  {props.data ? props.data.phone : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                  {props.data ? props.data.email : "loading"}
                </p>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
