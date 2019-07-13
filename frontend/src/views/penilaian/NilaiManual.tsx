import React, { Component } from 'react';
import { Table, Button, ButtonGroup,  Card, CardBody, CardHeader, Col, Input,Row, TabContent, TabPane, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import PropTypes from 'prop-types';

import DataUjian from '../../models';
import DataSoal from '../../models';

import DataJawabanSoal from '../../models';
import { PelaksanaanViewModel } from '../../viewmodels/ujianesai/PelaksanaanViewModel';
import { SoalViewModel } from '../../viewmodels/ujianesai/SoalViewModel';
import { PenilaianViewModel } from '../../viewmodels/penilaian';
// --------------------------- Component Tab -----------------------------------//

interface NilaiJawabanTabProps 
{
  idtab: number;
  idujian: string; 
  idkelas: string;
  datasoal: DataSoal;
}

interface NilaiJawabanTabState
{
  listjawaban: Array<DataJawabanSoal>;
}

class NilaiJawabanTab extends Component<NilaiJawabanTabProps, NilaiJawabanTabState>
{
  readonly penilaian_vm: PenilaianViewModel;

  constructor(props: any)
  {
    super(props);
    this.state = {
      listjawaban: []
    }

    this.penilaian_vm = PenilaianViewModel.getInstance();
  }

  componentDidMount()
  {
    this.penilaian_vm.initDataJawaban(this.props.idujian, this.props.idkelas, this.props.datasoal.idsoal)
    .then(data => {
      this.setState({ listjawaban: data });
    });
  }

  componentDidUpdate(prevProps)
  {
    if(this.props.datasoal.idsoal !== prevProps.datasoal.idsoal)
    {
      this.penilaian_vm.initDataJawaban(this.props.idujian, this.props.idkelas, this.props.datasoal.idsoal)
      .then(data => {
        this.setState({ listjawaban: data });
      });
    }
  }

  render()
  {
    return (
      <TabPane tabId={this.props.idtab} >
        <Table responsive size="sm">
          <tbody>
            <tr>
              <td><b>Soal</b></td>
              <td>{ this.props.datasoal.soalEsai }</td>
            </tr>
            <tr>
              <td><b>Materi Pokok</b></td>
              <td>{ this.props.datasoal.materiPokok }</td>
            </tr>
            <tr>
              <td><b>Kompetensi Dasar</b></td>
              <td>{ this.props.datasoal.kompetensiDasar }</td>
            </tr>
            <tr>
              <td><b>Skor Minimal</b></td>
              <td>{ this.props.datasoal.skorMin }</td>
            </tr>
            <tr>
              <td><b>Skor Maksimal</b></td>
              <td>{ this.props.datasoal.skorMax }</td>
            </tr>
          </tbody>
        </Table>                      
        
        <Table responsive size="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Jawaban Esai</th>
              <th>Skor</th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
            
          <tbody>
            {
              this.state.listjawaban.map((jawaban, i) => {
                return (
                  <tr key={jawaban.idjawaban}>
                    <td>{i+1}</td>
                    <td>{jawaban.jawabanEsai}</td>
                    <td colSpan={4} >
                      <Input 
                        defaultValue={jawaban.skorAngka}
                        onChange={e => { 
                          var skorAngka = e.target.value;
                          if (this.props.datasoal.skorMin > skorAngka)
                            e.target.value = this.props.datasoal.skorMin;
                          else if (skorAngka > this.props.datasoal.skorMax)
                            e.target.value = this.props.datasoal.skorMax;
                        
                          this.penilaian_vm.nilaiManual(jawaban.idjawaban, skorAngka);
                        }}
                        type="number" 
                        className="sm-7" 
                        min={this.props.datasoal.skorMin}  
                        max={this.props.datasoal.skorMax} 
                        />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </TabPane>
    );
  }
}

//---------------------------- Component Nilai Manual --------------------------//

interface NilaiManualStateModel 
{
  activeTab:number;
  showModal: boolean;
  listjawaban: Array<DataJawabanSoal>;
  ujian?: DataUjian;
  listsoal: Array<DataSoal>;
}

interface RouteParam { idujian:string; idkelas:string; }

interface NilaiManualModel { className?: string; }

class NilaiManual extends Component<NilaiManualModel & RouteComponentProps<RouteParam>, NilaiManualStateModel>
{
  private idujian: string;
  private idkelas: string;

  readonly pelaksanaan_vm: PelaksanaanViewModel;
  readonly soal_vm: SoalViewModel;
  readonly penilaian_vm: PenilaianViewModel;

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props: any) 
  {
    super(props);

    this.idujian = props.match.params.idujian;
    this.idkelas = props.match.params.idkelas;

    this.toggle = this.toggle.bind(this);
    this.toggle_modal = this.toggle_modal.bind(this);

    this.state = {
      activeTab: 0,
      showModal: false,
      listjawaban: [],
      listsoal: []
    };

    this.pelaksanaan_vm = PelaksanaanViewModel.getInstance();
    this.soal_vm = SoalViewModel.getInstance();
    this.penilaian_vm = PenilaianViewModel.getInstance();

    this.akhiri_penilaian_manual = this.akhiri_penilaian_manual.bind(this);
  }

  componentDidMount()
  {
    this.pelaksanaan_vm.initDataPelaksanaan(this.idujian).then(data => {
      data.namaKelas = data.pelaksanaan_ujian.filter(pel => {
        return pel.idkelas == this.idkelas
      })[0].namaKelas;

      this.setState({ ujian: data });
    });

    this.soal_vm.initDataSoal(this.idujian).then(data => {
      this.setState({ listsoal: data });
    });
  }

  toggle(tabManual) {
    if (this.state.activeTab !== tabManual) {
      this.setState({
        activeTab: tabManual
      });
    }
  }

  toggle_modal()
  {
    this.setState({ showModal: !this.state.showModal })
  }

  akhiri_penilaian_manual()
  {
   var a = this;
    this.penilaian_vm.akhiriPenilaianManual(this.idujian, this.idkelas).then(dt => {
      a.context.router.history.push(`/penilaian/${this.idujian}`)
    });
  }

  render_modal()
  {
    return (
      <Modal isOpen={this.state.showModal} toggle={this.toggle_modal} className='modal-primary'>
        <ModalHeader toggle={this.toggle_modal}>Akhiri Penilaian Manual</ModalHeader>
        <ModalBody>
          <p className="text-center">
            Apakah anda yakin ingin mengakhiri penilaian manual kelas {this.state.ujian.namaKelas}
            <b>Pastikan anda telah menilai ujian esai siswa sesuai rubrik yang telah anda buat</b>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle_modal}>Kembali</Button>
          <Button 
            color="warning" 
            onClick={this.akhiri_penilaian_manual}>
              Akhiri Penilaian Manual {this.state.ujian.namaKelas}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  render()
  {
    if(this.state.ujian === undefined) return (<div>Loading...</div>);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Table responsive size="sm">      
                  <tbody>
                    <tr>
                      <td><b>Kelas</b></td>
                      <td>{this.state.ujian.namaKelas}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><b>Mata Pelajaran</b></td>
                      <td>{this.state.ujian.namaMapel}</td>
                    </tr>
                    <tr>
                      <td><b>Nama Ujian</b></td>
                      <td>{this.state.ujian.namaUjian}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardHeader>

              <CardBody>
                <Row>
                  <Col className="col-sm-12 text-center">
                    <ButtonGroup className="text-center">
                      {
                        this.state.listsoal.map((soal, i) => {
                          return (
                            <Button 
                              key={i}
                              outline 
                              color="primary" 
                              onClick={() => this.toggle(i)} 
                              active={this.state.activeTab === i}>
                              Soal {i+1}
                            </Button>
                          );
                        })
                      }
                    </ButtonGroup>
                  </Col>
                  
                  <Col xs="12">
                    <TabContent activeTab={this.state.activeTab}>
                      {
                        this.state.listsoal.map((soal, i) => {
                          return (
                            <NilaiJawabanTab
                              key={soal.idsoal}
                              idujian={this.idujian}
                              idkelas={this.idkelas}
                              datasoal={soal}
                              idtab={i}/>
                          );
                        })
                      }
                    </TabContent>
                  </Col>
                </Row>
                  
                <Col className="col-sm-12 text-right">
                  <ButtonGroup className="text-right" >
                    <Link to={`/penilaian/${this.idujian}`}>
                      <Button color="primary">Kembali</Button>
                    </Link>
                    <Button color="warning" onClick={this.toggle_modal}>Akhiri Penilaian Manual</Button>
                  </ButtonGroup>
                </Col>

                {this.render_modal()}
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NilaiManual;
