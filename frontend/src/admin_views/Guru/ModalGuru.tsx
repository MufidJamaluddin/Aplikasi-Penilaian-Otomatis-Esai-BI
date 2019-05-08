import React, { PureComponent } from 'react';
import DataGuru from '../../models/item_model';
import { Modal, Form, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Col, Input, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import DataKelas from '../../models/item_model';
import DataMatapelajaran from '../../models/item_model';
import DataPengampu from '../../models/item_model';
import { initDataPengampu } from '../../models/GuruData';

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
	onClickSubmit: (e:any) => void;
	viewonly?: boolean;
	inputusername?: boolean;
	
	dataguru?: Partial<DataGuru>;
	listkelas: Array<Partial<DataKelas>>;
	listmapel: Array<Partial<DataMatapelajaran>>;
}

interface ModalGuruState
{
	dataguru?: Partial<DataGuru>;
	listpengampu: Array<Partial<DataPengampu>>;

	ckelas?: Partial<DataKelas>;
	cmapel?: Partial<DataMatapelajaran>;

	inputlistpengampu: string;
}

class ModalGuruForm extends PureComponent<ModalGuruFormAttribute, ModalGuruState>
{
	constructor(props: ModalGuruFormAttribute)
	{
		super(props);
		this.state = { 
			dataguru: props.dataguru, 
			listpengampu: [],
			inputlistpengampu: "[]",
			ckelas: props.listkelas[0],
			cmapel: props.listmapel[0]
		}

		this.onTambahPengampu = this.onTambahPengampu.bind(this);
		this.onKelasChange = this.onKelasChange.bind(this);
		this.onMapelChange = this.onMapelChange.bind(this);
	}

	/**
	 * Inisialisasi Pengampu / Detail Guru
	 */
	public componentDidMount()
	{
		if(this.props.dataguru !== undefined)
		{
			var dataguru = this.props.dataguru;
			if(dataguru === undefined) return;

			var idguru = dataguru.idguru;
			if(idguru === undefined) return;

			initDataPengampu(idguru).then(listpengampu=>{
				this.setState({
					listpengampu: listpengampu, 
					inputlistpengampu: JSON.stringify(listpengampu)
				});
			});
		}
	}

	/**
	 * Perubahan ID Guru
	 */
	public componentDidUpdate(prevProps:ModalGuruFormAttribute)
	{
		if(this.props.dataguru !== undefined)
		{
			var lastDataGuru = prevProps.dataguru || {};
			var lastIDGuru = lastDataGuru.idguru || '';
			
			if(this.props.dataguru.idguru !== lastIDGuru)
			{
				var idguru = this.props.dataguru.idguru;
				if(idguru === undefined) return;

				initDataPengampu(idguru).then(listpengampu=>{
					this.setState({
						listpengampu: listpengampu, 
						inputlistpengampu: JSON.stringify(listpengampu)
					});
				});
			}
		}
	}

	/**
	 * Tambah pengampu ke list pengampu
	 */
	public onTambahPengampu(event:any)
	{
		event.preventDefault();

		//if(this.state.dataguru === undefined) return;
		if(this.state.ckelas === undefined) return;
		if(this.state.cmapel === undefined) return;
		
		var pengampu:Partial<DataPengampu> = {};
		var listpengampu = this.state.listpengampu;
		var found;

		//pengampu.idguru = this.state.dataguru.idguru || '';
		pengampu.idkelas = this.state.ckelas.idkelas;
		pengampu.idmapel = this.state.cmapel.idmapel;
		pengampu.namaKelas = this.state.ckelas.namaKelas;
		pengampu.namaMapel = this.state.cmapel.namaMapel;

		console.log(pengampu);

		/**
		 * Data yg ditambahkan tidak boleh duplikat
		 */
		found = this.state.listpengampu.find((el, i, arr) => {
			return el.idkelas === pengampu.idkelas && el.idmapel === pengampu.idmapel;
		});

		/**
		 * Set State dan Render Ulang
		 */
		if(found === undefined)
		{
			listpengampu.push(pengampu);

			this.setState({
				listpengampu: listpengampu, 
				inputlistpengampu: JSON.stringify(listpengampu)
			});
		}
	}

	/**
	 * Hapus Pengampu
	 */
	public onHapusPengampu(idkelas:string, idmapel:string)
	{
		var list = this.state.listpengampu.filter((el, i, arr) => {
			return !(el.idkelas == idkelas && el.idmapel == idmapel);
		});

		this.setState({
			listpengampu: list, 
			inputlistpengampu: JSON.stringify(list)
		});
	}

	/**
	 * Perubahan Kelas
	 */
	public onKelasChange(event:any)
	{
		event.preventDefault();
		var idkelas = event.target.value;
		var listkelas = this.props.listkelas;

		var kelas = listkelas.find((el, i, arr) => {
			return el.idkelas == idkelas;
		});

		console.log(kelas);

		if(kelas === undefined)	return;
		
		this.setState({ ckelas: kelas });
	}

	/**
	 * Perubahan Mapel
	 */
	public onMapelChange(event:any)
	{
		event.preventDefault();
		var idmapel = event.target.value;
		var listmapel = this.props.listmapel;

		var mapel = listmapel.find((el, i, arr) => {
			return el.idmapel == idmapel;
		});

		console.log(mapel);

		if(mapel === undefined) return;
		
		this.setState({ cmapel: mapel });
	}

	private renderInputUsername(username:string)
	{
		if(this.props.inputusername) return(                
			<Col sm="3">
				<Input bssize="sm" type="text" name="username" placeholder={ username } required/>
			</Col>
		);
		else return(
			<Col sm="3">
				<Input bssize="sm" type="text" value={ username } disabled />
			</Col>
		);
	}

	/**
	 * Render Form Data Pribadi
	 */
    private renderDataPribadi()
    {
		var dataguru = this.props.dataguru || {};

        if(this.props.viewonly) return (
			<FormGroup row>	
				<dt className="col-sm-3 text-truncate">NIP</dt>
				<dd className="col-sm-3">{ dataguru.nip || ''}</dd>
				
				<dt className="col-sm-3 text-truncate">NUPTK</dt>
				<dd className="col-sm-3">{ dataguru.nuptk || ''}</dd>
				
				<dt className="col-sm-3 text-truncate">Nama</dt>
				<dd className="col-sm-3">{ dataguru.namaGuru || '' }</dd>
				
				<dt className="col-sm-3 text-truncate">Username</dt>
				<dd className="col-sm-3">{ dataguru.username || '' }</dd> 
			</FormGroup>
        );
        else return (
            <FormGroup row>
                <Col sm="3">
                    <Input bssize="sm" type="text" name="nip" placeholder={ dataguru.nip || 'NIP' } />
                </Col>
                <Col sm="3">
                    <Input bssize="sm" type="text" name="nuptk" placeholder={ dataguru.nuptk || 'NUPTK' } />
                </Col>
                <Col sm="3">
                    <Input bssize="sm" type="text" name="namaGuru" placeholder={ dataguru.namaGuru||'Nama Guru' } required/>
                </Col>
				{ this.renderInputUsername(dataguru.username || 'Username') }
            </FormGroup>
        );
	}
	
	/**
	 * Render Form Data Mengajar
	 */
	private renderDataMengajar()
	{
		var listpengampu = this.state.listpengampu;

		if(this.props.viewonly) return (
			<FormGroup row>
			<Col sm="12">
			<Table responsive size="sm">
				<thead>
					<tr>
						<th>Matapelajaran</th>
						<th>Kelas</th>
					</tr>
				</thead>
				<tbody>
					{
						listpengampu.map((pengampu, i, arr)=>{
							return(
								<tr>
									<td><a>{pengampu.namaMapel}</a></td>
									<td><a>{pengampu.namaKelas}</a></td>
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

				<input type="hidden" name="listpengampu" value={this.state.inputlistpengampu}/>

				<Col sm="5">
					<Input bssize="sm" type="select" onChange={this.onKelasChange}>
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
				<Input bssize="sm" type="select" onChange={this.onMapelChange}>
						{ 
							this.props.listmapel.map(mapel=>{
								return (
									<option value={mapel.idmapel}>
										{mapel.namaMapel}
									</option>
								);
							})
						}
					</Input>
				</Col>
				
				<Col sm="2">
					<Button bssize="sm" color="success" onClick={this.onTambahPengampu}>+Tambah</Button>
				</Col>
				
				<Col sm="12">
				<Table responsive bssize="sm">
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
										<td>{pengampu.namaMapel}</td>
										<td>{pengampu.namaKelas}</td>
										<td>
											<Button onClick={(e:any)=>{this.onHapusPengampu(pengampu.idkelas||'', pengampu.idmapel||'')}} className="btn-youtube btn-brand icon btn-sm">
												<i className="fa fa-trash"></i>
											</Button>
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

    public render()
    {
        return(
            <Modal 
                isOpen={ this.props.isOpen || false } 
                toggle={ this.props.toggle } 
                className={ this.props.className }>
				<ModalHeader toggle={this.props.toggle}>{this.props.header}</ModalHeader>
				<Form onSubmit={this.props.onClickSubmit} className="form-horizontal">
					<ModalBody>
						<h6>Data Pribadi</h6>
						{ this.renderDataPribadi() }
							
						<h6>Data Mengajar</h6>
						{ this.renderDataMengajar() }
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={this.props.toggle}>Batal</Button>
						<Button color="success" type="submit">{this.props.strsubmit||'Ok'}</Button>
					</ModalFooter>
				</Form>
			</Modal>
        );
    }
}

export default ModalGuruForm;