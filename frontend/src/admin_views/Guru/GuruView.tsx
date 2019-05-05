import React, { Component } from 'react';
import DataGuru from '../../models/item_model';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ModalForm, LayoutCard } from '../../layout';
import ModalGuruForm from './ModalGuru';

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
};

interface GuruModel { className:string; }

class Guru extends Component<GuruModel, GuruStateModel>
{
	constructor(props: Readonly<GuruModel>) 
	{
		super(props);
		
    this.state = {
      modal: { },
			list_guru: []
    };

		this.toggleImportGuru = this.toggleImportGuru.bind(this);
		this.toggleTambahGuru = this.toggleTambahGuru.bind(this);
		this.toggleUpdateGuru = this.toggleUpdateGuru.bind(this);
		this.toggleDeleteGuru = this.toggleDeleteGuru.bind(this);
		this.toggleDetailGuru = this.toggleDetailGuru.bind(this);
  }

	//----------------------------- TOGGLE --------------------------------------------//
 	public toggleTambahGuru() : void 
 	{
		var state = this.state.modal.tambah || false;
    this.setState({ modal: { tambah: !state } });
  }
  
 	public toggleUpdateGuru() : void
 	{
		var state = this.state.modal.update || false;
    this.setState({ modal: { update: !state } });
  }
  
	public toggleDeleteGuru() : void
	{
		var state = this.state.modal.delete || false;
    this.setState({ modal: { delete: !state } });
  }

	public toggleDetailGuru() : void
	{
		var state = this.state.modal.detail || false;
    this.setState({ modal: { detail: !state } });
  }

	public toggleImportGuru() : void
	{
		var state = this.state.modal.import || false;
    this.setState({ modal: { import: !state } });
	}
	// --------------------------------- HANDLE UI -----------------------------------//

	importDataGuru(event:any) { }
	tambahDataGuru(event:any) { }
	updateDataGuru(event:any) { }
	deleteDataGuru(event:any) { }
	detailDataGuru(event:any) { }

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
								<th>Nama Guru</th>
								<th>Username</th>
								<th>Password</th>
								<th>Aksi</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>93120001</td>
								<td>Lucky Ramdani M.Pd</td>
								<td>luckyramdani</td>
								<td>luckyramdani</td>
								<td>
									<Button onClick={this.toggleDetailGuru} className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
									<Button className="btn-stack-overflow btn-brand icon btn-sm" onClick={this.toggleUpdateGuru}><i className="fa fa-pencil"></i></Button>
								<Button className="btn-youtube btn-brand icon btn-sm" onClick={this.toggleDeleteGuru}><i className="fa fa-trash"></i></Button>
							</td>
            </tr>
            <tr>
              <td>93120001</td>
              <td>Lucky Ramdani M.Pd</td>
              <td>luckyramdani</td>
							<td>luckyramdani</td>
							<td>
								<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
								<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
								<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
							</td>
            </tr>
						<tr>
              <td>93120001</td>
              <td>Lucky Ramdani M.Pd</td>
              <td>luckyramdani</td>
							<td>luckyramdani</td>
						<td>
						<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>93120001</td>
                    <td>Lucky Ramdani M.Pd</td>
                    <td>luckyramdani</td>
					<td>luckyramdani</td>
					<td>
						<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
                  </tr><tr>
                    <td>93120001</td>
                    <td>Lucky Ramdani M.Pd</td>
                    <td>luckyramdani</td>
					<td>luckyramdani</td>
					<td>
						<Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
						<Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-pencil"></i></Button>
						<Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button>
					</td>
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
              </CardBody>
      </LayoutCard>
    );
  }
}

export default Guru;
