import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Table, Button,Form, FormGroup, Input } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import DataUjian from '../../models';
import { PelaksanaanViewModel } from '../../viewmodels/ujianesai';
import { isNullOrUndefined } from 'util';

interface DetailUjianState 
{ 
  modal: boolean;
  primary: boolean;
  /**
   * Data Ujian
   */
  dataujian?: DataUjian;
  /**
   * ID Kelas untuk Klik Mulai
   */
  cidkelas?: string;
  cnamaKelas?: string;
}

interface DetailUjianAttribute { className?: string; }

interface RouteParam { idujian:string; }

/**
 * Detail Keterangan Ujian
 */
class DetailUjian extends Component<DetailUjianAttribute & RouteComponentProps<RouteParam>, DetailUjianState>
{
  /**
   * ID UJIAN
   * Keterangan Ujian
   */
  private idujian: string;

  readonly vm: PelaksanaanViewModel;

  constructor(props:any) 
  {
    super(props);
    this.state = {
      modal: false,
      primary: false,
    };

    this.idujian = props.match.params.idujian;

    this.toggle = this.toggle.bind(this);
    this.toggleMulaiUjian = this.toggleMulaiUjian.bind(this);

    this.renderMulaiButton = this.renderMulaiButton.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.getStatusBadge = this.getStatusBadge.bind(this);

    this.laksanakanUjian = this.laksanakanUjian.bind(this);

    this.vm = PelaksanaanViewModel.getInstance();
  }

  componentDidMount()
  {
    this.vm.initDataPelaksanaan(this.idujian).then(value =>{
      this.setState({ dataujian: value });
    });
  }

  laksanakanUjian(e:any)
  {
    e.preventDefault();

    if(isNullOrUndefined(this.state.cidkelas)) return;

    this.vm.mulaiUjian(this.idujian, this.state.cidkelas).then(value =>{
      this.setState({ dataujian: value, primary: false });
    });
  }

  public toggle() : void 
  {
    this.setState({
      modal: !this.state.modal,
    });
  }
 
  toggleMulaiUjian(idkelas?: string, namaKelas?: string)
  {
    this.setState({
      primary: !this.state.primary,
      cidkelas: idkelas||undefined,
      cnamaKelas: namaKelas||undefined
    });
  }

  getStatusBadge(status: string)
  {
    switch(status)
    {
      case "2":
        return (<span className="badge badge-success">Sudah terlaksana</span>);
      case "1":
        return (<span className="badge badge-primary">Sedang berlangsung</span>);
      case "0":
        return (<span className="badge badge-danger">Belum terlaksana</span>);
    }
  }

  renderMulaiButton(status: string, idkelas: string, namaKelas: string)
  {
    if(status === "0")
    {
      return (
        <Button className="btn-twitter btn-brand icon btn-sm" onClick={(e:any)=>{this.toggleMulaiUjian(idkelas, namaKelas)}}>Mulai Ujian</Button>
      );
    }
  }

  renderModal()
  {
    if(this.state.cidkelas === undefined) return;

    return (
      <Modal isOpen={this.state.primary} toggle={this.toggleMulaiUjian} className={'modal-primary ' + this.props.className}>
        <ModalHeader toggle={this.toggleMulaiUjian}>Mulai Ujian</ModalHeader>
        <ModalBody>
        <p> Apakah anda yakin ingin memulai ujian di kelas <b>{this.state.cnamaKelas||''}</b>?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={(e:any)=>{this.toggleMulaiUjian()}}>Tidak</Button>
          <Button color="success" onClick={this.laksanakanUjian}>Ya</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render()
  {
    if(this.state.dataujian === undefined) return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

    var dataujian = this.state.dataujian;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Col md="12">
                  <h6>ID Ujian : { this.idujian }</h6>
                  <h6>Nama Ujian : {dataujian.namaUjian}</h6>
                  <h6>Mata Pelajaran : {dataujian.namaMapel}</h6>
                  <h6>Durasi Ujian : {dataujian.durasi} Menit</h6>
                  <h6>Jumlah Soal : {dataujian.jumlahSoal}</h6>
                </Col>
                    
              </CardHeader>
			  
              <CardBody>
                { this.renderModal() }
                <Col sm="12">
                  <Table responsive size="sm">
                    <thead>
                      <tr>
                          <th>Kelas</th>
                          <th>Pelaksanaan Ujian</th>
                          <th>Status Ujian</th>
                          <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dataujian.pelaksanaan_ujian.map((pel, i) => {
                          return (
                            <tr key={i}>
                              <td>{pel.namaKelas}</td>
                              <td>{pel.waktu_mulai|| ''}</td>
                              <td>{this.getStatusBadge(pel.status_pelaksanaan)}</td>
                              <td>{this.renderMulaiButton(pel.status_pelaksanaan, pel.idkelas, pel.namaKelas)}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
 
                  </Table>
                </Col>
              <Col className="col-sm-12 text-right">
                <Link to="/ujian">
                  <Button className="text-right" color="primary" >Kembali</Button>
                </Link>
              </Col>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>);
  }
}

export default DetailUjian;
