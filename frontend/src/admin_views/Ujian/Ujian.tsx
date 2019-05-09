import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button,Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import DataUjian from './../../models/item_model';
import { initDataUjian } from './../../models/UjianData';

/**
 * State dan Atribute View Class
 */
interface UjianState { 
  modal:boolean; 
  state:boolean; 
  danger:boolean;
  listujian: Array<DataUjian>;
}
interface UjianAttribute { className?: string; }

/**
 * Kelas Ujian
 */
class Ujian extends Component<UjianAttribute, UjianState>
{
  constructor(props: Readonly<UjianAttribute>) 
  {
    super(props);

    this.state = {
      danger: false,
      modal: false,
      state: false,
      listujian: []
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDeleteUjian = this.toggleDeleteUjian.bind(this);
    this.getElementStatus = this.getElementStatus.bind(this);
  }

  public componentDidMount()
  {
    initDataUjian().then(list => {
      this.setState({ listujian: list });
    });
  }

  public toggle() : void 
  {
    this.setState({
      modal: !this.state.modal,
    });
  }
  
  public toggleDeleteUjian() : void
  {
    this.setState({
      danger: !this.state.danger,
    });
  }

  public getElementStatus(status_ujian: number): JSX.Element
  {
    switch(status_ujian)
    {
      case 2:
        return (<span className="badge badge-success">Terlaksana</span>);
      case 1:
        return (<span className="badge badge-info">Sedang Dilaksanakan</span>);
      default:
        return (<span className="badge badge-danger">Belum Dilaksanakan</span>);
    }
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
                          <Button className="btn-twitter btn-brand icon btn-sm"><i className="fa fa-eye"></i></Button>
                          <Link to={"/ujian/update/"+ ujian.idujian}>
                            <Button className="btn-stack-overflow btn-brand icon btn-sm"><i className="fa fa-edit"></i></Button>
                          </Link>
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
