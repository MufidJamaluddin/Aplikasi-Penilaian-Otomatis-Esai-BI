import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, Table, Progress, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardHeader, Col, Row, TabContent, TabPane, Container } from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
import { Loading } from './../../layout';
import DataUjian from '../../models';
import DataPelaksanaanUjian from '../../models';
import { PelaksanaanViewModel } from '../../viewmodels/ujianesai';
import { PenilaianViewModel } from '../../viewmodels/penilaian';

interface NilaiUjianStateModel { 
  activeTab: number; 
  submitnilaimanual:boolean; 
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
  private task_interval?: any;

  readonly pelaksanaan_vm: PelaksanaanViewModel;
  readonly penilaian_vm: PenilaianViewModel;

  constructor(props:any) 
	{
    super(props);
    
    this.state = {
      activeTab: 0,
      submitnilaimanual: false,
    };

    this.idujian = props.match.params.idujian;

    this.toggleSubmitNilaiManual = this.toggleSubmitNilaiManual.bind(this);
    this.loadData = this.loadData.bind(this);

    this.pelaksanaan_vm = PelaksanaanViewModel.getInstance();
    this.penilaian_vm = PenilaianViewModel.getInstance();
  }

  loadData()
  {
    this.pelaksanaan_vm.initDataPelaksanaan(this.idujian).then((value: DataUjian) => {
      if (value.status_ujian == '1')
      {
        this.setState({ dataujian: value, activeTab: 0 });
      }      
      else if(value.status_ujian == '2')
      {
        this.setState({ dataujian: value, activeTab: 1 });
      }
      else if (value.status_ujian == '3')
      {
        this.setState({ dataujian: value, activeTab: 1 });
      }
    }).catch((e:any) => {
      console.log(e)
    });
  }

  componentDidMount()
  {
    this.loadData()
    this.task_interval = setInterval(this.loadData, 3000);
  }

  componentWillUnmount()
  {
    if(this.task_interval)
    {
      clearInterval(this.task_interval);
    }
  }
  
	public toggleSubmitNilaiManual() : void 
	{
    this.setState({
      submitnilaimanual: !this.state.submitnilaimanual,
    });
  }

  toggle(tab: number) 
  {
    if (this.state.activeTab !== tab) 
    {
      this.penilaian_vm.nilaiOtomatis(this.idujian);

      this.loadData();

      this.setState({
        activeTab: tab,
        submitnilaimanual: false
      });
    }
  }

  getStatusPenilaianBadge(status:string, datapel:DataPelaksanaanUjian)
  {
    switch(status)
    {
      case "3":
        return (<span className="badge badge-success">Sudah dinilai manual</span>);
      case "2":
        return (<span className="badge badge-info">Sedang diproses</span>);
      case "1":
        return (
          <Link to={`/penilaian/${datapel.idujian}/${datapel.idkelas}`}>
            <Button className="btn-twitter btn-brand icon btn-sm">Nilai Ujian</Button>
          </Link>
        );
      default:
        return (<span className="badge badge-danger">Belum ujian</span>);
    }
  }

  render_btn_hasil(dataujian: DataPelaksanaanUjian)
  {
    if(dataujian.status_ujian == '3')
    {
      return (
        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        <Link to={"/hasilujian/" + dataujian.idujian}>
          <Button block color="primary">LIHAT HASIL PENILAIAN</Button>
        </Link>
        </Col>
      )
    }
  }

	public render() : JSX.Element
	{
    if(this.state.dataujian === undefined) return (Loading);
    
    var dataujian = this.state.dataujian;

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col md="12">
            <Card>
              <CardBody>
                
                <TabContent activeTab={this.state.activeTab}>
                  
                  <TabPane tabId={0} >
                    <CardHeader>
                      <FormGroup row>
                        <Col className="sm-6">
                        <dt className="text-truncate"><h4>PENILAIAN UJIAN<br/>MANUAL</h4></dt>
                        </Col>  

                        <Col className="sm-6">
                          <dt className="col-sm-12 text-left">ID Ujian &emsp; &emsp; &emsp; : {this.idujian}</dt>
                          <dt className="col-sm-12 text-left">Nama Ujian &emsp; &ensp; : {dataujian.namaUjian}</dt>
                          <dt className="col-sm-12 text-left">Mata Pelajaran &nbsp; : {dataujian.namaMapel}</dt>
                        </Col>
                    </FormGroup>     
                  </CardHeader>

                  <Col className="col-sm-12">
                      <p className="lead text-justify">
                      <b>Rekomendasi: </b>
                      Lakukan penilaian secara manual <b>minimal 50% jawaban </b>
                      dari seluruh jawaban siswa supaya akurasi penilaian otomatis lebih akurat
                      dan mewakili semua kategori strata nilai.
                      </p>
                  </Col>     
                      
                  <Col sm="12">
                    <Table responsive size="sm">
      
                      <thead>
                        <tr>
                          <th>Nama Kelas</th>
                          <th>Status Penilaian Manual</th>
                        </tr>
                      </thead>
                          
                      <tbody>
                        {
                          dataujian.pelaksanaan_ujian.map((pel, index, arr) => {
                            return (
                              <tr key={index}>
                                <td>{pel.namaKelas}</td>
                                <td>{this.getStatusPenilaianBadge(pel.status_penilaian, pel)}</td>
                              </tr>
                            )
                          })
                        }
                          
                      </tbody>
                    </Table>                
                  </Col>

                  <Col className="col-sm-12 text-right">
                    <Link to="/penilaian">
                      <Button color="primary">Kembali</Button>
                    </Link>
                    &nbsp;
                    <Button color="success" onClick={this.toggleSubmitNilaiManual}>Selanjutnya</Button>
                    <Modal 
                      isOpen={this.state.submitnilaimanual} 
                      toggle={this.toggleSubmitNilaiManual} 
                      className={'modal-dialog modal-dialog-centered modal-primary ' + this.props.className}>
                      <ModalHeader toggle={this.toggleSubmitNilaiManual}>Akhiri Penilaian Manual</ModalHeader>
                        <ModalBody>
                          <h4>Apakah anda yakin ingin mengakhiri penilaian ujian secara manual?</h4>
                          <p className="text-justify lead">
                            Untuk memastikan akurasi yang lebih baik, 
                             pastikan jawaban siswa telah dinilai secara manual <mark>minimal 50%</mark> dari seluruh jawaban siswa yang mengikuti ujian dan <mark>mewakili semua kategori</mark> strata nilai.
                          </p>
                          <p className="text-justify lead"> Jika anda telah yakin, tekan <mark>"Lakukan Penilaian Otomatis"</mark> untuk menilai jawaban esai siswa secara otomatis</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.toggleSubmitNilaiManual}>Kembali</Button>
                          &nbsp;
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
                          <dt className="col-sm-12 text-left">ID Ujian &emsp; &emsp; &emsp; : {this.idujian}</dt>
                          <dt className="col-sm-12 text-left">Nama Ujian &emsp; &ensp; : {dataujian.namaUjian}</dt>
                          <dt className="col-sm-12 text-left">Mata Pelajaran &nbsp; : {dataujian.namaMapel}</dt>
                          </Col>
                      </FormGroup>     
                    </CardHeader>
                      
                    <Progress animated color="success" value={dataujian.progress_penilaian||'0'} className="mb-3" />
                    <div>
                      <p className="h1 text-center">{dataujian.progress_penilaian||'0'}%</p>
                      <p className="h3 text-center">
                        {dataujian.progress_penilaian == 100? 'Penilaian Otomatis Telah Selesai': dataujian.pesan_progress_penilaian||''}
                      </p>
                    </div>
                    
                    {
                      this.render_btn_hasil(dataujian)
                    }
                    
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