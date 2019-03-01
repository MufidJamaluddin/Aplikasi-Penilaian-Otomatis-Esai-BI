import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface KelasStateModeel {
	modal: boolean;
	primary: boolean;
	large: boolean;
	warning : boolean;
	danger : boolean;
	info: boolean;
};

interface KelasModel { className:string; }

class Kelas extends Component<KelasModel, KelasStateModeel>
{
  constructor(props: Readonly<KelasModel>) 
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
    this.toggleImportKelas = this.toggleImportKelas.bind(this);
    this.toggleTambahKelas = this.toggleTambahKelas.bind(this);
    this.toggleUpdateKelas = this.toggleUpdateKelas.bind(this);
    this.toggleDeleteKelas = this.toggleDeleteKelas.bind(this);
    this.toggleDetailKelas = this.toggleDetailKelas.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
 
 toggleTambahKelas() {
    this.setState({
      large: !this.state.large,
    });
  }
  
 toggleUpdateKelas() {
    this.setState({
      warning: !this.state.warning,
    });
  }
  
 toggleDeleteKelas() {
    this.setState({
      danger: !this.state.danger,
    });
  }

 toggleDetailKelas() {
    this.setState({
      info: !this.state.info,
    });
  }

  toggleImportKelas() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>

				 <Col md="4">
                      <InputGroup>
                        <Input type="text" id="search" name="search" placeholder="Cari Kelas..." />
						<Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						 </InputGroup>
                    </Col>

              </CardHeader>
			  
              <CardBody>
			  <Form action="" method="post" className="form-horizontal">
				<FormGroup row>
				
				<Col sm="6">
					<p><Button size="sm" onClick={this.toggleImportKelas} className="btn-twitter btn-brand mr-1 mb-1 "><i className="fa fa-upload"></i><span>Import Data Kelas</span></Button></p>
				</Col>
				
				<Modal isOpen={this.state.primary} toggle={this.toggleImportKelas} className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleImportKelas}>Import Data Kelas</ModalHeader>
                  <ModalBody>
                    1. Download Template CSV Kelas
						<p><Button size="sm"  className="btn-vine btn-brand mr-1 mb-1 "> <i className="fa fa-download"></i>
							<span>Download Template CSV</span>
						</Button></p>
					<p>2. Isi data Kelas sesuai dengan format kolom yang tersedia pada Template CSV <b>(kolom pertama tidak boleh diubah/diedit)</b></p>
					<p>3. Upload Template CSV Kelas yang sudah diisi</p>
					<Input type="file" id="file-input" name="file-input" />
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleImportKelas}>Cancel</Button>
                    <Button color="success" onClick={this.toggleImportKelas}>Import</Button>{' '}
                  </ModalFooter>
                </Modal>
				<Col sm="4">
					<Input bsSize="sm" type="text" placeholder="Nama Kelas" required/>
				</Col>
				<Col sm="2">
					<Button bsSize="sm" color="success" className="px-4"><i className="fa fa-plus"></i><span>Tambah Kelas</span></Button>
				</Col>
				
				</FormGroup>
			</Form>	
                <Table responsive size="sm">
                  <thead>
                  <tr>
                    <th>Nama Kelas</th>
					<th></th>
					<th></th>
					<th></th>
					
					<th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                	<td>X-IPA1</td>
					<td></td>
					<td></td>
                	<td></td>
					
                	
					<td>
						
				<Button className="btn-stack-overflow btn-brand icon btn-sm" onClick={this.toggleUpdateKelas}><i className="fa fa-pencil"></i></Button>
				<Modal isOpen={this.state.warning} toggle={this.toggleUpdateKelas}className={'modal-warning  ' + this.props.className}>
							  
				  <ModalHeader toggle={this.toggleUpdateKelas}>Update Kelas</ModalHeader>
                  <ModalBody>
                    <Form action="" method="post" className="form-horizontal">
					  <FormGroup row>
						<Col sm="12">
						  <p><Input  type="text" placeholder="Nama Kelas" required /></p>
						</Col>
					  </FormGroup>
					</Form>
					
                  </ModalBody>		  
				  <ModalFooter>
						<Button color="danger" onClick={this.toggleUpdateKelas}>Cancel</Button>
						<Button color="success" onClick={this.toggleUpdateKelas}>Update</Button>{' '}
				  </ModalFooter>
				</Modal>
						
						
				<Button className="btn-youtube btn-brand icon btn-sm" onClick={this.toggleDeleteKelas}><i className="fa fa-trash"></i></Button>
				<Modal isOpen={this.state.danger} toggle={this.toggleDeleteKelas}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDeleteKelas}>Delete Kelas</ModalHeader>
                  <ModalBody>
					<p> Apakah anda yakin ingin menghapus <b>XI-IPA1</b> dari data Kelas ?</p>
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleDeleteKelas}>Tidak</Button>
                    <Button color="success" onClick={this.toggleDeleteKelas}>Ya</Button>{' '}
                  </ModalFooter>
                </Modal>
					</td>
                  </tr>
                  <tr>
                    <td>X-IPA1</td>
					<td></td>
					<td></td>
                    <td></td>
                	<td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>X-IPA1</td>
					<td></td>
					<td></td>
                	<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>X-IPA1</td>
					<td></td>
                	<td></td>
					<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>X-IPA1</td>
					<td></td>
                	<td></td>
					<td></td>
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

export default Kelas;
