import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

interface BukanUjianStateModel { success:boolean; modal: boolean; }

interface BukanUjianPropsModel { className: string; }

class BukanUjian extends Component<BukanUjianPropsModel, BukanUjianStateModel>
{
	constructor(props:any) 
	{
		super(props);
		
    this.state = {
			success: false,
			modal: false 
    };

    this.toggle = this.toggle.bind(this);
    this.toggleSubmitUjian = this.toggleSubmitUjian.bind(this);
  }


	public toggle() : void
	{
    this.setState({
      modal: !this.state.modal,
    });
  }
  
	public toggleSubmitUjian() : void 
	{
    this.setState({
      success: !this.state.success,
    });
  }

	public render() : JSX.Element
	{
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
								
								<CardHeader>
                      <dd className="col-sm-12 text-left"><b>161511019</b></dd>
                      <dd className="col-sm-12 text-left"><b>Mufid Jamaluddin</b></dd>
                      <dd className="col-sm-12 text-left"><b>XII-IPA</b></dd>
              	</CardHeader>
                
								<CardBody className="col-sm-12 text-center">
                    <Form>
                      <h1>UJIAN BELUM DIMULAI</h1>
                      <Row>
                        <Col xs="12">
						            <Link to="./login">
                          <Button color="primary">Logout</Button>
                        </Link> 
                        <Link to="./gantipassword">
                          <Button color="primary">Ganti Password</Button>
						            </Link>   
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

export default BukanUjian;