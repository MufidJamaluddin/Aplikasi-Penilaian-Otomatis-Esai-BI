import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface GuruStateModeel {
	modal: boolean;
	primary: boolean;
	large: boolean;
	warning : boolean;
	danger : boolean;
	info: boolean;
};

interface GuruModel { className:string; }

class Guru extends Component<GuruModel, GuruStateModeel>
{
	constructor(props: Readonly<GuruModel>) 
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
    this.toggleImportGuru = this.toggleImportGuru.bind(this);
		this.toggleTambahGuru = this.toggleTambahGuru.bind(this);
		this.toggleUpdateGuru = this.toggleUpdateGuru.bind(this);
		this.toggleDeleteGuru = this.toggleDeleteGuru.bind(this);
		this.toggleDetailGuru = this.toggleDetailGuru.bind(this);
  }

	public toggle() : void 
	{
    this.setState({
      modal: !this.state.modal,
    });
  }
 
 	public toggleTambahGuru() : void 
 	{
    this.setState({
      large: !this.state.large,
    });
  }
  
 	public toggleUpdateGuru() : void
 	{
    this.setState({
      warning: !this.state.warning,
    });
  }
  
	public toggleDeleteGuru() : void
	{
    this.setState({
      danger: !this.state.danger,
    });
  }

	public toggleDetailGuru() : void
	{
    this.setState({
      info: !this.state.info,
    });
  }

	public toggleImportGuru() : void
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
                        <Input type="text" id="search" name="search" placeholder="Cari Guru..." />
						<Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						 </InputGroup>
                    </Col>

              </CardHeader>
			  
              <CardBody>
			
				<Button size="sm" onClick={this.toggleImportGuru} className="btn-twitter btn-brand mr-1 mb-1 "><i className="fa fa-upload"></i><span>Import Data Guru</span></Button>
				<Modal isOpen={this.state.primary} toggle={this.toggleImportGuru}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleImportGuru}>Import Data Guru</ModalHeader>
                  <ModalBody>
                    1. Download Template CSV Guru
						<p><Button size="sm"  className="btn-vine btn-brand mr-1 mb-1 "> <i className="fa fa-download"></i>
							<span>Download Template CSV</span>
						</Button></p>
					<p>2. Isi data guru sesuai dengan format kolom yang tersedia pada Template CSV <b>(kolom pertama tidak boleh diubah/diedit)</b></p>
					<p>3. Upload Template CSV Guru yang sudah diisi</p>
					<Input type="file" id="file-input" name="file-input" />
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleImportGuru}>Cancel</Button>
                    <Button color="success" onClick={this.toggleImportGuru}>Import</Button>{' '}
                  </ModalFooter>
                </Modal>
				
				<Button size="sm" onClick={this.toggleTambahGuru} className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-plus"></i><span>Tambah Guru</span></Button>
				<Modal isOpen={this.state.large} toggle={this.toggleTambahGuru}
                       className={'modal-success modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleTambahGuru}>Tambah Guru</ModalHeader>
                  <ModalBody>
								
										<Form action="" method="post" className="form-horizontal">
										<h6>Data Pribadi</h6>
										<FormGroup row>
										<Col sm="3">
											<p><Input bsSize="sm" type="text" placeholder="NIP" required /></p>
										</Col>
										<Col sm="3">
											<p><Input bsSize="sm" type="text" placeholder="Nama Guru" required/></p>
										</Col>
										<Col sm="3">
											<p><Input bsSize="sm" type="text" placeholder="Username" required/></p>
										</Col>
										<Col sm="">
											<p><Input bsSize="sm" type="text" placeholder="Password" required/></p>
										</Col>
										</FormGroup>
										
									<h6>Data Mengajar</h6>
									<FormGroup row>
									<Col sm="5">
										<p><Input bsSize="sm" type="select">
										<option value="">Pilih Mata Pelajaran ...</option>
										<option value="Biologi">Biologi</option>
										<option value="Geografi">Geografi</option>
										<option value="Sejarah">Sejarah</option>
										<option value="Pendidikan Kewarganegaraan">Pendidikan Kewarganegaraan</option>
										</Input></p>
									</Col>
									
									<Col sm="5">
										<p><Input bsSize="sm" type="select">
										<option value="">Pilih Kelas ...</option>
										<option value="X-IPA1">X-IPA1</option>
										<option value="X-IPA2">X-IPA2</option>
										<option value="X-IPA3">X-IPA3</option>
										<option value="X-IPA4">X-IPA4</option>
										</Input></p>
									</Col>
									
									<Col sm="2">
										<p><Button bsSize="sm" color="success">+Tambah</Button></p>
									</Col>
									
						<Col sm="12">
						<Table responsive bsSize="sm">
						  <thead>
						  <tr>
							<th>Mata Pelajaran</th>
							<th>Kelas</th>
							<th>Aksi</th>
						  </tr>
						  </thead>
						  <tbody>
						  <tr>
							<td>Biologi</td>
							<td>x-IPA1</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						   <tr>
							<td>Geografi</td>
							<td>x-IPA1</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						  <tr>
							<td>Pendidikan Kewarganegaraan</td>
							<td>x-IPA1</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						  <tr>
							<td>Pendidikan Kewarganegaraan</td>
							<td>x-IPA2</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						  <tr>
							<td>Pendidikan Kewarganegaraan</td>
							<td>x-IPA3</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
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
						</Col>
					  </FormGroup>
					</Form>
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleTambahGuru}>Cancel</Button>
                    <Button color="success" onClick={this.toggleTambahGuru}>Tambah</Button>{' '}
                  </ModalFooter>
                </Modal>
				  
                <Table responsive size="sm">
                  <thead>
                  <tr>
                    <th>NIP</th>
                    <th>Nama Guru</th>
                    <th>Username</th>
                    <th>Password</th>
										<th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>93120001</td>
                    <td>Lucky Ramdani M.Pd</td>
                    <td>luckyramdani</td>
					<td>luckyramdani</td>
					<td>
						<Button onClick={this.toggleDetailGuru} className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
							<Modal isOpen={this.state.info} toggle={ this.toggleDetailGuru }
								   className={'modal-info modal-lg ' + this.props.className}>
							  <ModalHeader toggle={this.toggleDetailGuru}>Detail Guru</ModalHeader>
							  <ModalBody>
								<Form action="" method="post" className="form-horizontal">
								  <h5>Data Pribadi</h5>
								  <FormGroup row>
								
										<dt className="col-sm-3 text-truncate">NIP</dt>
										<dd className="col-sm-3">93120001</dd>
										
										<dt className="col-sm-3 text-truncate">Nama</dt>
										<dd className="col-sm-3">Lucky Ramdani M.Pd</dd>
										
										<dt className="col-sm-3 text-truncate">Username</dt>
										<dd className="col-sm-3">luckyramdani</dd>
										
										<dt className="col-sm-3 text-truncate">Password</dt>
										<dd className="col-sm-3">luckyramdani</dd>
									
								  </FormGroup>
								  
								  <h5>Data Mengajar</h5>
								  <FormGroup row>
									<Col sm="12">
									<Table responsive size="sm">
									  <thead>
									  <tr>
										<th>Mata Pelajaran</th>
										<th>Kelas</th>
									  </tr>
									  </thead>
									  <tbody>
									  <tr>
										<td>Biologi</td>
										<td>x-IPA1</td>
									  </tr>
									   <tr>
										<td>Geografi</td>
										<td>x-IPA1</td>
									   </tr>
									  <tr>
										<td>Pendidikan Kewarganegaraan</td>
										<td>x-IPA1</td>
									  </tr>
									  <tr>
										<td>Pendidikan Kewarganegaraan</td>
										<td>x-IPA2</td>
									  </tr>
									  <tr>
										<td>Pendidikan Kewarganegaraan</td>
										<td>x-IPA3</td>
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
									</Col>
								  </FormGroup>
								</Form>
							  </ModalBody>
							  
							  <ModalFooter>
								<Button color="success" onClick={this.toggleTambahGuru}>Kembali</Button>{' '}
							  </ModalFooter>
							  
							</Modal>

						<Button className="btn-stack-overflow btn-brand icon btn-sm" onClick={this.toggleUpdateGuru}><i className="fa fa-pencil"></i></Button>
							<Modal isOpen={this.state.warning} toggle={this.toggleUpdateGuru}
								   className={'modal-warning modal-lg ' + this.props.className}>
							  <ModalHeader toggle={this.toggleUpdateGuru}>Update Guru</ModalHeader>
                  <ModalBody>
                    <Form action="" method="post" className="form-horizontal">
					  <h6>Data Pribadi</h6>
					  <FormGroup row>
						<Col sm="3">
						  <p><Input bsSize="sm" type="text" placeholder="NIP" required /></p>
						</Col>
						<Col sm="3">
						  <p><Input bsSize="sm" type="text" placeholder="Nama Guru" required/></p>
						</Col>
						<Col sm="3">
						  <p><Input bsSize="sm" type="text" placeholder="Username" required/></p>
						</Col>
						<Col sm="">
						  <p><Input bsSize="sm" type="text" placeholder="Password" required/></p>
						</Col>
					  </FormGroup>
					  
					  <h6>Data Mengajar</h6>
					  <FormGroup row>
						<Col sm="5">
						  <p><Input bsSize="sm" type="select">
							<option value="">Pilih Mata Pelajaran ...</option>
							<option value="Biologi">Biologi</option>
							<option value="Geografi">Geografi</option>
							<option value="Sejarah">Sejarah</option>
							<option value="Pendidikan Kewarganegaraan">Pendidikan Kewarganegaraan</option>
						  </Input></p>
						</Col>
						
						<Col sm="5">
						  <p><Input bsSize="sm" type="select">
							<option value="">Pilih Kelas ...</option>
							<option value="X-IPA1">X-IPA1</option>
							<option value="X-IPA2">X-IPA2</option>
							<option value="X-IPA3">X-IPA3</option>
							<option value="X-IPA4">X-IPA4</option>
						  </Input></p>
						</Col>
						
						<Col sm="2">
							<p><Button bsSize="sm" color="success">+Tambah</Button></p>
						</Col>
						
						<Col sm="12">
						<Table responsive bsSize="sm">
						  <thead>
						  <tr>
							<th>Mata Pelajaran</th>
							<th>Kelas</th>
							<th>Aksi</th>
						  </tr>
						  </thead>
						  <tbody>
						  <tr>
							<td>Biologi</td>
							<td>x-IPA1</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						   <tr>
							<td>Geografi</td>
							<td>x-IPA1</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						  <tr>
							<td>Pendidikan Kewarganegaraan</td>
							<td>x-IPA1</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						  <tr>
							<td>Pendidikan Kewarganegaraan</td>
							<td>x-IPA2</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
						  </tr>
						  <tr>
							<td>Pendidikan Kewarganegaraan</td>
							<td>x-IPA3</td>
							<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
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
						</Col>
					  </FormGroup>
					</Form>
                  </ModalBody>
							  <ModalFooter>
								<Button color="danger" onClick={this.toggleUpdateGuru}>Cancel</Button>
								<Button color="success" onClick={this.toggleUpdateGuru}>Update</Button>{' '}
							  </ModalFooter>
							</Modal>
						
						
				<Button className="btn-youtube btn-brand icon btn-sm" onClick={this.toggleDeleteGuru}><i className="fa fa-trash"></i></Button>
				<Modal isOpen={this.state.danger} toggle={this.toggleDeleteGuru}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDeleteGuru}>Delete Guru</ModalHeader>
                  <ModalBody>
					<p> Apakah anda yakin ingin menghapus <b>Lucky Ramdani M.Pd</b> dari data guru ?</p>
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleDeleteGuru}>Tidak</Button>
                    <Button color="success" onClick={this.toggleDeleteGuru}>Ya</Button>{' '}
                  </ModalFooter>
                </Modal>
					</td>
                  </tr>
                  <tr>
                    <td>93120001</td>
                    <td>Lucky Ramdani M.Pd</td>
                    <td>luckyramdani</td>
					<td>luckyramdani</td>
					<td>
						<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>93120001</td>
                    <td>Lucky Ramdani M.Pd</td>
                    <td>luckyramdani</td>
					<td>luckyramdani</td>
					<td>
						<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>93120001</td>
                    <td>Lucky Ramdani M.Pd</td>
                    <td>luckyramdani</td>
					<td>luckyramdani</td>
					<td>
						<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>93120001</td>
                    <td>Lucky Ramdani M.Pd</td>
                    <td>luckyramdani</td>
					<td>luckyramdani</td>
					<td>
						<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
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

export default Guru;
