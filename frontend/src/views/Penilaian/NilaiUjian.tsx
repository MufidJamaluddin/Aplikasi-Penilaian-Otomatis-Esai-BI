import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, CardGroup, Label, ModalBody, ModalFooter, ModalHeader, Badge, Input, Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';

interface NilaiUjianStateModel { activeTab: number;}

interface NilaiUjianPropsModel { className: string; }

class NilaiUjian extends Component<NilaiUjianPropsModel, NilaiUjianStateModel>
{
	constructor(props:any) 
	{
		super(props);
		this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
        };
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
            <Col md="12">
              <CardGroup>
                <Card className="p-4">
                    <CardHeader>
                        <h5 className="text-center">NILAI UJIAN</h5>
                    </CardHeader>
                        
                    <CardBody>
                      <Row>
                        <Col xs="12">
                          <TabContent activeTab={this.state.activeTab}>
                            
                            <TabPane tabId={0} >
                              <FormGroup row>
                                <Col className="col-sm-6">
                                    <h5>Langkah 1: Penilaian Ujian Manual</h5>
                                </Col>     
                                <Col sm="12">
                                  <p>1. Download sebagian jawaban esai siswa <b>(File Download berformat .csv)</b></p>
                                  <p>2. Lakukan penilaian secara manual untuk dijadikan data latih dengan mengisi kolom nilai yang tersedia</p>
                                  <Col className="col-sm-12 text-center">
                                    <Button className="btn btn-lg btn-success">DOWNLOAD JAWABAN ESAI</Button>
                                  </Col>
                                </Col>
                              </FormGroup>
                              <Col className="col-sm-12 text-right">
                              <Link to="./penilaian">
                                <Button  color="primary">Kembali</Button>
                               </Link>
                                <Button  color="success" onClick={() => this.toggle(1)} action active={this.state.activeTab === 1}>Selanjutanya</Button>
                              </Col>
                              
                            </TabPane>

                            <TabPane tabId={1}>
                              <FormGroup row>
                                <Col className="col-sm-6">
                                    <h5>LANGKAH 2: Penilaian Ujian Otomatis</h5>
                                </Col>  
                                <Col sm="12">
                                  <p>1. Upload <b>File Jawaban Esai Siswa</b> yang telah dinilai sebagian secara manual </p>
                                  <Input type="file"  required></Input>
                                 </Col>
                                 <Col className="col-sm-12 text-right">
                                    <Button  color="primary" onClick={() => this.toggle(0)}>Kembali</Button>
                                    <Button  color="success" onClick={() => this.toggle(2)} action active={this.state.activeTab === 1}>Selanjutanya</Button>
                                 </Col>
                              </FormGroup>
                              
                            </TabPane>
                            
                            <TabPane tabId={2}>
                               <FormGroup row>
                                <Col sm="6">
                                  <h5>LANGKAH 3: Penilaian Ujian Otomatis</h5>
                                </Col>
                                <Col className="col-sm-12 text-center">
                                    <Button type="submit" className="btn btn-lg btn-success">LAKUKAN PENILAIAN OTOMATIS</Button>
                                </Col>
                                <Col className="col-sm-12 text-right">
                                    <Button  color="primary" onClick={() => this.toggle(1)}>Kembali</Button>
                                </Col>
                              
                                                      
                              </FormGroup>
                              
                            </TabPane>

                            <TabPane tabId={3}>
                                <FormGroup row>
                                  <Col className="col-sm-3">
                                    <h5>Soal 4 :</h5>
                                  </Col>    
                                  <Col sm="12">
                                    <p>Sebutkan bunyi dari UUD 1945 Pasal 30 ayat 1?</p>
                                  </Col>
                                  <Col sm="12">
                                    <Input type="textarea"  rows="5" placeholder="Input Jawaban" required/> 
                                  </Col>                      
                              </FormGroup>
                            </TabPane>
                          </TabContent>
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

export default NilaiUjian;