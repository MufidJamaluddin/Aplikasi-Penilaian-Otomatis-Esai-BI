import React, { PureComponent } from 'react';
import DataGuru from '../../models/item_model';
import { Modal, Form, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Col, Input, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

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
    
    dataguru?: Partial<DataGuru>;
    viewonly?: boolean;
}

class ModalGuruForm extends PureComponent<ModalGuruFormAttribute>
{
    private renderDataPribadi()
    {
        if(this.props.viewonly) return (
			<FormGroup row>	
				<dt className="col-sm-3 text-truncate">NIP</dt>
				<dd className="col-sm-3">93120001</dd>
				
				<dt className="col-sm-3 text-truncate">Nama</dt>
				<dd className="col-sm-3">Lucky Ramdani M.Pd</dd>
				
				<dt className="col-sm-3 text-truncate">Username</dt>
				<dd className="col-sm-3">luckyramdani</dd> 
			</FormGroup>
        );
        else return (
            <FormGroup row>
                <Col sm="3">
                    <Input bsSize="sm" type="text" placeholder="NIP" required />
                </Col>
                <Col sm="3">
                    <Input bsSize="sm" type="text" placeholder="Nama Guru" required/>
                </Col>
                <Col sm="3">
                    <Input bsSize="sm" type="text" placeholder="Username" required/>
                </Col>
                <Col sm="">
                    <Input bsSize="sm" type="text" placeholder="Password" required/>
                </Col>
            </FormGroup>
        );
	}
	
	private renderDataMengajar()
	{
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
				<tr>
				<td>Biologi</td>
				<td>x-IPA1</td>
				</tr>
					<tr>
				<td>Geografi</td>
				<td>x-IPA1</td>
					</tr>
				<tr>
				<td>Pendidikan Kewarganegaraan</td>
				<td>x-IPA1</td>
				</tr>
				<tr>
				<td>Pendidikan Kewarganegaraan</td>
				<td>x-IPA2</td>
				</tr>
				<tr>
				<td>Pendidikan Kewarganegaraan</td>
				<td>x-IPA3</td>
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
			</Col>
			</FormGroup>
		);
		else return (
			<FormGroup row>
				<Col sm="5">
					<Input bsSize="sm" type="select">
					<option value="">Pilih Mata Pelajaran ...</option>
					<option value="Biologi">Biologi</option>
					<option value="Geografi">Geografi</option>
					<option value="Sejarah">Sejarah</option>
					<option value="Pendidikan Kewarganegaraan">Pendidikan Kewarganegaraan</option>
					</Input>
				</Col>
				
				<Col sm="5">
					<Input bsSize="sm" type="select">
					<option value="">Pilih Kelas ...</option>
					<option value="X-IPA1">X-IPA1</option>
					<option value="X-IPA2">X-IPA2</option>
					<option value="X-IPA3">X-IPA3</option>
					<option value="X-IPA4">X-IPA4</option>
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
					<tr>
					<td>Biologi</td>
					<td>x-IPA1</td>
					<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
					</tr>
						<tr>
					<td>Geografi</td>
					<td>x-IPA1</td>
					<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
					</tr>
					<tr>
					<td>Pendidikan Kewarganegaraan</td>
					<td>x-IPA1</td>
					<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
					</tr>
					<tr>
					<td>Pendidikan Kewarganegaraan</td>
					<td>x-IPA2</td>
					<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
					</tr>
					<tr>
					<td>Pendidikan Kewarganegaraan</td>
					<td>x-IPA3</td>
					<td><Button className="btn-youtube btn-brand icon btn-sm"><i className="fa fa-trash"></i></Button></td>
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
				</Pagination>						
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
				<ModalBody>
					<Form onSubmit={this.props.onClickSubmit} className="form-horizontal">
						<h6>Data Pribadi</h6>
						{ this.renderDataPribadi() }
						
						<h6>Data Mengajar</h6>
						{ this.renderDataMengajar() }
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={this.props.toggle}>Cancel</Button>
					<Button color="success" type="submit">{this.props.strsubmit}</Button>
				</ModalFooter>
			</Modal>
        );
    }
}

export default ModalGuruForm;