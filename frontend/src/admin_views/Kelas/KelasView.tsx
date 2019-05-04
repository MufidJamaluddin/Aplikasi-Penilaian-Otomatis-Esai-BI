import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Table, Button,Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DataKelas from '../../item_model';
import { initDatakelas, inputDatakelas, updateKelas, hapusKelas } from './KelasData';

/**
 * Kelas View
 */

interface KelasViewStateData {
	modal: boolean;
	primary: boolean;
	large: boolean;
	warning : boolean;
  danger : boolean;
  selected_data?:Partial<DataKelas>;
  list_kelas: Array<DataKelas>;
};

interface KelasViewAttribute { className:string; }

/**
 * Pengelola Data Kelas
 */
class Kelas extends PureComponent<KelasViewAttribute, KelasViewStateData>
{
  constructor(props: Readonly<KelasViewAttribute>) 
  {
    super(props);

    this.state = {
      modal: false,
      primary: false,
      large: false,
      warning : false,
      danger: false,

      // Data yg di klik
      selected_data: undefined,

      // list kelas
      list_kelas: []
    };

    this.toggle = this.toggle.bind(this);
    this.toggleUpdateKelas = this.toggleUpdateKelas.bind(this);
    this.toggleDeleteKelas = this.toggleDeleteKelas.bind(this);

    this.tambahKelas = this.tambahKelas.bind(this);
    this.editKelas = this.editKelas.bind(this);
    this.deleteKelas = this.deleteKelas.bind(this);
  }

  componentWillMount()
  {
    initDatakelas().then(list => {
      this.setState({ list_kelas: list });
    });
  }

  //----------------- TOOGLE ------------------ //

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleUpdateKelas(datakelas?:Partial<DataKelas>) 
  {
    if(datakelas === undefined)
      this.setState({
        warning: !this.state.warning,
      });
    
    else
      this.setState({
        warning: !this.state.warning,
        selected_data: datakelas
      });
  }
  
 toggleDeleteKelas(datakelas?:Partial<DataKelas>) 
 {
    if(datakelas === undefined)
      this.setState({
        danger: !this.state.danger,
      });

    else
      this.setState({
        danger: !this.state.danger,
        selected_data: datakelas
      });
  }

  // -------------- HANDLE EVENT -------------//

  // ----------- Handle Submit Tambah Kelas ---------------//

  tambahKelas(event: any)
  {
    event.preventDefault();

    //if(event.keyCode !== 13) retturn;

    var fdata = new FormData(event.target);

    var data = {
      namaKelas: fdata.get('namaKelas')
    };

    inputDatakelas(data).then(list => {
      this.setState({ list_kelas: list });
    });
    
  }

  // ----------- Handle Submit Edit Kelas ---------------//

  editKelas(event: any)
  {
    //if(event.keyCode !== 13) return;

    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();

      var fdata = new FormData(event.target);

      var data = {
        namaKelas: fdata.get('namaKelas')
      };

      var idkelas = this.state.selected_data.idkelas;
      if(idkelas !== undefined) updateKelas(idkelas, data).then(list => {
        this.setState({ list_kelas: list, warning: false });
      });
    }
  }
  
  // ----------- Handle Submit Delete Kelas ---------------//

  deleteKelas(event: any)
  {
    //if(event.keyCode !== 13) return; 

    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();

      var idkelas = this.state.selected_data.idkelas;

      if(idkelas !== undefined) hapusKelas(idkelas).then(list => {
        this.setState({ list_kelas: list, danger: false });
      });

    }
  }

  renderModalEdit()
  {
    return (
      <Modal isOpen={this.state.warning} toggle={this.toggleUpdateKelas} className={'modal-warning  ' + this.props.className}>		
        <Form onSubmit={this.editKelas} className="form-horizontal">
        <ModalHeader toggle={this.toggleUpdateKelas}>Update Kelas</ModalHeader>
          <ModalBody>
            
            
              <FormGroup row>
                <Col sm="12">
                    <Input 
                      type="text" 
                      placeholder="Nama Kelas"
                      name="namaKelas" 
                      required />
                </Col>
              </FormGroup>
        </ModalBody>		  
        <ModalFooter>
        
          <Button color="danger" onClick={(e:any) => this.toggleUpdateKelas() }>Cancel</Button>
          <Button color="success" type="submit">Edit</Button>
        </ModalFooter>
        </Form>	
    </Modal>
    );
  }

  renderModalDelete()
  {
    if(this.state.selected_data === undefined)
      return;

    var namaKelas = this.state.selected_data.namaKelas;

    return (
      <Modal isOpen={this.state.danger} toggle={this.toggleDeleteKelas} className={'modal-danger ' + this.props.className}>
        <Form onSubmit={this.deleteKelas} className="form-horizontal">    
          <ModalHeader toggle={this.toggleDeleteKelas}>Delete Kelas</ModalHeader>
            <ModalBody><p> Apakah anda yakin ingin menghapus <b>{namaKelas}</b> dari data Kelas ?</p></ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={(e:any) => this.toggleDeleteKelas() }>Tidak</Button>
              <Button color="success" type="submit">Ya</Button>
            </ModalFooter>
        </Form>
      </Modal>
    )
  }

  render() 
  {
    var list_kelas = this.state.list_kelas;

    if(list_kelas === undefined)
      return (<h3>Loading Data...</h3>);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>

								<Form onSubmit={ this.tambahKelas } className="form-horizontal">
									<FormGroup row>
										<Col sm="4">
											<Input type="text" name="namaKelas" placeholder="Nama Kelas" required/>
										</Col>
										<Col sm="2">
											<Button size="sm" type="submit" color="success" className="px-4"><i className="fa fa-plus"></i><span>Tambah Kelas</span></Button>
										</Col>
									</FormGroup>
								</Form>

                { this.renderModalEdit() }

                { this.renderModalDelete() }
           
                <Table responsive reflow size="sm">
                  <thead>
                  <tr>
                    <th>Nama Kelas</th>
                    <th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      list_kelas.map(kelas => {
                        return (
                          <tr>
                            <td>{ kelas.namaKelas }</td>
                            <td>
                                <Button 
                                    className="btn-stack-overflow btn-brand icon btn-sm" 
                                    onClick={ (e:any) => this.toggleUpdateKelas(kelas) }>
                                    <i className="fa fa-pencil"></i>
                                </Button>
                            
                                <Button 
                                    className="btn-youtube btn-brand icon btn-sm" 
                                    onClick={ (e:any) => this.toggleDeleteKelas(kelas) }>
                                    <i className="fa fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
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