import React, { PureComponent } from 'react';
import { CardBody, Col, Table, Button,Form, FormGroup, Input } from 'reactstrap';
import DataKelas from '../../models/item_model';
import { initDatakelas, inputDatakelas, updateKelas, hapusKelas } from '../../models/KelasData';
import { ModalForm, LayoutCard } from '../../layout';

/**
 * Kelas View
 */
interface ModalState {
  tambah: boolean;
  edit: boolean;
  delete: boolean;
}

interface KelasViewStateData {
	modal: Partial<ModalState>;
  selected_data?:Partial<DataKelas>;
  list_kelas: Array<DataKelas>;
  isLoading: boolean;
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
      modal: { tambah: false, edit:false, delete:false },
      list_kelas: [],
      isLoading: true
    };

    this.toggleUpdateKelas = this.toggleUpdateKelas.bind(this);
    this.toggleDeleteKelas = this.toggleDeleteKelas.bind(this);

    this.tambahKelas = this.tambahKelas.bind(this);
    this.editKelas = this.editKelas.bind(this);
    this.deleteKelas = this.deleteKelas.bind(this);
  }

  componentDidMount()
  {
    initDatakelas().then(list => {
      this.setState({ list_kelas: list, isLoading: false });
    });
  }

  //----------------------------- TOOGLE ----------------------------- //

  toggleTambahKelas() {
    this.setState({modal: { tambah: !this.state.modal.tambah }});
  }

  toggleUpdateKelas(datakelas?:Partial<DataKelas>) 
  {
    var state_edit = this.state.modal.edit || false;
    if(datakelas === undefined)
      this.setState({
        modal: { edit: !state_edit }
      });
    else
      this.setState({
        modal: { edit: !state_edit },
        selected_data: datakelas
      });
  }
  
  toggleDeleteKelas(datakelas?:Partial<DataKelas>) 
  {
    var state_delete = this.state.modal.delete || false;
    if(datakelas === undefined)
      this.setState({
        modal: { delete: !state_delete }
      });

    else
      this.setState({
        modal: { delete: !state_delete },
        selected_data: datakelas
      });
  }

  //--------------------------- HANDLE CRUD UI -------------------------//

  tambahKelas(event: any)
  {
    event.preventDefault();
    var fdata = new FormData(event.target);
    var data = {
      namaKelas: fdata.get('namaKelas')
    };
    inputDatakelas(data).then(list => {
      this.setState({ list_kelas: list });
    });
  }


  editKelas(event: any)
  {
    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();
      var fdata = new FormData(event.target);
      var data = {
        namaKelas: fdata.get('namaKelas')
      };
      var idkelas = this.state.selected_data.idkelas;
      if(idkelas !== undefined) updateKelas(idkelas, data).then(list => {
        this.setState({ list_kelas: list, modal: { edit: false } });
      });
    }
  }


  deleteKelas(event: any)
  {
    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();
      var idkelas = this.state.selected_data.idkelas;
      if(idkelas !== undefined) hapusKelas(idkelas).then(list => {
        this.setState({list_kelas: list, modal: { delete: !this.state.modal.delete }});
      });
    }
  }

  // ----------------------- RENDER -------------------------------- //
  renderModalEdit()
  {
    if(this.state.selected_data === undefined) return;
    
    var namaKelas = this.state.selected_data.namaKelas;

    return (
      <ModalForm 
        className={'modal-warning ' + this.props.className}
        header={ "Edit Kelas "}
        strsubmit="Edit"
        isOpen={ this.state.modal.edit }
        toggle={ this.toggleUpdateKelas }
        onClickSubmit={ this.editKelas }>
        <FormGroup row>
          Nama Kelas {namaKelas} Baru
          <Col sm="12">
            <Input type="text" placeholder={namaKelas}
              name="namaKelas" required />
          </Col>
        </FormGroup>
      </ModalForm>
    );
  }

  renderModalDelete()
  {
    if(this.state.selected_data === undefined) return;

    var namaKelas = this.state.selected_data.namaKelas;

    return (
      <ModalForm 
        className={"modal-danger " + this.props.className}
        header={"Delete Kelas " + namaKelas } 
        strsubmit="Ya"
        isOpen={ this.state.modal.delete }
        toggle={ this.toggleDeleteKelas }
        onClickSubmit={ this.deleteKelas }>
        <p> Apakah anda yakin ingin menghapus <b>{namaKelas}</b> dari data Kelas ?</p>
      </ModalForm>
    )
  }

  render() 
  {
    var list_kelas = this.state.list_kelas;

    if(this.state.isLoading)
      return (<div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>);
  
    return (
      <LayoutCard>
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
      </LayoutCard>
    );
  }
}

export default Kelas;