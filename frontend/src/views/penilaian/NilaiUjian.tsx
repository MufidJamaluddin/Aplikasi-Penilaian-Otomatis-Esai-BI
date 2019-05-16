import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, Table, CardGroup, Progress, ModalBody, ModalFooter, ModalHeader, Input, Button, Card, CardBody, CardHeader, Col, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
import { initDataPelaksanaan } from '../../models/PelaksanaanData';
import DataUjian from '../../models/item_model';
import DataPelaksanaanUjian from '../../models/item_model';

interface NilaiUjianStateModel { activeTab: number; primary:boolean; info:boolean; modal: boolean;
  /**
   * Data Ujian
   */
  dataujian?: DataUjian;
  /**
   * Data Pelaksanaan yg Dipilih
   */
  datapel_selected?: DataPelaksanaanUjian;
}

interface NilaiUjianPropsModel { className: string; }

interface RouteParam { idujian:string; }

class NilaiUjian extends Component<NilaiUjianPropsModel & RouteComponentProps<RouteParam>, NilaiUjianStateModel>
{
  /**
   * ID UJIAN
   * Keterangan Ujian
   */
  private idujian: string;

  constructor(props:any) 
	{
		super(props);
		this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      primary: false,
      info:false,
			modal: false 
    };

    this.idujian = props.match.params.idujian;

    this.modal= this.modal.bind(this);
    this.toggleSubmitNilaiManual = this.toggleSubmitNilaiManual.bind(this);
    this.toggleNilaiManual = this.toggleNilaiManual.bind(this);
  }

  componentDidMount()
  {
    initDataPelaksanaan(this.idujian).then(value =>{
      this.setState({ dataujian: value });
    });
  }

	public modal() : void
	{
    this.setState({
      modal: !this.state.modal,
    });
  }
  
	public toggleSubmitNilaiManual() : void 
	{
    this.setState({
      primary: !this.state.primary,
    });
  }

  public toggleNilaiManual(datapel?:DataPelaksanaanUjian)
	{
    this.setState({
      info: !this.state.info,
      datapel_selected: datapel
    });
  }

  toggle(tab:any) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  getStatusPenilaianBadge(status:string, datapel:DataPelaksanaanUjian)
  {
    switch(status)
    {
      case "2":
        return (<span className="badge badge-success">Sudah dinilai manual</span>);
      case "1":
        return (<Button className="btn-twitter btn-brand icon btn-sm" 
          onClick={()=>this.toggleNilaiManual(datapel)} >Nilai Ujian</Button>
        );
      default:
        return (<span className="badge badge-danger">Belum ujian</span>);
    }
  }

  renderModalPenilaianManual()
  {
    if(this.state.datapel_selected === undefined) return;

    let datapel_selected = this.state.datapel_selected;

    return (
      <Modal isOpen={this.state.info} toggle={this.toggleNilaiManual} className={'modal-info ' + this.props.className}>
        <ModalHeader toggle={this.toggleNilaiManual}>Akhiri Penilaian Manual</ModalHeader>
          <ModalBody>
            <p>1. Download jawaban esai siswa di kelas {datapel_selected.namaKelas}</p>
            <p>2. Lakukan penilaian secara manual untuk dijadikan data latih dengan mengisi kolom nilai yang tersedia</p>
            <p>3. Upload File Jawaban SIswa di kelas {datapel_selected.namaKelas} yang telah dinilai sebagian secara manual</p>
            <Input type="file"></Input>
      
            </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e:any)=>this.toggleNilaiManual()}>Tidak</Button>
            <Button color="success">Ya</Button>
          </ModalFooter>
      </Modal> 
    )
  }

	public render() : JSX.Element
	{
    if(this.state.dataujian === undefined) return (<h3>Loading...</h3>);
    
    var dataujian = this.state.dataujian;

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col md="12">
            <Card>
              <CardBody>
                
                { this.renderModalPenilaianManual() }
                
                <TabContent activeTab={this.state.activeTab}>
                  
                  <TabPane tabId={0} >
                    <CardHeader>
                      <FormGroup row>
                        <Col className="sm-6">
                        <dt className="col-sm-6 text-truncate"><h4>PENILAIAN UJIAN<br/>MANUAL</h4></dt>
                        </Col>  

                        <Col className="sm-6">
                          <dt className="col-sm-12 text-left">ID Ujian : {this.idujian}</dt>
                          <dt className="col-sm-12 text-left">Nama Ujian : {dataujian.namaUjian}</dt>
                          <dt className="col-sm-12 text-left">Mata Pelajaran : {dataujian.namaMapel}</dt>
                        </Col>
                    </FormGroup>     
                  </CardHeader>

                  <Col className="col-sm-12">
                      <p color="danger"><b>Rekomendasi: </b>Lakukan penilaian secara manual <b>minimal 50% jawaban</b> dari seluruh jawaban siswa agar akurasi penilaian otomatis lebih akurat</p>
                  </Col>     
                      
                  <Col sm="12">
                    <Table responsive size="sm">
      
                      <thead>
                        <tr>
                          <th>Nama Kelas</th>
                          <th>Jumlah siswa yang mengikuti ujian</th>
                          <th>Status Penilaian Manual</th>
                        </tr>
                      </thead>
                          
                      <tbody>
                        {
                          dataujian.pelaksanaan_ujian.map((pel, index, arr) => {
                            return (
                              <tr key={index}>
                                <td>{pel.namaKelas}</td>
                                <td>40</td>
                                <td>{this.getStatusPenilaianBadge(pel.status_penilaian,pel)}</td>
                              </tr>
                            )
                          })
                        }
                          
                      </tbody>
                    </Table>                
                  </Col>

                  <Col className="col-sm-12 text-right">
                    <Link to="./penilaian">
                      <Button  color="primary">Kembali</Button>
                    </Link>
                    <Button  color="success" onClick={this.toggleSubmitNilaiManual}>Selanjutnya</Button>
                    <Modal isOpen={this.state.primary} toggle={this.toggleSubmitNilaiManual} className={'modal-primary ' + this.props.className}>
                      <ModalHeader toggle={this.toggleSubmitNilaiManual}>Akhiri Penilaian Manual</ModalHeader>
                        <ModalBody>
                          <p className="text-center">Apakah anda yakin ingin mengakhiri penilaian ujian secara manual ? <b>Pastikan jawaban siswa sudah dinilai secara manula minimal 50 % dari seluruh jawaban siswa yang mengikuti ujian</b></p>
                          <p className="text-center"> Jika sudah yakin, Tekan <b>"Lakukan Penilaian Otomatis"</b> untuk menilai jawaban esai siswa secara otomatis</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.toggleSubmitNilaiManual}>Kembali</Button>
                          <Button color="success" onClick={() => this.toggle(1)} action active={this.state.activeTab === 1}>Lakukan Penilaian Otomatis</Button>
                        </ModalFooter>
                    </Modal>
                  </Col>
                    
                  </TabPane>

                  <TabPane tabId={1}>
                    
                    <CardHeader>
                      <FormGroup row>
                          <Col className="sm-6">
                          <dt className="col-sm-6 text-truncate"><h4>PENILAIAN UJIAN</h4></dt>
                          <dd className="col-sm-6"><h4>OTOMATIS</h4></dd>
                          </Col>  

                          <Col className="sm-6">
                          <dt className="col-sm-12 text-left">ID Ujian : {this.idujian}</dt>
                          <dt className="col-sm-12 text-left">Nama Ujian : {dataujian.namaUjian}</dt>
                          <dt className="col-sm-12 text-left">Mata Pelajaran : {dataujian.namaMapel}</dt>
                          </Col>
                      </FormGroup>     
                    </CardHeader>
                      
                    <Progress animated color="success" value="55" className="mb-3" />
                    
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Link to="./detailhasilujian"><Button block color="primary">LIHAT HASIL PENILAIAN</Button></Link>
                    </Col>
                    
                  </TabPane>
                </TabContent>
              </CardBody>
                    
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NilaiUjian;