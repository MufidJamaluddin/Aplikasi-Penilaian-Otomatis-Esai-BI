import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row, Table, Button,Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import KelasItem from './KelasItem';
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
    if(typeof datakelas !== null)
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
    if(typeof datakelas !== null)
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
        this.setState({ list_kelas: list });
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
        this.setState({ list_kelas: list });
      });

    }
  }

  renderModalEdit()
  {
    if(this.state.selected_data !== undefined)
    {
      var namaKelas = this.state.selected_data.namaKelas;
      
      if(namaKelas !== undefined)
      return (
      <Modal isOpen={this.state.warning} toggle={this.toggleUpdateKelas} className={'modal-warning  ' + this.props.className}>		
        <ModalHeader toggle={this.toggleUpdateKelas}>Update Kelas</ModalHeader>
          <ModalBody>
            
            <Form onSubmit={this.editKelas} className="form-horizontal">
              <FormGroup row>
                <Col sm="12">
                    <Input 
                      type="text" 
                      placeholder="Nama Kelas"
                      name="namaKelas" 
                      value={ this.state.selected_data.namaKelas }
                      required />
                </Col>
              </FormGroup>
            </Form>					
        </ModalBody>		  
        <ModalFooter>
          <Button color="danger">Cancel</Button>
          <Button color="success" type="submit">Edit</Button>
        </ModalFooter>
    </Modal>
    );
    }
  }

  renderModalDelete()
  {
    if(this.state.selected_data !== undefined)
    {
      var namaKelas = this.state.selected_data.namaKelas;
      
      if(namaKelas !== undefined)
        return (
          <Modal isOpen={this.state.danger} toggle={this.toggleDeleteKelas} className={'modal-danger ' + this.props.className}>
            <ModalHeader toggle={this.toggleDeleteKelas}>Delete Kelas</ModalHeader>
            <ModalBody><p> Apakah anda yakin ingin menghapus <b>{ namaKelas }</b> dari data Kelas ?</p></ModalBody>
            <ModalFooter>
              <Button color="danger">Tidak</Button>
              <Button color="success" onClick={this.deleteKelas}>Ya</Button>
            </ModalFooter>
          </Modal>
        )
    }

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
                      list_kelas.map(value => {
                        return (
                          <KelasItem 
                            idkelas={value.idkelas}
                            namaKelas={value.namaKelas} 
                            parent={ this }
                            />
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