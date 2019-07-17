import React, { PureComponent } from 'react';
import { CardBody, Col, Table, Button,Form, FormGroup, Input } from 'reactstrap';
import DataMatapelajaran from '../../models';
import { MatapelajaranViewModel } from '../../viewmodels/datamaster';
import { ModalForm, LayoutCard, Loading } from '../../layout';
import { isNullOrUndefined } from 'util';


/**
 * Mata Pelajaran View
 */
interface ModalState {
  tambah: boolean;
  edit: boolean;
  delete: boolean;
}

interface MatapelajaranViewStateData {
  modal: Partial<ModalState>;
  selected_data?: Partial<DataMatapelajaran>;
  list_matapelajaran: Array<DataMatapelajaran>;
  isLoading: boolean;
};

interface MatapelajaranViewAttribute { className: string; }

/**
* Pengelola Data Mata Pelajaran
*/

class Matapelajaran extends PureComponent<MatapelajaranViewAttribute, MatapelajaranViewStateData>
{
  readonly vm: MatapelajaranViewModel;

  constructor(props:Readonly<MatapelajaranViewAttribute>) 
  {
    super(props);
    
    this.state = {
      modal: { tambah: false, edit: false, delete: false },
      list_matapelajaran: [],
      isLoading: true
    };

    this.toggleUpdateMatapelajaran = this.toggleUpdateMatapelajaran.bind(this);
    this.toggleDeleteMatapelajaran = this.toggleDeleteMatapelajaran.bind(this);

    this.tambahMatapelajaran = this.tambahMatapelajaran.bind(this);
    this.editMatapelajaran = this.editMatapelajaran.bind(this);
    this.deleteMatapelajaran = this.deleteMatapelajaran.bind(this);

    this.vm = new MatapelajaranViewModel();
  }

  componentDidMount()
  {
    this.vm.initDatamatapelajaran().then(list => {
      this.setState({ list_matapelajaran: list, isLoading: false});
    });
  }
  
  //---------------------------TOGGLE-----------------------------//

  toggleTambahMatapelajaran() {
    this.setState({modal: { tambah: !this.state.modal.tambah }});
  }

  toggleUpdateMatapelajaran(datamatapelajaran?:Partial<DataMatapelajaran>) 
  {
    var state_edit = this.state.modal.edit || false;
    if(isNullOrUndefined(datamatapelajaran))
      this.setState({
        modal: { edit: !state_edit }
      });
    else
      this.setState({
        modal: { edit: !state_edit },
        selected_data: datamatapelajaran
      });
  }
  
  toggleDeleteMatapelajaran(datamatapelajaran?:Partial<DataMatapelajaran>) 
  {
    var state_delete = this.state.modal.delete || false;
    if(isNullOrUndefined(datamatapelajaran))
      this.setState({
        modal: { delete: !state_delete }
      });

    else
      this.setState({
        modal: { delete: !state_delete },
        selected_data: datamatapelajaran
      });
  }

  //--------------------------- HANDLE CRUD UI -------------------------//

  tambahMatapelajaran(event: any)
  {
    event.preventDefault();
    var fdata = new FormData(event.target);
    var data = {
      namaMapel: fdata.get('namaMapel'),
      KKM: fdata.get('KKM')
    };
    this.vm.inputDatamatapelajaran(data).then(list => {
      this.setState({ list_matapelajaran: list });
    });
  }


  editMatapelajaran(event: any)
  {
    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();
      var fdata = new FormData(event.target);
      var data = {
        namaMapel: fdata.get('namaMapel'),
        KKM: fdata.get('KKM')
      };
      var idmapel = this.state.selected_data.idmapel;
      if(!isNullOrUndefined(idmapel)) this.vm.updateMatapelajaran(idmapel, data).then(list => {
        this.setState({ list_matapelajaran: list, modal: { edit: false } });
      });
    }
  }


  deleteMatapelajaran(event: any)
  {
    if(this.state.selected_data !== undefined)
    {
      event.preventDefault();
      var idmapel= this.state.selected_data.idmapel;
      if(!isNullOrUndefined(idmapel)) this.vm.hapusMatapelajaran(idmapel).then(list => {
        this.setState({list_matapelajaran: list, modal: { delete: !this.state.modal.delete }});
      });
    }
  }


// ----------------------- RENDER -------------------------------- //
renderModalEdit()
{
  if(this.state.selected_data === undefined) return;
  
  var namaMapel = this.state.selected_data.namaMapel;
  var KKM = this.state.selected_data.KKM;

  return (
    <ModalForm 
      className={'modal-warning ' + this.props.className}
      header={ "Edit Mata Pelajaran "}
      strsubmit="Simpan"
      isOpen={ this.state.modal.edit }
      toggle={ this.toggleUpdateMatapelajaran }
      onClickSubmit={ this.editMatapelajaran }>
      <FormGroup row>
        <Col sm="12">
          <Input type="text" defaultValue={namaMapel}
            name="namaMapel" required />
          <Input type="number" min="0" max="100" defaultValue={KKM}
            name="KKM" required />
        </Col>
      </FormGroup>
    </ModalForm>
  );
}

renderModalDelete()
{
  if(this.state.selected_data === undefined) return;

  var namaMapel = this.state.selected_data.namaMapel;

  return (
    <ModalForm 
      className={"modal-danger " + this.props.className}
      header="Hapus Mata Pelajaran"
      strsubmit="Ya"
      isOpen={ this.state.modal.delete }
      toggle={ this.toggleDeleteMatapelajaran }
      onClickSubmit={ this.deleteMatapelajaran }>
      <p> Apakah anda yakin ingin menghapus <b>{namaMapel}</b> dari data Mata Pelajaran ?</p>
    </ModalForm>
  )
}

render() 
{
  var list_matapelajaran = this.state.list_matapelajaran;

  if(this.state.isLoading)
    return (Loading);

  return (
    <LayoutCard>
    <CardBody>
      <Form onSubmit={ this.tambahMatapelajaran } className="form-horizontal">
        <FormGroup row>
          <Col sm="4">
            <Input type="text" name="namaMapel" placeholder="Nama Mata Pelajaran" required/>
          </Col>
          <Col sm="4">
            <Input type="number" min="0" max="100" placeholder="KKM"
              name="KKM" required />
          </Col>
          <Col sm="4">
            <Button size="sm" type="submit" color="success" className="px-4"><i className="fa fa-plus"></i><span>Tambah Mata Pelajaran</span></Button>
          </Col>
        </FormGroup>
      </Form>

      { this.renderModalEdit() }

      { this.renderModalDelete() }
  
      <Table responsive reflow size="sm">
        <thead>
        <tr>
          <th>Mata Pelajaran</th>
          <th>Nilai KKM</th>
          <th>Aksi</th>
        </tr>
        </thead>
        <tbody>
          {
            list_matapelajaran.map(matapelajaran => {
              return (
                <tr>
                  <td>{ matapelajaran.namaMapel }</td>
                  <td>{ matapelajaran.KKM }</td>
                  <td>
                    <Button 
                      className="btn-stack-overflow btn-brand icon btn-sm" 
                      onClick={ (e:any) => this.toggleUpdateMatapelajaran(matapelajaran) }>
                      <i className="fa fa-pencil"></i>
                    </Button>
                    <Button 
                      className="btn-youtube btn-brand icon btn-sm" 
                      onClick={ (e:any) => this.toggleDeleteMatapelajaran(matapelajaran) }>
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

export default Matapelajaran;
