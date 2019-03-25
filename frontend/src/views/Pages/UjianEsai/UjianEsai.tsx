import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, CardGroup,  ModalBody, ModalFooter, ModalHeader, Badge, Input, Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';

interface UjianEsaiStateModel { activeTab: number; success:boolean; modal: boolean; }

interface UjianEsaiPropsModel { className: string; }

class UjianEsai extends Component<UjianEsaiPropsModel, UjianEsaiStateModel>
{
	constructor(props:any) 
	{
		super(props);
		this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1,
			success: false,
			modal: false 
    };

    this.modal= this.modal.bind(this);
    this.toggleSubmitUjian = this.toggleSubmitUjian.bind(this);
  }


	public modal() : void
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

  toggle(tab:any) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
                      <Row>
                        <Col xs="12">
                          <TabContent activeTab={this.state.activeTab}>
                            
                            <TabPane tabId={0} >
                              <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 1 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>

                            <TabPane tabId={1}>
                              <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 2 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Demokrasi menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>
                            
                            <TabPane tabId={2}>
                               <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 3 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Demokrasi menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>

                            <TabPane tabId={3}>
                                <FormGroup row>
                                  <Col className="col-sm-3">
                                    <h5>Soal 4 :</h5>
                                  </Col>    
                                  <Col className="col-sm-9 text-right">
                                      <h1 className="text-right"><b>58:44</b></h1>
                                  </Col>
                                  <Col sm="12">
                                    <p>Sebutkan bunyi dari UUD 1945 Pasal 30 ayat 1?</p>
                                  </Col>
                                  <Col sm="12">
                                    <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                  </Col>                      
                              </FormGroup>
                            </TabPane>
                            
                            <TabPane tabId={4}>
                              <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 5 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>
                            

                            <TabPane tabId={5}>
                            <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 6 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>

                            <TabPane tabId={6}>
                              <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 7 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>

                            <TabPane tabId={7}>
                              <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 8 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>

                            <TabPane tabId={8}>
                              <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 9 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>

                            <TabPane tabId={9}>
                              <FormGroup row>
                                <Col className="col-sm-3">
                                  <h5>Soal 10 :</h5>
                                </Col>    
                                <Col className="col-sm-9 text-right">
                                    <h1 className="text-right"><b>58:44</b></h1>
                                </Col>
                                <Col sm="12">
                                  <p>Apa definisi Ideologi Pancasila menurut Aristoteles ?</p>
                                </Col>
                                <Col sm="12">
                                  <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                </Col>                      
                              </FormGroup>
                            </TabPane>
                          </TabContent>
                        </Col>
                            <Col className="col-sm-12 text-center">
                              <p>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} >01</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(1)} action active={this.state.activeTab === 1} >02</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(2)} action active={this.state.activeTab === 2} >03</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(3)} action active={this.state.activeTab === 3} >04</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(4)} action active={this.state.activeTab === 4} >05</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(5)} action active={this.state.activeTab === 5} >06</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(6)} action active={this.state.activeTab === 6} >07</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(7)} action active={this.state.activeTab === 7} >08</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(8)} action active={this.state.activeTab === 8} >09</Button>
                                  <Button size='md' color="default" className=" btn-outline-primary" onClick={() => this.toggle(9)} action active={this.state.activeTab === 9} >10</Button>
                                </p>  
                              </Col>

                              <Col className="col-sm-12 text-right">
                              
                                <Button  color="success"  onClick={this.toggleSubmitUjian} >Submit Ujian</Button>
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
              
                      </Row>
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

export default UjianEsai;