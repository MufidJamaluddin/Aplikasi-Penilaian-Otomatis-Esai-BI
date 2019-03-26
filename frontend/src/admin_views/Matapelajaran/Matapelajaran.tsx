import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface MatapelajaranStateModel {
	modal: boolean;
	primary: boolean;
	large: boolean;
	warning : boolean;
	danger : boolean;
	info: boolean;
};

interface MatapelajaranModel { className:string; }

class Matapelajaran extends Component<MatapelajaranModel, MatapelajaranStateModel>
{
  constructor(props:Readonly<MatapelajaranModel>) 
  {
    super(props);
    
    this.state = {
      modal: false,
      primary: false,
      large: false,
      warning : false,
      danger : false,
      info: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleImportMatapelajaran = this.toggleImportMatapelajaran.bind(this);
	  this.toggleTambahMatapelajaran = this.toggleTambahMatapelajaran.bind(this);
	  this.toggleUpdateMatapelajaran = this.toggleUpdateMatapelajaran.bind(this);
	  this.toggleDeleteMatapelajaran = this.toggleDeleteMatapelajaran.bind(this);
	  this.toggleDetailMatapelajaran = this.toggleDetailMatapelajaran.bind(this);
  }

  public toggle() : void
  {
    this.setState({
      modal: !this.state.modal,
    });
  }
 
  public toggleTambahMatapelajaran() 
  {
    this.setState({
      large: !this.state.large,
    });
  }
  
  public toggleUpdateMatapelajaran() : void
  {
    this.setState({
      warning: !this.state.warning,
    });
  }
  
  public toggleDeleteMatapelajaran() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  public toggleDetailMatapelajaran() {
    this.setState({
      info: !this.state.info,
    });
  }

  public toggleImportMatapelajaran() : void
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
                        <Input type="text" id="search" name="search" placeholder="Cari Mata Pelajaran..." />
						<Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						 </InputGroup>
                    </Col>

              </CardHeader>
			  
              <CardBody>
			  <Form action="" method="post" className="form-horizontal">
				<FormGroup row>
				
				<Col sm="6">
					<p><Button size="sm" onClick={this.toggleImportMatapelajaran} className="btn-twitter btn-brand mr-1 mb-1 "><i className="fa fa-upload"></i><span>Import Data Mata Pelajaran</span></Button></p>
				</Col>
				
				<Modal isOpen={this.state.primary} toggle={this.toggleImportMatapelajaran} className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleImportMatapelajaran}>Import Data Mata Pelajaran</ModalHeader>
                  <ModalBody>
                    1. Download Template CSV Mata Pelajaran
						<p><Button size="sm"  className="btn-vine btn-brand mr-1 mb-1 "> <i className="fa fa-download"></i>
							<span>Download Template CSV</span>
						</Button></p>
					<p>2. Isi data Mata Pelajaran sesuai dengan format kolom yang tersedia pada Template CSV <b>(kolom pertama tidak boleh diubah/diedit)</b></p>
					<p>3. Upload Template CSV Mata Pelajaran yang sudah diisi</p>
					<Input type="file" id="file-input" name="file-input" />
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleImportMatapelajaran}>Cancel</Button>
                    <Button color="success" onClick={this.toggleImportMatapelajaran}>Import</Button>{' '}
                  </ModalFooter>
                </Modal>
				<Col sm="3">
					<Input  type="text" placeholder="Nama Mata Pelajaran" required/>
				</Col>
				<Col sm="3">
					<Button bgSize="sm" color="success" className="px-4"><i className="fa fa-plus"></i><span>Tambah Mata Pelajaran</span></Button>
				</Col>
				
				</FormGroup>
			</Form>	
        <Table responsive size="sm">
                  <thead>
                  <tr>
                    <th>Nama Mata Pelajaran</th>
					<th></th>
					<th></th>
					<th></th>
					
					<th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                	<td>Geografi</td>
					<td></td>
					<td></td>
                	<td></td>
					
                	
					<td>
						
				<Button className="btn-stack-overflow btn-brand icon btn-sm" onClick={this.toggleUpdateMatapelajaran}><i className="fa fa-pencil"></i></Button>
				<Modal isOpen={this.state.warning} toggle={this.toggleUpdateMatapelajaran}className={'modal-warning  ' + this.props.className}>
							  
				  <ModalHeader toggle={this.toggleUpdateMatapelajaran}>Update Mata Pelajaran</ModalHeader>
          <ModalBody>
            <Form action="" method="post" className="form-horizontal">
              <FormGroup row>
              <Col sm="12">
                <p><Input  type="text" placeholder="Nama Mata Pelajaran" required /></p>
              </Col>
              </FormGroup>
            </Form>
          </ModalBody>		  
				  <ModalFooter>
						<Button color="danger" onClick={this.toggleUpdateMatapelajaran}>Cancel</Button>
						<Button color="success" onClick={this.toggleUpdateMatapelajaran}>Update</Button>{' '}
				  </ModalFooter>
				</Modal>
						
						
				<Button className="btn-youtube btn-brand icon btn-sm" onClick={this.toggleDeleteMatapelajaran}><i className="fa fa-trash"></i></Button>
				<Modal isOpen={this.state.danger} toggle={this.toggleDeleteMatapelajaran}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDeleteMatapelajaran}>Delete Mata Pelajaran</ModalHeader>
                  <ModalBody>
					<p> Apakah anda yakin ingin menghapus <b>XI-IPA1</b> dari data Mata Pelajaran ?</p>
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleDeleteMatapelajaran}>Tidak</Button>
                    <Button color="success" onClick={this.toggleDeleteMatapelajaran}>Ya</Button>{' '}
                  </ModalFooter>
                </Modal>
					</td>
                  </tr>
                  <tr>
                    <td>Geografi</td>
					<td></td>
					<td></td>
                    <td></td>
                	<td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
					<td></td>
					<td></td>
                	<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
					<td></td>
                	<td></td>
					<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
					<td></td>
                	<td></td>
					<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
					<td></td>
					<td></td>
                	<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
					<td></td>
					<td></td>
                	<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
					<td></td>
					<td></td>
                	<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
					<td></td>
					<td></td>
                	<td></td>
                    <td>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>Geografi</td>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Matapelajaran;
