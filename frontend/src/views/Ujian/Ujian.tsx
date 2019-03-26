import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
interface UjianStateModel { modal:boolean; state:boolean; danger:boolean; }

interface UjianPropsModel { className?: string; }

class Ujian extends Component<UjianPropsModel, UjianStateModel>
{
  constructor(props: Readonly<UjianPropsModel>) 
  {
    super(props);

    this.state = {
      danger: false,
      modal: false,
      state: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDeleteUjian = this.toggleDeleteUjian.bind(this);
  }


  public toggle() : void 
  {
    this.setState({
      modal: !this.state.modal,
    });
  }
  
  public toggleDeleteUjian() : void
  {
    this.setState({
      danger: !this.state.danger,
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

				 <Col md="4">
                      <InputGroup>
                        <Input type="text" id="search" name="search" placeholder="Cari Ujian..." />
						<Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						 </InputGroup>
                    </Col>

              </CardHeader>
			  
              <CardBody>
              <Link to="./tambahujian">
                <Button size="sm"className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-plus"></i><span>Tambah Ujian</span></Button>
              </Link>
                <Table responsive size="sm">
                
                <thead>
                  <tr>
                    <th>No. Ujian</th>
                    <th>Nama Ujian</th>
                    <th>Mata Pelajaran</th>
                    <th>Status Ujian</th>
                    <th></th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td>TST00001</td>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>PKN Bab 1</td>
                    <td><span className="badge badge-success">Terlaksana</span></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></td>
                 </tr>

                 <tr>
                    <td>TST00002</td>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>PKN Bab 2</td>
                    <td><span className="badge badge-success">Terlaksana</span></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></td>
                 </tr>

                 <tr>
                    <td>TST00003</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 1</td>
                    <td><span className="badge badge-danger">Belum Terlaksana</span></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
                        <Link to="./updateujian">
                          <Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-edit"></i></Button>
                        </Link>
                        <Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
                    </td>
                 </tr>

                 
                 <tr>
                    <td>TST00004</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 2</td>
                    <td><span className="badge badge-primary">Sedang Berlangsung</span></td>
                    <td><Link to="./detailujian"><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button></Link></td>
                 </tr>

                 
                 <tr>
                    <td>TST00005</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 3</td>
                    <td><span className="badge badge-danger">Belum Terlaksana</span></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
                        <Link to="./updateujian">
                          <Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-edit"></i></Button>
                        </Link>
                        <Button className="btn-youtube btn-brand icon btn-sm" onClick={this.toggleDeleteUjian}><i className="fa fa-trash"></i></Button>
                            
                            <Modal isOpen={this.state.danger} toggle={this.toggleDeleteUjian} className={'modal-danger ' + this.props.className}>
                              <ModalHeader toggle={this.toggleDeleteUjian}>Delete Ujian</ModalHeader>
                              <ModalBody>
					                        <p> Apakah anda yakin ingin menghapus ujian <b></b> dari daftar Ujian ?</p>
                              </ModalBody>
                              <ModalFooter>
				                        <Button color="danger" onClick={this.toggleDeleteUjian}>Tidak</Button>
                                <Button color="success" onClick={this.toggleDeleteUjian}>Ya</Button>{' '}
                              </ModalFooter>
                             </Modal>
				
                    </td>
                 </tr>

                 <tr>
                    <td>TST00006</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 4</td>
                    <td><span className="badge badge-danger">Belum Terlaksana</span></td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
                        <Link to="./updateujian">
                          <Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-edit"></i></Button>
                         </Link>
                        <Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
                    </td>
                 </tr>

				  </tbody>
                </Table>
                <Pagination size="sm">
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Ujian;
