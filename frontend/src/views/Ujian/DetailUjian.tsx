import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

interface DetailUjianStateModel { modal:boolean; state:boolean; danger:boolean; }

interface DetailUjianPropsModel { className?: string; }

class DetailUjian extends Component<DetailUjianPropsModel, DetailUjianStateModel>
{
  constructor(props: Readonly<DetailUjianPropsModel>) 
  {
    super(props);

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
                      <h6>No Test : TST00004</h6>
                      <h6>Biologi</h6>
                      <h6>Biologi Bab 1</h6>
                      <h6>Durasi Ujian : 90:00</h6>
                      <h6>Jumlah Soal : 10</h6>
                    </Col>
                    
              </CardHeader>
			  
              <CardBody>
                                   
                                    <Col sm="12">
                                        <Col className="col-sm-12 text-right">
                                            <Button className="btn btn-sm btn-success"><b><i className="icon-note"></i> LIHAT SOAL</b></Button>
                                        </Col>
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
                                            <td><Button className="btn-twitter btn-brand icon btn-sm">Mulai Ujian</Button></td>
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
                                        <Link to="./ujian">
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
