import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

interface UjianStateModel { modal:boolean; state:boolean; primary:boolean; }

interface UjianPropsModel { className?: string; }

class Ujian extends Component<UjianPropsModel, UjianStateModel>
{
  constructor(props: Readonly<UjianPropsModel>) 
  {
    super(props);

    this.state = {
      primary: false,
      modal: false,
      state: false
    };

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
					<th>Waktu Ujian</th>
					<th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                	<td>TST00001</td>
					<td>Struktur Tanah</td>
					<td>Geografi</td>
					<td>01/02/2018</td>
					<td><b>Telah dikerjakan</b></td>
                  </tr>
				  <tr>
                	<td>TST00002</td>
					<td>Cara Bersosialisasi</td>
					<td>Sosiologi</td>
					<td>02/02/2018</td>
					<td>Ujian Ditutup</td>
                  </tr>
				  <tr>
                	<td>TST00003</td>
					<td>Cara Bersosialisasi</td>
					<td>Sosiologi</td>
					<td>02/02/2018</td>
					<td>Ujian Ditutup</td>
                  </tr>
                  <tr>
                    <td>TST00004</td>
					<td>Anatomy Tumbuhan</td>
					<td>Biologi</td>
					<td>03/02/2018</td>
                    <td>
						<Button size="sm" type="button" onClick={this.toggleMulaiUjian} color="primary">Mulai Ujian</Button>
						<Modal isOpen={this.state.primary} toggle={this.toggleMulaiUjian} className={'modal-primary ' + this.props.className}>
						  <ModalHeader toggle={this.toggleMulaiUjian}>Mulai Ujian</ModalHeader>
						  <ModalBody>
							<FormGroup row>
								
										<dt className="col-sm-6 text-truncate">No. Ujian</dt>
										<dd className="col-sm-6">TST00004</dd>
										
										<dt className="col-sm-6 text-truncate">Nama Ujian</dt>
										<dd className="col-sm-6">Anatomy Tumbuhan</dd>
										
										<dt className="col-sm-6 text-truncate">Mata Pelajaran</dt>
										<dd className="col-sm-6">Biologi</dd>
										
										<dt className="col-sm-6 text-truncate">jumlah Soal</dt>
										<dd className="col-sm-6">36</dd>
										
										<dt className="col-sm-6 text-truncate">Durasi Ujian</dt>
										<dd className="col-sm-6">90:00 Menit</dd>
									
							</FormGroup>
								  
						  </ModalBody>
						  <ModalFooter>
							<Button color="danger" onClick={this.toggleMulaiUjian}>Tidak</Button>
							<Link to="./soal"><Button color="success" >Ya</Button></Link>
						  </ModalFooter>
						</Modal>
					</td>
                  </tr>
				  <tr>
                    <td>TST00005</td>
					<td>Toleransi Beragama</td>
					<td>Pendidikan Kewarganegaraan</td>
					<td>03/02/2018</td>
                    <td>Ujian Ditutup</td>
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
