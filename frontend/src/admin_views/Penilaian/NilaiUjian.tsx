import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Table, CardGroup,Progress, CardFooter, Label, ModalBody, ModalFooter, ModalHeader, Badge, Input, Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';

interface NilaiUjianStateModel { activeTab: number; primary:boolean; info:boolean; modal: boolean;}

interface NilaiUjianPropsModel { className: string; }

class NilaiUjian extends Component<NilaiUjianPropsModel, NilaiUjianStateModel>
{
  constructor(props:any) 
	{
		super(props);
		this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      primary: false,
      info:false,
			modal: false 
    };

    this.modal= this.modal.bind(this);
    this.toggleSubmitNilaiManual = this.toggleSubmitNilaiManual.bind(this);
    this.toggleNilaiManual = this.toggleNilaiManual.bind(this);
  }


	public modal() : void
	{
    this.setState({
      modal: !this.state.modal,
    });
  }
  
	public toggleSubmitNilaiManual() : void 
	{
    this.setState({
      primary: !this.state.primary,
    });
  }

  public toggleNilaiManual() : void 
	{
    this.setState({
      info: !this.state.info,
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
            <Col md="12">
              <CardGroup>
                <Card className="p-4">

                 
                    <CardBody>
                      <Row>
                        <Col xs="12">
                          <TabContent activeTab={this.state.activeTab}>
                            
                            <TabPane tabId={0} >
                            <CardHeader>
                              <FormGroup row>
                                <Col className="sm-6">
                                <dt className="col-sm-6 text-truncate"><h4>PENILAIAN UJIAN</h4></dt>
                                <dd className="col-sm-6"><h4>MANUAL</h4></dd>
                                </Col>  
        
                                <Col className="sm-6">
                                <dt className="col-sm-12 text-left">No Test : 1</dt>
                                <dt className="col-sm-12 text-left">Nama Ujian : Pendidikan Kewarganegaraan</dt>
                                <dt className="col-sm-12 text-left">Mata Pelajaran : PKN</dt>
                                
                                </Col>
                            </FormGroup>     
                          </CardHeader>
                                <Col className="col-sm-12">
                                    <p>*Lakukan penilaian secara manual <b>minimal 50% jawaban</b> dari seluruh jawaban siswa agar akurasi penilaian otomatis lebih akurat</p>
                                </Col>     
                                
                                <Col sm="12">
                                <Table responsive size="sm">
                    
                                    <thead>
                                      <tr>
                                        <th>Nama Kelas</th>
                                        <th>Jumlah siswa yang mengikuti ujian</th>
                                        <th>Status Penilaian Manual</th>
                                      </tr>
                                    </thead>
                                    
                                    <tbody>
                                      <tr>
                                        <td>XII-IPA 1</td>
                                        <td>40</td>
                                        <td><span className="badge badge-success">Sudah dinilai manual</span></td>
                                      </tr>
                                      
                                      <tr>
                                        <td>XII-IPA 2</td>
                                        <td>45</td>
                                        <td><span className="badge badge-danger">Belum ujian</span></td>
                                      </tr>

                                      <tr>
                                        <td>XII-IPA 3</td>
                                        <td>35</td>
                                        <td><Button className="btn-twitter btn-brand icon btn-sm" onClick={this.toggleNilaiManual} >Nilai Ujian</Button></td>
                                            <Modal isOpen={this.state.info} toggle={this.toggleNilaiManual} className={'modal-info ' + this.props.className}>
                                              <ModalHeader toggle={this.toggleNilaiManual}>Akhiri Penilaian Manual</ModalHeader>
                                                <ModalBody>
                                                  <p>1. Download jawaban esai siswa di kelas XII-IPA 3</p>
                                                  <p>2. Lakukan penilaian secara manual untuk dijadikan data latih dengan mengisi kolom nilai yang tersedia</p>
                                                  <p>3. Upload File Jawaban SIswa di kelas XII-IPA 3 yang telah dinilai sebagian secara manual</p>
                                                  <Input type="file"></Input>
                                           
                                                  </ModalBody>
                                                <ModalFooter>
                                                  <Button color="danger" onClick={this.toggleNilaiManual}>Tidak</Button>
                                                  <Button color="success" onClick={this.toggleNilaiManual}>Ya</Button>
                                                </ModalFooter>
                                            </Modal>                                        
                                      </tr>

                                    <tr>
                                      <td>XII-IPA 4</td>
                                      <td>35</td>
                                      <td><Button className="btn-twitter btn-brand icon btn-sm">Nilai Ujian</Button></td>
                                    </tr>
                                  
                                    <tr>
                                      <td>XII-IPA 1</td>
                                      <td>40</td>
                                      <td><span className="badge badge-success">Sudah dinilai manual</span></td>
                                    </tr>

                                    </tbody>
                                  </Table>                
                                </Col>
                              <Col className="col-sm-12 text-right">
                              <Link to="./penilaian">
                                <Button  color="primary">Kembali</Button>
                               </Link>
                                <Button  color="success" onClick={this.toggleSubmitNilaiManual}>Selanjutnya</Button>
                                <Modal isOpen={this.state.primary} toggle={this.toggleSubmitNilaiManual} className={'modal-primary ' + this.props.className}>
                                  <ModalHeader toggle={this.toggleSubmitNilaiManual}>Akhiri Penilaian Manual</ModalHeader>
                                    <ModalBody>
                                      <p className="text-center">Apakah anda yakin ingin mengakhiri penilaian ujian secara manual ? <b>Pastikan jawaban siswa sudah dinilai secara manula minimal 50 % dari seluruh jawaban siswa yang mengikuti ujian</b></p>
                                      <p className="text-center"> Jika sudah yakin, Tekan <b>"Lakukan Penilaian Otomatis"</b> untuk menilai jawaban esai siswa secara otomatis</p>
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button color="primary" onClick={this.toggleSubmitNilaiManual}>Kembali</Button>
                                      <Button color="success" onClick={() => this.toggle(1)} action active={this.state.activeTab === 1}>Lakukan Penilaian Otomatis</Button>
                                    </ModalFooter>
                                </Modal>
                              </Col>
                              
                            </TabPane>

                            <TabPane tabId={1}>
                              
                                <CardHeader>
                                  <FormGroup row>
                                      <Col className="sm-6">
                                      <dt className="col-sm-6 text-truncate"><h4>PENILAIAN UJIAN</h4></dt>
                                      <dd className="col-sm-6"><h4>OTOMATIS</h4></dd>
                                      </Col>  
            
                                      <Col className="sm-6">
                                      <dt className="col-sm-12 text-left">No Test : 1</dt>
                                      <dt className="col-sm-12 text-left">Nama Ujian : Pendidikan Kewarganegaraan</dt>
                                      <dt className="col-sm-12 text-left">Mata Pelajaran : PKN</dt>  
                                      </Col>
                                  </FormGroup>     
                                </CardHeader>
                                
                                <Progress animated color="success" value="55" className="mb-3" />
                                
                                <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                                  <Link to="./detailhasilujian"><Button block color="primary">LIHAT HASIL PENILAIAN</Button></Link>
                                </Col>
                               
                                
                               
                              
                              </TabPane?
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