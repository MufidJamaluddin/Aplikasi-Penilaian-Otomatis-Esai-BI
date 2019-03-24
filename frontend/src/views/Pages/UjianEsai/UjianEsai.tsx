import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup,Modal,ModalHeader,ModalBody,ModalFooter,  Card, CardBody, CardHeader, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

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
                            <dd className="col-sm-12 text-left"><b>Pendidikan Kewarganegaraan - Ideologi Pancasila</b></dd>

                    </CardHeader>
                        
                    <CardBody>
                        <Form action="" method="" className="form-horizontal">
                            
                            <FormGroup row>
                                <Col sm="12">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                    <h5 className="text-center">SOAL <b>5</b></h5>
                                    <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                    <p><Input type="textarea"  rows="5" placeholder="Input Jawaban" autofocus /></p>
                            
                                    <Col className="col-sm-12 text-center">
                                    <p>
                                        <Button size='md' color="success">01</Button>
                                        <Button size='md' color="success">02</Button>
                                        <Button size='md' color="success">03</Button>
                                        <Button size='md' color="success">04</Button>
                                        <Button size='md' color="primary">05</Button>
                                        <Button size='md' color="danger">06</Button>
                                        <Button size='md' color="danger">07</Button>
                                        <Button size='md' color="danger">08</Button>
                                        <Button size='md' color="danger">09</Button>
                                        <Button size='md' color="danger">10</Button>
                                    </p>
                                    
                                </Col>	

                                    <Col className="col-sm-12 text-right">
                                        <Button className="text-right" color="success" onClick={this.toggleSubmitUjian}>Submit Ujian</Button>
                                    </Col>
                                        <Modal isOpen={this.state.success} toggle={this.toggleSubmitUjian} className={'modal-success ' + this.props.className}>
                                        <ModalHeader toggle={this.toggleSubmitUjian}>Submit Ujian</ModalHeader>
                                        <ModalBody>
                                        
                                                        <p>Apakah anda yakin ingin menyelesaikan ujian ini ?</p>
                                                        <p>Sebelum submit ujian kami sarankan check kembali jawaban anda </p>			  
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.toggleSubmitUjian}>Tidak</Button>
                                            <Link to="./bukanujian"><Button color="success" onClick={this.toggleSubmitUjian}>Ya</Button></Link>
                                        </ModalFooter>
                                        </Modal>
                                </Col>
                                
                            </FormGroup>
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