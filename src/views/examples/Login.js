import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  NavLink,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleSuccess = (response) => {
    console.log("Google login successful!", response);
    
  };

  const handleFailure = (error) => {
    console.error("Google login failed", error);
  };

  return (
    <GoogleOAuthProvider clientId="674922687302-p29d84haa39vo7noht7t1rgbvjph97gt.apps.googleusercontent.com">
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="customCheckLogin">
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <NavLink className="nav-link-icon" to="/admin/home" tag={Link}>
                  <Button className="mt-4" color="primary" type="button">
                    Login
                  </Button>
                </NavLink>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </GoogleOAuthProvider>
  );
};

export default Login;
