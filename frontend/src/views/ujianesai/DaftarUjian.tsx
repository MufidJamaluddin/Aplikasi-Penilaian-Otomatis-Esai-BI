import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, InputGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DataUjian from '../../models';
import { ModalForm } from '../../layout';
import { UjianViewModel } from '../../viewmodels/ujianesai';
import { isNullOrUndefined } from 'util';

/**
 * Ujian Modal
 */
interface ModalState {
	delete: boolean;
}

/**
 * State dan Atribute View Class
 */
interface UjianStateModel { 
  modal:Partial<ModalState>; 
  state:boolean; 
  listujian: Array<DataUjian>;
  selected_data?: Partial<DataUjian>;
  isLoading:boolean;
};

interface UjianModel { className?: string; }

/**
 * Kelas Ujian
 */
class Ujian extends Component<UjianModel, UjianStateModel>
{
  readonly vm: UjianViewModel;

  constructor(props: Readonly<UjianModel>) 
  {
    super(props);

    this.state = {
      modal: { },
      state: false,
      listujian: [],
      isLoading: true,
    };

    this.toggleDeleteUjian = this.toggleDeleteUjian.bind(this);
    this.onDeleteDataUjian = this.onDeleteDataUjian.bind(this);
    this.getElementStatus = this.getElementStatus.bind(this);

    this.vm = UjianViewModel.getInstance();
  }

  // --------------------------- INIT DATA ------------------------------------------//

  public componentDidMount()
  {
    this.vm.initDataUjian().then(list => {
      this.setState({ listujian: list });
    });
  }

  //----------------------------- TOGGLE --------------------------------------------//

  
	public toggleDeleteUjian(dataujian?: Partial<DataUjian>) 
	{
		var state = this.state.modal.delete || false;

		if(isNullOrUndefined(dataujian)) 
			this.setState({ modal: { delete: !state } });
		else
			this.setState({ modal: { delete: !state }, selected_data: dataujian });
  }

  public getElementStatus(status_ujian: string): JSX.Element
  {
    switch(status_ujian)
    {
      case "3":
      case "2":
        return (<span className="badge badge-success">Terlaksana</span>);
      case "1":
        return (<span className="badge badge-primary">Sedang Dilaksanakan</span>);
      default:
        return (<span className="badge badge-danger">Belum Dilaksanakan</span>);
    }
  }

  public renderButtonStatus(ujian:DataUjian)
  {
    if(ujian.status_ujian == "0")
    {
      return(
        <div>
          <Link to={"/ujian/detail/"+ ujian.idujian}>
              <Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
          </Link>	
                        
          <Link to={"/ujian/update/"+ ujian.idujian}>
              <Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-edit"></i></Button>
          </Link>
          
          <Button className="btn-youtube btn-brand icon btn-sm" onClick={(e:any) => this.toggleDeleteUjian(ujian)}><i className="fa fa-trash"></i></Button>
        </div>
      );
    }
    else {
      return(
        <Link to={"/ujian/detail/"+ ujian.idujian}>
            <Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
        </Link>	
                        
      )
    }
  }

// --------------------------------- HANDLE UI -----------------------------------//

    public onDeleteDataUjian(event:any) 
    { 
      event.preventDefault();
      
      var selected_data = this.state.selected_data;
      if(isNullOrUndefined(selected_data)) return;
  
      var idujian = selected_data.idujian;
      if(isNullOrUndefined(idujian)) return;
  
      this.vm.hapusDataUjian(idujian).then(listujian => {
        var state = this.state.modal.delete || false;
        this.setState({ listujian: listujian, modal: { delete: !state } });
      });
    }

//---------------------------------- RENDER --------------------------------------//

renderModalDeleteUjian()
{
  var dataujian = this.state.selected_data;

  if(dataujian === undefined) return;

  return (
    <ModalForm
      className={'modal-danger modal-lg ' + this.props.className}
      header="Hapus Data Ujian"
      strsubmit="Ya"
      isOpen={this.state.modal.delete}
      toggle={this.toggleDeleteUjian}
      onClickSubmit={this.onDeleteDataUjian}>
      <p>Apakah anda yakin ingin menghapus <b>{dataujian.namaUjian ||''}</b> dari data ujian ?</p>
    </ModalForm>
  );
}



  public render() : JSX.Element 
  {
    var listujian = this.state.listujian;
    
    

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
				        <Col md="4">
                  <InputGroup>
                    <Input type="text" id="search" name="search" placeholder="Cari Ujian..." />
                    <Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						      </InputGroup>
                </Col>
              </CardHeader>
			  
              <CardBody>

              { this.renderModalDeleteUjian() }

                <Link to="/ujian/tambah">
                  <Button size="sm"className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-plus"></i><span>Tambah Ujian</span></Button>
                </Link>
              
              <Table responsive size="sm">  
                <thead>
                  <tr>
                    <th>No. Ujian</th>
                    <th>Mata Pelajaran</th>
                    <th>Nama Ujian</th>
                    <th>Status Ujian</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                {
                  listujian.map(ujian => {
                    return (
                      <tr key={ujian.idujian}>
                        <td>{ ujian.idujian }</td>
                        <td>{ ujian.namaMapel }</td>
                        <td>{ ujian.namaUjian }</td>
                        <td>{ this.getElementStatus(ujian.status_ujian) }</td>
                        <td>
                        
                        { this.renderButtonStatus(ujian) }	
                        </td>
                      </tr>
                    );
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

export default Ujian;
