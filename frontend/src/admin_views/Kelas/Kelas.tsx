import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface KelasStateModeel {
	modal: boolean;
	primary: boolean;
	large: boolean;
	warning : boolean;
	danger : boolean;
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
			
    };

    this.toggle = this.toggle.bind(this);
    this.toggleUpdateKelas = this.toggleUpdateKelas.bind(this);
    this.toggleDeleteKelas = this.toggleDeleteKelas.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
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
				<Col sm="4">
					<Input type="text" placeholder="Nama Kelas" required/>
				</Col>
				<Col sm="2">
					<Button bsSize="sm" color="success" className="px-4"><i className="fa fa-plus"></i><span>Tambah Kelas</span></Button>
				</Col>
				
				</FormGroup>
			</Form>	
                <Table responsive reflow size="sm">
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Kelas;
