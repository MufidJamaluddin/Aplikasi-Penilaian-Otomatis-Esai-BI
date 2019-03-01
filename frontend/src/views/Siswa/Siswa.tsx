import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface SiswaStateModel {
	modal: boolean;
	primary: boolean;
	large: boolean;
	warning : boolean;
	danger : boolean;
	info: boolean;
};

interface SiswaModel { className:string; }

class Siswa extends Component<SiswaModel, SiswaStateModel>
{
  constructor(props: Readonly<SiswaModel>) 
  {
    super(props);
    
    this.state = {
      modal: false,
      primary: false,
	    large: false,
	    warning : false,
	    danger : false,
	    info: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleImportSiswa = this.toggleImportSiswa.bind(this);
	  this.toggleTambahSiswa = this.toggleTambahSiswa.bind(this);
	  this.toggleUpdateSiswa = this.toggleUpdateSiswa.bind(this);
	  this.toggleDeleteSiswa = this.toggleDeleteSiswa.bind(this);
  }

  public toggle() : void 
  {
    this.setState({
      modal: !this.state.modal,
    });
  }
 
  public toggleTambahSiswa() : void
  {
    this.setState({
      large: !this.state.large,
    });
  }
  
  public toggleUpdateSiswa() : void 
  {
    this.setState({
      warning: !this.state.warning,
    });
  }
  
  public toggleDeleteSiswa() : void
  {
    this.setState({
      danger: !this.state.danger,
    });
  }



  toggleImportSiswa() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  public render() 
  {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>

				 <Col md="4">
                      <InputGroup>
                        <Input type="text" id="search" name="search" placeholder="Cari Siswa..." />
						<Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						 </InputGroup>
                    </Col>

              </CardHeader>
			  
              <CardBody>

				<Button size="sm" onClick={this.toggleImportSiswa} className="btn-twitter btn-brand mr-1 mb-1 "><i className="fa fa-upload"></i><span>Import Data Siswa</span></Button>
				<Modal isOpen={this.state.primary} toggle={this.toggleImportSiswa}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleImportSiswa}>Import Data Siswa</ModalHeader>
                  <ModalBody>
                    1. Download Template CSV Siswa
						<p><Button size="sm"  className="btn-vine btn-brand mr-1 mb-1 "> <i className="fa fa-download"></i>
							<span>Download Template CSV</span>
						</Button></p>
					<p>2. Isi data Siswa sesuai dengan format kolom yang tersedia pada Template CSV <b>(kolom pertama tidak boleh diubah/diedit)</b></p>
					<p>3. Upload Template CSV Siswa yang sudah diisi</p>
					<Input type="file" id="file-input" name="file-input" />
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleImportSiswa}>Cancel</Button>
                    <Button color="success" onClick={this.toggleImportSiswa}>Import</Button>{' '}
                  </ModalFooter>
                </Modal>
				
				<Button size="sm" onClick={this.toggleTambahSiswa} className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-plus"></i><span>Tambah Siswa</span></Button>
				<Modal isOpen={this.state.large} toggle={this.toggleTambahSiswa}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleTambahSiswa}>Tambah Siswa</ModalHeader>
                  <ModalBody>
                    <Form action="" method="post" className="form-horizontal">
					
					  <FormGroup row>
						<Col sm="12">
						  <p><Input  type="text" placeholder="NIS" required /></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="text" placeholder="Nama Siswa" required/></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="select">
							<option value="">Pilih Kelas ...</option>
							<option value="X-IPA1">X-IPA1</option>
							<option value="X-IPA2">X-IPA2</option>
							<option value="X-IPA3">X-IPA3</option>
							<option value="X-IPA4">X-IPA4</option>
						  </Input></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="text" placeholder="Username" required/></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="text" placeholder="Password" required/></p>
						</Col>
					  </FormGroup>
					  
					  
					</Form>
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleTambahSiswa}>Cancel</Button>
                    <Button color="success" onClick={this.toggleTambahSiswa}>Tambah</Button>{' '}
                  </ModalFooter>
                </Modal>
  
                <Table responsive size="sm">
                  <thead>
                  <tr>
                    <th>NIS</th>
                    <th>Nama Siswa</th>
					<th>Kelas</th>
                    <th>Username</th>
                    <th>Password</th>
					<th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>161511019</td>
                    <td>Mufid Jamaluddin</td>
					<td>X-IPA1</td>
                    <td>mufidjamaluddin</td>
					<td>mufidjamaluddin</td>
					<td>
						
						<Button className="btn-stack-overflow btn-brand icon btn-sm" onClick={this.toggleUpdateSiswa}><i className="fa fa-pencil"></i></Button>
							<Modal isOpen={this.state.warning} toggle={this.toggleUpdateSiswa}
								   className={'modal-warning modal-md' + this.props.className}>
							  <ModalHeader toggle={this.toggleUpdateSiswa}>Update Siswa</ModalHeader>
                  <ModalBody>
                    <Form action="" method="post" className="form-horizontal">
					
					  <FormGroup row>
						<Col sm="12">
						  <p><Input type="text" placeholder="NIS" required /></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="text" placeholder="Nama Siswa" required/></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="select">
							<option value="">Pilih Kelas ...</option>
							<option value="X-IPA1">X-IPA1</option>
							<option value="X-IPA2">X-IPA2</option>
							<option value="X-IPA3">X-IPA3</option>
							<option value="X-IPA4">X-IPA4</option>
						  </Input></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="text" placeholder="Username" required/></p>
						</Col>
						<Col sm="12">
						  <p><Input  type="text" placeholder="Password" required/></p>
						</Col>
					  </FormGroup>
					  
					  
					</Form>
                  </ModalBody>		  <ModalFooter>
								<Button color="danger" onClick={this.toggleUpdateSiswa}>Cancel</Button>
								<Button color="success" onClick={this.toggleUpdateSiswa}>Update</Button>{' '}
							  </ModalFooter>
							</Modal>
						
						
				<Button className="btn-youtube btn-brand icon btn-sm" onClick={this.toggleDeleteSiswa}><i className="fa fa-trash"></i></Button>
				<Modal isOpen={this.state.danger} toggle={this.toggleDeleteSiswa}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDeleteSiswa}>Delete Siswa</ModalHeader>
                  <ModalBody>
					<p> Apakah anda yakin ingin menghapus <b>Mufid Jamaluddin</b> dari data Siswa ?</p>
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleDeleteSiswa}>Tidak</Button>
                    <Button color="success" onClick={this.toggleDeleteSiswa}>Ya</Button>{' '}
                  </ModalFooter>
                </Modal>
					</td>
                  </tr>
                  <tr>
                    <td>161511019</td>
                    <td>Mufid Jamaluddin</td>
					<td>X-IPA1</td>
                    <td>mufidjamaluddin</td>
					<td>mufidjamaluddin</td>
					<td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>161511019</td>
                    <td>Mufid Jamaluddin</td>
					<td>X-IPA1</td>
                    <td>mufidjamaluddin</td>
					<td>mufidjamaluddin</td>
					<td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>161511019</td>
                    <td>Mufid Jamaluddin</td>
					<td>X-IPA1</td>
                    <td>mufidjamaluddin</td>
					<td>mufidjamaluddin</td>
					<td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>161511019</td>
                    <td>Mufid Jamaluddin</td>
					<td>X-IPA1</td>
                    <td>mufidjamaluddin</td>
					<td>mufidjamaluddin</td>
					<td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
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

export default Siswa;
