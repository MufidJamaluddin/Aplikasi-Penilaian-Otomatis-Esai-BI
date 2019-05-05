import React, { PureComponent } from 'react';
import DataGuru from '../../models/item_model';
import { Modal, Form, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Col, Input, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import DataKelas from '../../models/item_model';
import DataMatapelajaran from '../../models/item_model';
import DataPengampu from '../../models/item_model';

/**
 * Modal Guru Form
 */
interface ModalGuruFormAttribute 
{
    className: string;
    header: string;
    strsubmit?: string;
    isOpen?: boolean;
    toggle: VoidFunction;
	onClickSubmit: any;
	viewonly?: boolean;
	
	dataguru?: Partial<DataGuru>;
	listkelas: Array<Partial<DataKelas>>;
	listmapel: Array<Partial<DataMatapelajaran>>;
}

interface ModalGuruState
{
	dataguru?: Partial<DataGuru>;
	listpengampu: Array<Partial<DataPengampu>>;
}

class ModalGuruForm extends PureComponent<ModalGuruFormAttribute, ModalGuruState>
{
	constructor(props: ModalGuruFormAttribute)
	{
		super(props);
		this.state = { dataguru: props.dataguru, listpengampu: [] }
	}

	public tambahPengampu()
	{

	}

    private renderDataPribadi()
    {
		var dataguru = this.props.dataguru || {};

        if(this.props.viewonly) return (
			<FormGroup row>	
				<dt className="col-sm-3 text-truncate">NIP</dt>
				<dd className="col-sm-3">{ dataguru.nip || ''}</dd>
				
				<dt className="col-sm-3 text-truncate">Nama</dt>
				<dd className="col-sm-3">{ dataguru.namaGuru || '' }</dd>
				
				<dt className="col-sm-3 text-truncate">Username</dt>
				<dd className="col-sm-3">{ dataguru.username || '' }</dd> 
			</FormGroup>
        );
        else return (
            <FormGroup row>
                <Col sm="3">
                    <Input bsSize="sm" type="text" placeholder={ dataguru.nip || '' } required />
                </Col>
                <Col sm="3">
                    <Input bsSize="sm" type="text" placeholder={ dataguru.namaGuru||'' } required/>
                </Col>
                <Col sm="3">
                    <Input bsSize="sm" type="text" placeholder={ dataguru.username||'' } required/>
                </Col>
                <Col sm="3">
                    <Input bsSize="sm" type="text" placeholder="Password" required/>
                </Col>
            </FormGroup>
        );
	}
	
	private renderDataMengajar()
	{

		var listpengampu = this.state.listpengampu || [];

		if(this.props.viewonly) return (
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
					{
						listpengampu.map(pengampu=>{
							return(
								<tr>
									<td>{pengampu.namaMatapelajaran}</td>
									<td>{pengampu.namaKelas}</td>
								</tr>
							);
						})
					}
				</tbody>
			</Table>					
			</Col>
			</FormGroup>
		);
		else return (
			<FormGroup row>
				<Col sm="5">
					<Input bsSize="sm" type="select">
						{ 
							this.props.listkelas.map(kelas=>{
								return (
									<option value={kelas.idkelas}>
										{kelas.namaKelas}
									</option>
								);
							})
						}
					</Input>
				</Col>
				
				<Col sm="5">
					<Input bsSize="sm" type="select">
						<option value="X-IPA1">X-IPA1</option>
					</Input>
				</Col>
				
				<Col sm="2">
					<Button bsSize="sm" color="success">+Tambah</Button>
				</Col>
				
				<Col sm="12">
				<Table responsive bsSize="sm">
					<thead>
						<tr>
							<th>Mata Pelajaran</th>
							<th>Kelas</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{
							listpengampu.map(pengampu=>{
								return(
									<tr>
										<td>{pengampu.namaMatapelajaran}</td>
										<td>{pengampu.namaKelas}</td>
										<td>
											<Button className="btn-youtube btn-brand icon btn-sm">
											<i className="fa fa-trash"></i></Button>
										</td>
									</tr>
								);
							})
						}
					</tbody>
				</Table>					
			</Col>
		</FormGroup>
		);
	}

	private renderSubmitButton()
	{
		if(this.props.strsubmit !== undefined)
			return(<Button color="success" type="submit">{this.props.strsubmit}</Button>);
	}

    public render()
    {
        return(
            <Modal 
                isOpen={ this.props.isOpen || false } 
                toggle={ this.props.toggle } 
                className={ this.props.className }>
				<ModalHeader toggle={this.props.toggle}>{this.props.header}</ModalHeader>
				<ModalBody>
					<Form onSubmit={this.props.onClickSubmit} className="form-horizontal">
						<h6>Data Pribadi</h6>
						{ this.renderDataPribadi() }
						
						<h6>Data Mengajar</h6>
						{ this.renderDataMengajar() }
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={this.props.toggle}>Batal</Button>
					{ this.renderSubmitButton() }
				</ModalFooter>
			</Modal>
        );
    }
}

export default ModalGuruForm;