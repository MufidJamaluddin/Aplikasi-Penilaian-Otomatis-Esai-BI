import React, { Component } from 'react';
import DataGuru from '../../models/item_model';
import DataMatapelajaran from '../../models/item_model';
import DataKelas from '../../models/item_model';
import { CardBody, CardHeader, Col, Table, Button, Input, InputGroup } from 'reactstrap';
import { ModalForm, LayoutCard } from '../../layout';
import ModalGuruForm from './ModalGuru';
import { initDataGuru, inputDataGuru, updateDataGuru, hapusDataGuru } from '../../models/GuruData';
import { initDatakelas } from '../../models/KelasData';
import { initDatamatapelajaran } from '../../models/MatapelajaranData';

/**
 * Guru View
 */
interface ModalState {
	import: boolean;
  tambah: boolean;
  update: boolean;
	delete: boolean;
	detail: boolean;
}

interface GuruStateModel {
	modal: Partial<ModalState>;
	selected_data?: Partial<DataGuru>;
	list_guru: Array<Partial<DataGuru>>;
	list_mapel: Array<Partial<DataMatapelajaran>>;
	list_kelas: Array<Partial<DataKelas>>;
	isLoading: boolean;
};

interface GuruModel { className:string; }

class Guru extends Component<GuruModel, GuruStateModel>
{
	constructor(props: Readonly<GuruModel>) 
	{
		super(props);
		
    this.state = {
      modal: { },
			list_guru: [],
			list_mapel: [],
			list_kelas: [],
			isLoading: true
    };

		this.toggleImportGuru = this.toggleImportGuru.bind(this);
		this.toggleTambahGuru = this.toggleTambahGuru.bind(this);
		this.toggleUpdateGuru = this.toggleUpdateGuru.bind(this);
		this.toggleDeleteGuru = this.toggleDeleteGuru.bind(this);
		this.toggleDetailGuru = this.toggleDetailGuru.bind(this);

		this.onImportDataGuru = this.onImportDataGuru.bind(this);
		this.onTambahDataGuru = this.onTambahDataGuru.bind(this);
		this.onUpdateDataGuru = this.onUpdateDataGuru.bind(this);
		this.onDeleteDataGuru = this.onDeleteDataGuru.bind(this);
		this.onDetailDataGuru = this.onDetailDataGuru.bind(this);
	}
	
	// --------------------------- INIT DATA ------------------------------------------//

	public componentDidMount()
	{
		initDatamatapelajaran().then(list => {
			this.setState({ list_mapel: list });
		});

		initDatakelas().then(list => {
			this.setState({ list_kelas: list });
		});

		initDataGuru().then(list => {
			this.setState({ list_guru: list, isLoading:false });
		});
	}

	//----------------------------- TOGGLE --------------------------------------------//
 	public toggleTambahGuru() : void 
 	{
		var state = this.state.modal.tambah || false;
    this.setState({ modal: { tambah: !state } });
  }
  
 	public toggleUpdateGuru(dataguru?: Partial<DataGuru>) 
 	{
		var state = this.state.modal.update || false;

		if(dataguru === undefined) 
			this.setState({ modal: { update: !state } });
		else 
			this.setState({ modal: { update: !state }, selected_data: dataguru });
  }
  
	public toggleDeleteGuru(dataguru?: Partial<DataGuru>) 
	{
		var state = this.state.modal.delete || false;

		if(dataguru === undefined) 
			this.setState({ modal: { delete: !state } });
		else
			this.setState({ modal: { delete: !state }, selected_data: dataguru });
  }

	public toggleDetailGuru(dataguru?: Partial<DataGuru>) 
	{
		var state = this.state.modal.detail || false;

		if(dataguru === undefined)
			this.setState({ modal: { detail: !state } });
		else
			this.setState({ modal: { detail: !state }, selected_data: dataguru });
  }

	public toggleImportGuru()
	{
		var state = this.state.modal.import || false;
    this.setState({ modal: { import: !state } });
	}
	// --------------------------------- HANDLE UI -----------------------------------//

	public onImportDataGuru(event:any) 
	{ 
		event.preventDefault();

	}

	public onTambahDataGuru(event:any) 
	{ 
    event.preventDefault();
		var fdata = new FormData(event.target);
	
		var slist = fdata.get('listpengampu');

		console.log(slist);
		
		if(slist===undefined) return;

    var data = {
			namaGuru: fdata.get('namaGuru') as string,
			nip: fdata.get('nip') as string,
			nuptk: fdata.get('nuptk') as string,
			username: fdata.get('username') as string,
			password: fdata.get('username') as string,
			listpengampu: JSON.parse(slist as string) 
		};

		console.log(data);

		inputDataGuru(data).then(listguru =>{
			var state = this.state.modal.tambah || false;
			this.setState({ list_guru: listguru, modal: { tambah: !state } });
		});
	}

	public onUpdateDataGuru(event:any) 
	{ 
		event.preventDefault();
		if(this.state.selected_data === undefined) return;

		var idguru = this.state.selected_data.idguru;
		var fdata = new FormData(event.target);

		var slist = fdata.get('listpengampu');

		console.log(slist);
		
		if(idguru === undefined) return;
		if(slist === undefined) return;

    var data = {
			namaGuru: fdata.get('namaGuru') as string,
			nip: fdata.get('nip') as string,
			nuptk: fdata.get('nuptk') as string,
			listpengampu: JSON.parse(slist as string) 
		};

		console.log(data);

		updateDataGuru(idguru, data).then(listguru =>{
			var state = this.state.modal.update || false;
			this.setState({ list_guru: listguru, modal: { tambah: !state } });
		});
	}

	public onDeleteDataGuru(event:any) 
	{ 
		event.preventDefault();
		
		var selected_data = this.state.selected_data;
		if(selected_data === undefined) return;

		var idguru = selected_data.idguru;
		if(idguru === undefined) return;

		hapusDataGuru(idguru).then(listguru => {
			var state = this.state.modal.delete || false;
			this.setState({ list_guru: listguru, modal: { tambah: !state } });
		});
	}

	public onDetailDataGuru(event:any) 
	{

	}

	//---------------------------------- RENDER --------------------------------------//

	public renderModalImport()
	{
		return (
			<ModalForm
				className={'modal-primary ' + this.props.className}
				isOpen={this.state.modal.import||false} toggle={this.toggleImportGuru}
				header="Import Data Guru" strsubmit="import"
				onClickSubmit={this.onImportDataGuru}>
				<ol>
					<li>
						<a>Download Template XLSX Guru</a>
						<Button size="sm"  className="btn-vine btn-brand mr-1 mb-1 "> <i className="fa fa-download"></i>
						</Button>
					</li>
					<li><a>Isi data guru sesuai dengan format kolom yang tersedia pada Template XLSX<b>(kolom pertama tidak boleh diubah/diedit)</b></a></li>
					<li><a>Upload Template XLSX Guru yang sudah diisi</a></li>
				</ol>
	 			<Input type="file" id="file-input" name="file-input" />
			</ModalForm>
		);
	}

	public renderModalTambahGuru()
	{
		var listkelas = this.state.list_kelas;
		var listmapel = this.state.list_mapel;

		return (
			<ModalGuruForm
				className={'modal-info modal-lg ' + this.props.className}
				header="Tambah Data Guru"
				strsubmit="Tambah"
				isOpen={this.state.modal.tambah}
				toggle={this.toggleTambahGuru}
				onClickSubmit={this.onTambahDataGuru}
				viewonly={false}
				inputusername={true}
				dataguru={undefined}
				listkelas={listkelas}
				listmapel={listmapel}
				>
			</ModalGuruForm>
		);
	}

	public renderModalDetailGuru()
	{
		var dataguru = this.state.selected_data;
		var listkelas = this.state.list_kelas;
		var listmapel = this.state.list_mapel;

		if(dataguru === undefined) return;

		return (
			<ModalGuruForm
				className={'modal-info modal-lg ' + this.props.className}
				header="Edit Data Guru"
				isOpen={this.state.modal.detail}
				toggle={this.toggleDetailGuru}
				onClickSubmit={this.onDetailDataGuru}
				viewonly={true}
				dataguru={dataguru}
				listkelas={listkelas}
				listmapel={listmapel}
				>
			</ModalGuruForm>
		);
	}

	public renderModalUpdateGuru()
	{
		var dataguru = this.state.selected_data;
		var listkelas = this.state.list_kelas;
		var listmapel = this.state.list_mapel;

		if(dataguru === undefined) return;
		
		return (
			<ModalGuruForm
				className={'modal-warning modal-lg ' + this.props.className}
				header="Edit Data Guru"
				strsubmit="Edit"
				isOpen={this.state.modal.update}
				toggle={this.toggleUpdateGuru}
				onClickSubmit={this.onUpdateDataGuru}
				dataguru={dataguru}
				listkelas={listkelas}
				listmapel={listmapel}
				>
			</ModalGuruForm>
		);
	}

	renderModalDeleteGuru()
	{
		var dataguru = this.state.selected_data;

		if(dataguru === undefined) return;

		return (
			<ModalForm
				className={'modal-danger modal-lg ' + this.props.className}
				header="Edit Data Guru"
				strsubmit="Ya"
				isOpen={this.state.modal.delete}
				toggle={this.toggleDeleteGuru}
				onClickSubmit={this.onDeleteDataGuru}>
				<p>Apakah anda yakin ingin menghapus <b>{dataguru.namaGuru ||''}</b> dari data guru ?</p>
			</ModalForm>
		);
	}

	public render() : JSX.Element
	{
		if(this.state.isLoading)      
			return (
				<div className="d-flex justify-content-center">
					<div className="spinner-border text-success" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);

    return (
      <LayoutCard>
				<CardHeader>
					<Col md="4">
						<InputGroup>
							<Input type="text" id="search" name="search" placeholder="Cari Guru..." />
							<Button type="button" color="primary"><i className="fa fa-search"></i></Button>
						</InputGroup>
					</Col>
				</CardHeader>
				<CardBody>
				
					{ this.renderModalImport() }
					<Button size="sm" onClick={this.toggleImportGuru} className="btn-twitter btn-brand mr-1 mb-1 "><i className="fa fa-upload"></i><span>Import Data Guru</span></Button>
					
					{ this.renderModalTambahGuru() }
					<Button size="sm" onClick={this.toggleTambahGuru} className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-plus"></i><span>Tambah Guru</span></Button>				  
					
					{ this.renderModalUpdateGuru() }

					{ this.renderModalDetailGuru() }

					{ this.renderModalDeleteGuru() }

					<Table responsive size="sm">
            <thead>
							<tr>
								<th>NIP</th>
								<th>NUPTK</th>
								<th>Nama Guru</th>
								<th>Username</th>
								<th>Aksi</th>
							</tr>
							</thead>
							<tbody>
								{
									this.state.list_guru.map(guru => {
										return(
											<tr>
												<td>{ guru.nip || '' }</td>
												<td>{ guru.nuptk || '' }</td>
												<td>{ guru.namaGuru || '' }</td>
												<td>{ guru.username || ''}</td>
												<td>
													<Button onClick={(e:any) => this.toggleDetailGuru(guru)} className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
													<Button className="btn-stack-overflow btn-brand icon btn-sm" onClick={(e:any) => this.toggleUpdateGuru(guru)}><i className="fa fa-pencil"></i></Button>
													<Button className="btn-youtube btn-brand icon btn-sm" onClick={(e:any) => this.toggleDeleteGuru(guru)}><i className="fa fa-trash"></i></Button>
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

export default Guru;
