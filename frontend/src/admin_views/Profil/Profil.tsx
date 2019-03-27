import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface ProfilStateModeel {
	modal: boolean;
	primary: boolean;
};

interface ProfilModel { className:string; }

class Profil extends Component<ProfilModel, ProfilStateModeel>
{
  constructor(props: Readonly<ProfilModel>) 
  {
    super(props);

    this.state = {
      modal: false,
      primary: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleGantiPassword = this.toggleGantiPassword.bind(this);
  }
    toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleGantiPassword() {
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

              </CardHeader>

              <CardBody>

			  <Col sm="6">
					<p><Button size="sm" onClick={this.toggleGantiPassword} className="btn-twitter btn-brand mr-1 mb-1 "><i className="fa fa-lock"></i><span>Ganti Password</span></Button></p>
			  </Col>

				<Modal isOpen={this.state.primary} toggle={this.toggleGantiPassword} className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleGantiPassword}>Ganti Password</ModalHeader>
                  <ModalBody>
					<p><Input type="password" placeholder="Password Lama" autoComplete="current-password" required /></p>
					<p><Input type="password" placeholder="Password Baru" autoComplete="current-password" required /></p>
                  </ModalBody>
                  <ModalFooter>
				    <Button color="danger" onClick={this.toggleGantiPassword}>Cancel</Button>
                    <Button color="success" onClick={this.toggleGantiPassword}>Ganti Password</Button>{' '}
                  </ModalFooter>
                </Modal>

			  <Form action="" method="post" className="form-horizontal">
								  <h5>Data Pribadi</h5>
								  <FormGroup row>

										<dt className="col-sm-3 text-truncate">NIP</dt>
										<dd className="col-sm-3">93120001</dd>

										<dt className="col-sm-3 text-truncate">Nama</dt>
										<dd className="col-sm-3">Lucky Ramdani M.Pd</dd>

										<dt className="col-sm-3 text-truncate">Username</dt>
										<dd className="col-sm-3">luckramdani</dd>

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

			  </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Profil;