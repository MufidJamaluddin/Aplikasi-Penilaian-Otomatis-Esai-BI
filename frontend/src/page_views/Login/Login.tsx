import React, { PureComponent } from 'react';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

interface LoginAttribute { pesan?:string; onLoginSubmit:any; }

class Login extends PureComponent<LoginAttribute> 
{
  renderPesan()
  {
    if(this.props.pesan)
      return (<Alert color='danger' isOpen={true}>{this.props.pesan}</Alert>)
  }

  render() 
  {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    
                    { this.renderPesan() }

                    <Form onSubmit={this.props.onLoginSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Penilaian Otomatis Ujian Esai Berbahasa Indonesia</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name="username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit">Masuk</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Penilaian Otomatis Ujian Esai Berbahasa Indonesia</h2>
                      <p>Aplikasi untuk mengadakan ujian esai berbahasa indonesia dengan penilaian Jawaban Esai secara Otomatis menggunakan Teknologi Kecerdasan Buatan. Aplikasi akan mempelajari esai yang telah dinilai guru sebagai rujukan penilaian.</p>
                      
                    </div>
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

export default Login;
