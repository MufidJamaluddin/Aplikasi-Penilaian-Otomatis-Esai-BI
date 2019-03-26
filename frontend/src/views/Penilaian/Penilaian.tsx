import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
interface PenilaianStateModel { modal:boolean; state:boolean; danger:boolean; }

interface PenilaianPropsModel { className?: string; }

class Penilaian extends Component<PenilaianPropsModel, PenilaianStateModel>
{
  constructor(props: Readonly<PenilaianPropsModel>) 
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
                <Table responsive size="sm">
                
                <thead>
                  <tr>
                    <th>No. Ujian</th>
                    <th>Nama Ujian</th>
                    <th>Mata Pelajaran</th>
                    <th></th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td>TST00001</td>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>PKN Bab 1</td>
                    <td><Link to="./NilaiUjian"><Button className="btn-twitter btn-brand icon btn-sm">Nilai Ujian</Button></Link>></td>
                 </tr>

                 <tr>
                    <td>TST00002</td>
                    <td>Pendidikan Kewarganegaraan</td>
                    <td>PKN Bab 2</td>
                    <td><span className="badge badge-success">Sudah Dinilai</span></td>
                 </tr>

                 <tr>
                    <td>TST00003</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 1</td>
                 <td><Button className="btn-twitter btn-brand icon btn-sm">Nilai Ujian</Button></td>
                 </tr>
                 
                 <tr>
                    <td>TST00004</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 2</td>
                    <td><span className="badge badge-success">Sudah Dinilai</span></td>
                 </tr>
                 
                 <tr>
                    <td>TST00005</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 3</td>
                    <td><span className="badge badge-success">Sudah Dinilai</span></td>
                 </tr>
                 <tr>
                    <td>TST00006</td>
                    <td>Biologi</td>
                    <td>Biologi Bab 4</td>
                    <td><Button className="btn-twitter btn-brand icon btn-sm">Nilai Ujian</Button></td>
                 </tr>
				  </tbody>
                </Table>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Penilaian;
