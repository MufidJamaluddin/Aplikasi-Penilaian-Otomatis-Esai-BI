import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import KelasItem from './KelasItem';
import ApiResource from '../../ApiResource';

// FORMAT DARI JSON

interface JKelasItem 
{
  idkelas: string;
  namaKelas: string;
}

interface JKelas
{
  list: Array<JKelasItem>;
}

// VIEW

interface KelasStateModel {
	modal: boolean;
	primary: boolean;
	large: boolean;
	warning : boolean;
  danger : boolean;
  list_kelas: Array<JKelasItem>;
	};

interface KelasModel { className:string; }

class Kelas extends Component<KelasModel, KelasStateModel>
{
  constructor(props: Readonly<KelasModel>) 
  {
    super(props);

    this.state = {
      modal: false,
      primary: false,
      large: false,
      warning : false,
      danger: false,
      list_kelas: []
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

  componentWillMount()
  {
    var that = this;

    ApiResource.get<JKelas>('/api/kelas')
    .then(value => {
      console.log(value.list);
      return JSON.stringify(value.list);
    })
    .then(jsonStr => {
      that.setState({ list_kelas: JSON.parse(jsonStr) });
    })
  }

  render() 
  {
    console.log(this.state.list_kelas);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
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

								<Modal isOpen={this.state.warning} toggle={this.toggleUpdateKelas} className={'modal-warning  ' + this.props.className}>		
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

								<Modal isOpen={this.state.danger} toggle={this.toggleDeleteKelas} className={'modal-danger ' + this.props.className}>
											<ModalHeader toggle={this.toggleDeleteKelas}>Delete Kelas</ModalHeader>
											<ModalBody><p> Apakah anda yakin ingin menghapus <b>XI-IPA1</b> dari data Kelas ?</p></ModalBody>
                  		<ModalFooter>
												<Button color="danger" onClick={this.toggleDeleteKelas}>Tidak</Button>
												<Button color="success" onClick={this.toggleDeleteKelas}>Ya</Button>{' '}
											</ModalFooter>
                </Modal>

                <Table responsive reflow={true} size="sm">
                  <thead>
                  <tr>
                    <th>Nama Kelas</th>
										<th>Aksi</th>
									</tr>
                  </thead>
                  <tbody>
                    {
                      this.state.list_kelas.map(value => {
                        return (
                          <KelasItem 
                            idkelas={value.idkelas}
                            namaKelas={value.namaKelas} 
                            toggleUpdateKelas={this.toggleUpdateKelas} 
                            toggleDeleteKelas={this.toggleDeleteKelas}>
                          </KelasItem>
                        )
                      })
                    }															
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
