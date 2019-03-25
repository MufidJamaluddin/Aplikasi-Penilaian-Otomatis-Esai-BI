import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

interface TambahUjianStateModel { modal:boolean; state:boolean; danger:boolean; }

interface TambahUjianPropsModel { className?: string; }

class TambahUjian extends Component<TambahUjianPropsModel, TambahUjianStateModel>
{
  constructor(props: Readonly<TambahUjianPropsModel>) 
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
                <h5 className="text-center">TAMBAH UJIAN</h5>
              </CardHeader>
			  
              <CardBody>

              <Form action="" method="post" className="form-horizontal">
										<h6>Keterangan Ujian :</h6>
										<FormGroup row>
										<Col sm="3">
											<p><Input type="text" placeholder="Nama Ujian" required /></p>
										</Col>
										<Col sm="3">
                                            <p><Input  type="select">
                                            <option value="">Pilih Mata Pelajaran ...</option>
                                            <option value="Biologi">Biologi</option>
                                            <option value="Geografi">Geografi</option>
                                            <option value="Sejarah">Sejarah</option>
                                            <option value="Pendidikan Kewarganegaraan">Pendidikan Kewarganegaraan</option>
                                            </Input></p>
										</Col>
										<Col sm="3">
											<p><Input  type="number" placeholder="Durasi Ujian (minute)" name="durasi" min="0" required/></p>
										</Col>
										<Col sm="3">
											<p><Input  type="number" placeholder="Jumlah Soal" min="1" max="10" required/></p>
										</Col>
										</FormGroup>
										
									<h6>Kelas</h6>
									<FormGroup row>
									
									<Col sm="5">
										<p><Input type="select">
										<option value="">Pilih Kelas ...</option>
										<option value="X-IPA1">X-IPA1</option>
										<option value="X-IPA2">X-IPA2</option>
										<option value="X-IPA3">X-IPA3</option>
										<option value="X-IPA4">X-IPA4</option>
										</Input></p>
									</Col>
                                    <Col sm="1">
										<p><Button bsSize="sm" color="success">+Tambah</Button></p>
									</Col>
                                

                                    <Col sm="12">
                                        <Table responsive size="sm">
                                        <thead>
                                        <tr>
                                            <th>List Kelas</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>x-IPA1</td>
                                            <td></td>
                                            <td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA2</td>
                                            <td></td>
                                            <td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA3</td>
                                            <td></td>
                                            <td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA4</td>
                                            <td></td>
                                            <td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
                                        </tr>
                                        <tr>
                                            <td>x-IPA5</td>
                                            <td></td>
                                            <td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
                                        </tr>
                                        </tbody>
                                        </Table>
                                      </Col>

                                      <Col className="col-sm-12 text-right">
                                        <Link to="./ujian">
                                            <Button className="text-right" color="primary" >Kembali</Button>
                                        </Link>
                                        <Link to="./buatsoal">
                                            <Button className="text-right" color="success" >Selanjutnya</Button>
                                        </Link>
                                     </Col>

								</FormGroup>
							</Form>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default TambahUjian;
