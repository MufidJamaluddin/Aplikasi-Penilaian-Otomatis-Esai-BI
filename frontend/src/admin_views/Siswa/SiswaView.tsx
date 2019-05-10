import React, { PureComponent } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button,Form, FormGroup, Input, InputGroup,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DataSiswa from '../../models/item_model';
import { initDatasiswa, inputDatasiswa, updateSiswa, hapusSiswa } from './SiswaData';
import { initDatakelas } from '../../models/KelasData';
import DataKelas from '../../models/item_model';


interface SiswaViewStateData {
	modal: boolean;
	tambah: boolean;
	large: boolean;
	edit : boolean;
	delete : boolean;
  info: boolean;
  selected_data?:Partial<DataSiswa>;
  list_siswa: Array<DataSiswa>;
  list_kelas: Array<DataKelas>;
};

interface SiswaViewAttribute { className:string; }
/**
 * Pengelola Data SIswa
 */

class Siswa extends PureComponent<SiswaViewAttribute, SiswaViewStateData>
{
  constructor(props: Readonly<SiswaViewAttribute>) 
  {
    super(props);
    
    this.state = {
      modal: false,
      tambah: false,
	    large: false,
	    edit : false,
	    delete : false,
      info: false,
      
      // Data yg di klik
      selected_data: undefined,

      // list siswa
      list_siswa: [],

      // list kelas
      list_kelas: []
    };

    this.toggle = this.toggle.bind(this);
    this.toggleImportSiswa = this.toggleImportSiswa.bind(this);
	  this.toggleTambahSiswa = this.toggleTambahSiswa.bind(this);
	  this.toggleUpdateSiswa = this.toggleUpdateSiswa.bind(this);
    this.toggleDeleteSiswa = this.toggleDeleteSiswa.bind(this);
    
    this.tambahSiswa = this.tambahSiswa.bind(this);
    this.editSiswa = this.editSiswa.bind(this);
    this.deleteSiswa = this.deleteSiswa.bind(this);
  }

  componentWillMount()
  {
    initDatasiswa().then(list => {
      this.setState({ list_siswa: list });
    });

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

  toggleUpdateSiswa(datasiswa?:Partial<DataSiswa>) 
  {
    if(datasiswa === undefined)
      this.setState({
        edit: !this.state.edit,
      });
    
    else
      this.setState({
        edit: !this.state.edit,
        selected_data: datasiswa
      });
  }
  
 toggleDeleteSiswa(datasiswa?:Partial<DataSiswa>) 
 {
    if(datasiswa === undefined)
      this.setState({
        delete: !this.state.delete,
      });

    else
      this.setState({
        delete: !this.state.delete,
        selected_data: datasiswa
      });
  }

  
  public toggleTambahSiswa()
  {
      this.setState({
        tambah: !this.state.tambah,
      });
  }
  
  toggleImportSiswa() {
    this.setState({
      info: !this.state.info,
    });
  }

  // -------------- HANDLE EVENT -------------//

  // ----------- Handle Submit Tambah Siswa ---------------//

  tambahSiswa(event: any)
  {
    event.preventDefault();

    //if(event.keyCode !== 13) retturn;

    var fdata = new FormData(event.target);

    var data = {
      nis: fdata.get('nis'),
      idkelas: fdata.get('idkelas'),
      nama: fdata.get('nama'),
      password: fdata.get('nis'),
    };

    inputDatasiswa(data).then(list => {
      this.setState({ list_siswa: list, tambah:false });
    });

  }

  // ----------- Handle Submit Edit Siswa ---------------//

  editSiswa(event: any)
  {
    //if(event.keyCode !== 13) return;

    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();

      var fdata = new FormData(event.target);

      var data = {
      idkelas: fdata.get('idkelas'),
      nama: fdata.get('nama'),
      password: fdata.get('password'),
      };

      var nis = this.state.selected_data.nis;
      if(nis !== undefined) updateSiswa(nis, data).then(list => {
        this.setState({ list_siswa: list, edit: false });
      });
    }
  }

  // ----------- Handle Submit Delete Siswa ---------------//

  deleteSiswa(event: any)
  {
    //if(event.keyCode !== 13) return; 

    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();

      var nis = this.state.selected_data.nis;

      if(nis !== undefined) hapusSiswa(nis).then(list => {
        this.setState({ list_siswa: list, delete: false });
      });

    }
  }
  
  renderModalTambah()
  {
    var list_kelas = this.state.list_kelas;
  
    if(list_kelas === undefined)
      list_kelas = [];
  
    return (
      <Modal isOpen={this.state.tambah} toggle={this.toggleTambahSiswa} className={'modal-success ' + this.props.className}>
        <Form onSubmit={this.tambahSiswa} className="form-horizontal">
          <ModalHeader toggle={this.toggleTambahSiswa}>Tambah Siswa</ModalHeader>
          
          <ModalBody>
            <FormGroup row>
            
            <Col sm="12">
              <Input  
                type="text" 
                placeholder="NIS" 
                name="nis"
                required/>
            </Col>

            <Col sm="12">
              <Input  
                type="text" 
                placeholder="Nama Siswa" 
                name="nama"
                required/>
            </Col>
              
            <Col sm="12">
              <Input type="select" name="idkelas">
                { 
                  list_kelas.map(kelas => {
                    return (<option value={ kelas.idkelas }>{ kelas.namaKelas }</option>)
                  })
                }
              </Input>
            </Col>

          </FormGroup>
        </ModalBody>
        
        <ModalFooter>
          <Button color="danger" onClick= {(e:any) => this.toggleTambahSiswa() }>Cancel</Button>
          <Button color="success" type="submit">Tambah</Button>
        </ModalFooter>
        
      </Form>
    </Modal>);
  }

  renderModalEdit()
  {
    var list_kelas = this.state.list_kelas;
    var datasiswa = this.state.selected_data;

    if(list_kelas === undefined) return;

    var nama = '';
    var idkelas = '';
    var namaKelas = '';
    
    if(datasiswa !== undefined) 
    {
      nama = datasiswa.nama || '';
      idkelas = datasiswa.idkelas || '';
      let kelas = datasiswa.kelas;
      if(kelas !== undefined) namaKelas = kelas.namaKelas || '';
    }
    
    return (
      <Modal isOpen={this.state.edit} toggle={this.toggleUpdateSiswa} className={'modal-warning modal-md' + this.props.className}>
      <Form onSubmit={this.editSiswa} className="form-horizontal">
        <ModalHeader toggle={this.toggleUpdateSiswa}>Update Siswa</ModalHeader>
        <ModalBody>
     
          <FormGroup row>
        
          <Col sm="12">
          <p><Input  
              type="text" 
              defaultValue={nama} 
              name="nama"
              required/>
          </p>
          </Col>
          
          <Col sm="12">
          <p>
            <Input type="select" name="idkelas" >
              <option value={ idkelas } selected>{ namaKelas }</option>
              { 
                list_kelas.map(kelas => {
                  return (<option value={ kelas.idkelas }>{ kelas.namaKelas }</option>)
                })
              }
            </Input>
          </p>
          </Col>

          <Col sm="12">
          <p><Input  type="text" 
          placeholder="Password" 
          name="password"
          required/></p>
          </Col>

            </FormGroup>
          </ModalBody>		  
          
          <ModalFooter>
            <Button color="danger" onClick= {(e:any) => this.toggleUpdateSiswa() }>Cancel</Button>
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

    var nama = this.state.selected_data.nama;

    return (
    <Modal isOpen={this.state.delete} toggle={this.toggleDeleteSiswa} className={'modal-danger ' + this.props.className}>
      <Form onSubmit={this.deleteSiswa} className="form-horizontal">
        <ModalHeader toggle={this.toggleDeleteSiswa}>Delete Siswa</ModalHeader>
        
        <ModalBody>
        <p> Apakah anda yakin ingin menghapus <b>{nama}</b> dari data Siswa ?</p>
        </ModalBody>
        
        <ModalFooter>
          <Button color="danger" onClick={(e:any) => this.toggleDeleteSiswa() }>Tidak</Button>
          <Button color="success" type="submit">Ya</Button>
        </ModalFooter>
      </Form>
    </Modal>

    );
  }

  render() 
  {
      var list_siswa = this.state.list_siswa;
  
      if(list_siswa === undefined)
        return (<h3>Loading Data...</h3>);
  
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
				      <Modal isOpen={this.state.large} toggle={this.toggleImportSiswa}
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
				 
                { this.renderModalTambah() }
                { this.renderModalEdit() }
                { this.renderModalDelete() }              

			          <Button size="sm" onClick={this.toggleTambahSiswa} className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-plus"></i><span>Tambah Siswa</span></Button>
      
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th>NIS</th>
                      <th>Nama Siswa</th>
                      <th>Kelas</th>
                      <th>Username</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {
                    list_siswa.map(siswa => {
                      return (
                      <tr>
                        <td>{siswa.nis}</td>
                        <td>{siswa.nama}</td>
					              <td>{siswa.kelas.namaKelas}</td>
                        <td>{siswa.nis}</td>
					              <td>
                          <Button className="btn-stack-overflow btn-brand icon btn-sm" 
                            onClick={ (e:any) => this.toggleUpdateSiswa(siswa) }>
                            <i className="fa fa-pencil"></i>
                          </Button>
                          
                          <Button className="btn-youtube btn-brand icon btn-sm" 
                          onClick={ (e:any) => this.toggleDeleteSiswa(siswa) }>
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

export default Siswa;
