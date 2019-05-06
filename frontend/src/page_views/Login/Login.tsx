import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import API from '../../models/api';

interface LoginState { role:string, pesan?:string }

class Login extends PureComponent<{}, LoginState> 
{
  constructor(props:any)
  {
    super(props);

    this.state = {role:''};
    
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event:any)
  {
    event.preventDefault();

    var fdata = new FormData(event.target);
    var data = {
      username: fdata.get('username'),
      password: fdata.get('password')
    };

    API<LoginState>('api/auth',{ 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then((response)=>{
      console.log(response);
      if(response.pesan)
      {
        this.setState({role: response.role, pesan: response.pesan });
      }
      else
      {
        window.location.reload;
      }
    });
  }

  renderPesan()
  {
    if(this.state.pesan)
      return (<Alert color='danger' isOpen={true}>{this.state.pesan}</Alert>)
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

                    <Form onSubmit={this.onSubmit}>
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
