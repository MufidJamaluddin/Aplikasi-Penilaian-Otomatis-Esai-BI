import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Table, Button,Form, FormGroup, Input } from 'reactstrap';

import { Link, RouteComponentProps } from 'react-router-dom';

interface DetailUjianStateModel { 
  modal: boolean;
	primary: boolean;
}

interface DetailUjianPropsModel { className?: string; }

interface RouteParam { idujian?:string; }

/**
 * Detail Keterangan Ujian
 */
class DetailUjian extends Component<DetailUjianPropsModel & RouteComponentProps<RouteParam>, DetailUjianStateModel>
{
  /**
   * ID UJIAN
   * Keterangan Ujian
   */
  private idujian?: string;

  constructor(props:any) 
  {
    super(props);
    this.state = {
      modal: false,
      primary: false,
    };

    this.idujian = props.match.params.idujian;

    this.toggle = this.toggle.bind(this);
    this.toggleMulaiUjian = this.toggleMulaiUjian.bind(this);
  }

  public toggle() : void 
  {
    this.setState({
      modal: !this.state.modal,
    });
  }
 
  public toggleMulaiUjian() : void
  {
    this.setState({
      primary: !this.state.primary,
    });
  }


  public render() : JSX.Element 
  {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                    <Col md="12">
                      <h6>ID Test : { this.idujian }</h6>
                      <h6>Biologi</h6>
                      <h6>Biologi Bab 1</h6>
                      <h6>Durasi Ujian : 90:00</h6>
                      <h6>Jumlah Soal : 10</h6>
                    </Col>
                    
              </CardHeader>
			  
              <CardBody>
                                   
                                    <Col sm="12">
                                        
                                        <Table responsive size="sm">
                                        <thead>
                                        <tr>
                                            <th>List Kelas</th>
                                            <th>Waktu Mulai Ujian</th>
                                            <th>Status Ujian</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>XII-IPA1</td>
                                            <td>25/12/2018 11:32:12</td>
                                            <td><span className="badge badge-primary">Sedang berlangsung</span></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA2</td>
                                            <td>-</td>
                                            <td><span className="badge badge-danger">Belum terlaksana</span></td>
                                            <td><Button className="btn-twitter btn-brand icon btn-sm">Mulai Ujian</Button></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA3</td>
                                            <td>25/12/2018 09:20:12</td>
                                            <td><span className="badge badge-success">Sudah terlaksana</span></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA4</td>
                                            <td>-</td>
                                            <td><span className="badge badge-danger">Belum terlaksana</span></td>
                                            <td><Button className="btn-twitter btn-brand icon btn-sm">Mulai Ujian</Button></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA5</td>
                                            <td>-</td>
                                            <td><span className="badge badge-danger">Belum terlaksana</span></td>
                                            <td><Button className="btn-twitter btn-brand icon btn-sm" onClick={this.toggleMulaiUjian}>Mulai Ujian</Button></td>
                                            <Modal isOpen={this.state.primary} toggle={this.toggleMulaiUjian} className={'modal-primary ' + this.props.className}>
                                              <ModalHeader toggle={this.toggleMulaiUjian}>Mulai Ujian</ModalHeader>
                                              <ModalBody>
                                              <p> Apakah anda yakin ingin memulai ujian di kelas <b>X-IPA5</b>?</p>
                                              </ModalBody>
                                              <ModalFooter>
                                                <Button color="danger" onClick={this.toggleMulaiUjian}>Tidak</Button>
                                                <Button color="success" onClick={this.toggleMulaiUjian}>Ya</Button>{' '}
                                              </ModalFooter>
                                            </Modal>

                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA6</td>
                                            <td>25/12/2018 07:20:12</td>
                                            <td><span className="badge badge-success">Sudah terlaksana</span></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                        </Table>
                                      </Col>
                                    <Col className="col-sm-12 text-right">
                                        <Link to="/ujian">
                                            <Button className="text-right" color="primary" >Kembali</Button>
                                        </Link>
                                    </Col>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default DetailUjian;
