import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

interface GantipasswordStateModeel {
	visible: boolean;
};

interface GantipasswordModel { className:string; }

class Gantipassword extends Component<GantipasswordModel, GantipasswordStateModeel> {
	constructor(props: Readonly<GantipasswordModel>) {
    super(props);

    this.state = {
      visible: false,
    };

    this.onDismiss = this.onDismiss.bind(this);
	this.onSuccess = this.onSuccess.bind(this);
  }
  onSuccess() {
    this.setState({visible: true});
  }

  onDismiss() {
    this.setState({visible: false});
  }



  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                    <Link to="./login">
                      <Button color="primary">Kembali</Button>
                    </Link>
                      <h1 className="text-center">Ganti Password</h1>
                      <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Password behasil diubah
                      </Alert>
					  <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" required />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password Lama" autoComplete="current-password" required />
                      </InputGroup>

					          <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password Baru" autoComplete="current-password" required />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Retype Password Baru" autoComplete="current-password" required />
                      </InputGroup>
                      <Row>

						
                      <Col xs="12">
                        <Button color="success" size="lg" block onClick={this.onSuccess} >Ganti Password</Button>
                      </Col>

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
               </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Gantipassword;