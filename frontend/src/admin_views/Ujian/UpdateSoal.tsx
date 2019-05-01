import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader, Badge, Input, Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';


interface UpdateSoalStateModel { activeTab: number; modal:boolean; success:boolean; danger:boolean }

interface UpdateSoalPropsModel { className?: string; }

class UpdateSoal extends Component<UpdateSoalPropsModel, UpdateSoalStateModel>
{
  constructor(props: Readonly<UpdateSoalPropsModel>) 
  {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1,
      modal: false,
      danger: false,
      success: false,
	
    };
    this.modal = this.modal.bind(this);
    this.toggleSubmitSoal = this.toggleSubmitSoal.bind(this);
    this.toggleBatalUjian = this.toggleBatalUjian.bind(this);
  }
  public modal() : void 
	{
    this.setState({
      modal: !this.state.modal,
    });
  }
 
 	public toggleSubmitSoal() : void 
 	{
    this.setState({
      success: !this.state.success,
    });
  }
  
 	public toggleBatalUjian() : void
 	{
    this.setState({
      danger: !this.state.danger,
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
      <div className="animated fadeIn">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" lg="12">

            <Card>
              <CardHeader>
                <h4 className="text-center">UPDATE SOAL UJIAN</h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <TabContent activeTab={this.state.activeTab}>
                      
                    <TabPane tabId={0}>
                    <FormGroup row>
                      <Col className="col-sm-2">
                        <h5>No. Soal: 1 </h5>
                      </Col>    
                      <Col className="col-sm-2 text-right">
                        <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                      </Col>
                      <Col className="col-sm-2 text-right">
                        <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                      </Col>
                      <Col className="col-sm-6 text-right">
                      <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                    </Col>
                    <Col className="col-sm-12 text-right">
                      <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                    </Col>
                      <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                    </FormGroup>
                  </TabPane>
                  
                      <TabPane tabId={1}>
                        <FormGroup row>
                          <Col className="col-sm-2">
                            <h5>No. Soal: 2 </h5>
                          </Col>    
                          <Col className="col-sm-2 text-right">
                            <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                          </Col>
                          <Col className="col-sm-2 text-right">
                            <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                          </Col>
                          <Col className="col-sm-6 text-right">
                          <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                        </Col>
                        <Col className="col-sm-12 text-right">
                          <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                        </Col>
                          <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                        </FormGroup>
                      </TabPane>
                      
                      <TabPane tabId={2}>
                        <FormGroup row>
                          <Col className="col-sm-2">
                            <h5>No. Soal: 3 </h5>
                          </Col>    
                          <Col className="col-sm-2 text-right">
                            <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                          </Col>
                          <Col className="col-sm-2 text-right">
                            <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                          </Col>
                          <Col className="col-sm-6 text-right">
                          <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                        </Col>
                        <Col className="col-sm-12 text-right">
                          <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                        </Col>
                          <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                        </FormGroup>
                      </TabPane>

                      <TabPane tabId={3}>
                        <FormGroup row>
                          <Col className="col-sm-2">
                            <h5>No. Soal: 4 </h5>
                          </Col>    
                          <Col className="col-sm-2 text-right">
                            <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                          </Col>
                          <Col className="col-sm-2 text-right">
                            <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                          </Col>
                          <Col className="col-sm-6 text-right">
                          <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                        </Col>
                        <Col className="col-sm-12 text-right">
                          <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                        </Col>
                          <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                        </FormGroup>
                      </TabPane>
                      
                      <TabPane tabId={4}>
                      <FormGroup row>
                        <Col className="col-sm-2">
                          <h5>No. Soal: 5 </h5>
                        </Col>    
                        <Col className="col-sm-2 text-right">
                          <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                        </Col>
                        <Col className="col-sm-2 text-right">
                          <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                        </Col>
                        <Col className="col-sm-6 text-right">
                        <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                      </Col>
                      <Col className="col-sm-12 text-right">
                        <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                      </Col>
                        <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                      </FormGroup>
                    </TabPane>
                   
                    <TabPane tabId={5}>
                    <FormGroup row>
                      <Col className="col-sm-2">
                        <h5>No. Soal: 6 </h5>
                      </Col>    
                      <Col className="col-sm-2 text-right">
                        <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                      </Col>
                      <Col className="col-sm-2 text-right">
                        <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                      </Col>
                      <Col className="col-sm-6 text-right">
                      <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                    </Col>
                    <Col className="col-sm-12 text-right">
                      <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                    </Col>
                      <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                    </FormGroup>
                  </TabPane>

                  <TabPane tabId={6}>
                  <FormGroup row>
                    <Col className="col-sm-2">
                      <h5>No. Soal: 7</h5>
                    </Col>    
                    <Col className="col-sm-2 text-right">
                      <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                    </Col>
                    <Col className="col-sm-2 text-right">
                      <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                    </Col>
                    <Col className="col-sm-6 text-right">
                    <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                  </Col>
                  <Col className="col-sm-12 text-right">
                    <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                  </Col>
                    <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                  </FormGroup>
                </TabPane>

                <TabPane tabId={7}>
                <FormGroup row>
                  <Col className="col-sm-2">
                    <h5>No. Soal: 8</h5>
                  </Col>    
                  <Col className="col-sm-2 text-right">
                    <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                  </Col>
                  <Col className="col-sm-2 text-right">
                    <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                  </Col>
                  <Col className="col-sm-6 text-right">
                  <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
                </Col>
                <Col className="col-sm-12 text-right">
                  <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
                </Col>
                  <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
                </FormGroup>
              </TabPane>

              <TabPane tabId={8}>
              <FormGroup row>
                <Col className="col-sm-2">
                  <h5>No. Soal: 9</h5>
                </Col>    
                <Col className="col-sm-2 text-right">
                  <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
                </Col>
                <Col className="col-sm-2 text-right">
                  <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
                </Col>
                <Col className="col-sm-6 text-right">
                <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
              </Col>
              <Col className="col-sm-12 text-right">
                <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
              </Col>
                <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
              </FormGroup>
            </TabPane>

            
            <TabPane tabId={9}>
            <FormGroup row>
              <Col className="col-sm-2">
                <h5>No. Soal: 10</h5>
              </Col>    
              <Col className="col-sm-2 text-right">
                <p><Input bsSize="sm" type="number" placeholder="Minimum Skor" required /></p>
              </Col>
              <Col className="col-sm-2 text-right">
                <p><Input bsSize="sm" type="number" placeholder="Maksimum Skor" required/></p>
              </Col>
              <Col className="col-sm-6 text-right">
              <p><Input bsSize="sm" type="text" placeholder="Materi Pokok" required /></p>
            </Col>
            <Col className="col-sm-12 text-right">
              <p><Input bsSize="sm" type="text" placeholder="Kompetensi Dasar" required /></p>
            </Col>
              <Input type="textarea"  rows="5" placeholder="Input Soal" required/>                       
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
                        
                        <Button  color="primary"  onClick={this.toggleBatalUjian} >Kembali</Button>
                          <Modal isOpen={this.state.danger} toggle={this.toggleBatalUjian} className={'modal-danger ' + this.props.className}>
                            <ModalHeader toggle={this.toggleBatalUjian}>Batal Input Soal</ModalHeader>
                              <ModalBody>
                                <p> Apakah anda yakin ingin membatalkan update soal ? <b>jika tekan "YA", maka semua soal yang anda inputkan sebelumnya tidak akan disimpan</b> dari data guru ?</p>
                              </ModalBody>
                            <ModalFooter>
                              <Button color="danger" onClick={this.toggleBatalUjian}>Tidak</Button>
                              <Link to="./updateujian">
                                <Button color="success" onClick={this.toggleBatalUjian}>Ya</Button>
                              </Link>
                            </ModalFooter>
                          </Modal>
                        
                          <Button  color="success"  onClick={this.toggleSubmitSoal} >Submit Ujian</Button>
                          <Modal isOpen={this.state.success} toggle={this.toggleSubmitSoal} className={'modal-success ' + this.props.className}>
                            <ModalHeader toggle={this.toggleSubmitSoal}>Submit Ujian</ModalHeader>
                              <ModalBody>
                                <p> Apakah anda yakin ingin submit soal ? <b>Pastikan soal yang anda submit telah diinput dengan benar</b></p>
                              </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.toggleSubmitSoal}>Tidak</Button>
                                <Link to="./ujian">
                                  <Button color="success" onClick={this.toggleSubmitSoal}>Ya</Button>
                                </Link>
                            </ModalFooter>
                          </Modal>
                        </Col>
      	
                </Row>
              </CardBody>
            </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UpdateSoal;