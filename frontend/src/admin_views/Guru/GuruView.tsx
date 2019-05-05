import React, { Component } from 'react';
import DataGuru from '../../models/item_model';
import DataMatapelajaran from '../../models/item_model';
import DataKelas from '../../models/item_model';
import { CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ModalForm, LayoutCard } from '../../layout';
import ModalGuruForm from './ModalGuru';
import { initDataGuru, inputDataGuru, updateDataGuru, hapusDataGuru } from '../../models/GuruData';
import { initDatakelas } from '../../models/KelasData';
import { initDataMatapelajaran } from '../../models/MatapelajaranData';

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
			list_kelas: []
    };

		this.toggleImportGuru = this.toggleImportGuru.bind(this);
		this.toggleTambahGuru = this.toggleTambahGuru.bind(this);
		this.toggleUpdateGuru = this.toggleUpdateGuru.bind(this);
		this.toggleDeleteGuru = this.toggleDeleteGuru.bind(this);
		this.toggleDetailGuru = this.toggleDetailGuru.bind(this);
	}
	
	// --------------------------- INIT DATA ------------------------------------------//

	public componentDidMount()
	{
		initDataGuru().then(list => {
			this.setState({ list_guru: list });
		});

		initDataMatapelajaran().then(list => {
			this.setState({ list_mapel: list });
		});

		initDatakelas().then(list => {
			this.setState({ list_kelas: list });
		});
	}

	//----------------------------- TOGGLE --------------------------------------------//
 	public toggleTambahGuru() : void 
 	{
		var state = this.state.modal.tambah || false;
    this.setState({ modal: { tambah: !state } });
  }
  
 	public toggleUpdateGuru(dataguru?: Partial<DataGuru>) : void
 	{
		var state = this.state.modal.update || false;

		if(dataguru === undefined) 
			this.setState({ modal: { update: !state } });
		else 
			this.setState({ modal: { update: !state }, selected_data: dataguru });
  }
  
	public toggleDeleteGuru(dataguru?: Partial<DataGuru>) : void
	{
		var state = this.state.modal.delete || false;

		if(dataguru === undefined) 
			this.setState({ modal: { delete: !state } });
		else
			this.setState({ modal: { delete: !state }, selected_data: dataguru });
  }

	public toggleDetailGuru(dataguru?: Partial<DataGuru>) : void
	{
		var state = this.state.modal.detail || false;

		if(dataguru === undefined)
			this.setState({ modal: { detail: !state } });
		else
			this.setState({ modal: { detail: !state }, selected_data: dataguru });
  }

	public toggleImportGuru() : void
	{
		var state = this.state.modal.import || false;
    this.setState({ modal: { import: !state } });
	}
	// --------------------------------- HANDLE UI -----------------------------------//

	importDataGuru(event:any) 
	{ 
		event.preventDefault();

	}

	tambahDataGuru(event:any) 
	{ 
    event.preventDefault();

	}

	updateDataGuru(event:any) 
	{ 
		event.preventDefault();

	}

	deleteDataGuru(event:any) 
	{ 
		event.preventDefault();

	}

	detailDataGuru(event:any) 
	{ 
		event.preventDefault();

	}

	//---------------------------------- RENDER --------------------------------------//

	public renderModalImport()
	{
		return (
			<ModalForm
				className={'modal-primary ' + this.props.className}
				isOpen={this.state.modal.import||false} toggle={this.toggleImportGuru}
				header="Import Data Guru" strsubmit="import"
				onClickSubmit={this.importDataGuru}>
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
		return (
			<ModalGuruForm
				className={'modal-info modal-lg ' + this.props.className}
				header="Tambah Data Guru"
				strsubmit="Tambah"
				isOpen={this.state.modal.update}
				toggle={this.toggleUpdateGuru}
				onClickSubmit={this.updateDataGuru}
				viewonly={true}
				>
			</ModalGuruForm>
		);
	}

	public renderModalDetailGuru()
	{
		return (
			<ModalGuruForm
				className={'modal-info modal-lg ' + this.props.className}
				header="Edit Data Guru"
				isOpen={this.state.modal.update}
				toggle={this.toggleUpdateGuru}
				onClickSubmit={this.updateDataGuru}
				viewonly={true}
				>
			</ModalGuruForm>
		);
	}

	public renderModalUpdateGuru()
	{
		return (
			<ModalGuruForm
				className={'modal-warning modal-lg ' + this.props.className}
				header="Edit Data Guru"
				strsubmit="Edit"
				isOpen={this.state.modal.update}
				toggle={this.toggleUpdateGuru}
				onClickSubmit={this.updateDataGuru}
				>
			</ModalGuruForm>
		);
	}

	renderModalDeleteGuru()
	{
		return (
			<p>Apakah anda yakin ingin menghapus <b>Lucky Ramdani M.Pd</b> dari data guru ?</p>
		);
	}

	public render() : JSX.Element
	{
		if(this.state.list_guru == undefined)      
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
				
					{ this.renderModalImport }
					<Button size="sm" onClick={this.toggleImportGuru} className="btn-twitter btn-brand mr-1 mb-1 "><i className="fa fa-upload"></i><span>Import Data Guru</span></Button>
					
					{ this.renderModalTambahGuru }
					<Button size="sm" onClick={this.toggleTambahGuru} className="btn-vine btn-brand mr-1 mb-1 "><i className="fa fa-plus"></i><span>Tambah Guru</span></Button>				  
					
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
