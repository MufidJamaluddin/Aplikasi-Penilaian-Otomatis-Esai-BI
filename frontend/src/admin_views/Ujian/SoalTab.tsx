import React, { PureComponent } from 'react';
import { FormGroup, Input, Col, TabPane } from 'reactstrap';
import { updateDataSoal } from './../../models/SoalData';

interface SoalTabAttribute 
{ 
  tabId: number;
  viewonly?: boolean;
  idujian: string;
  idsoal: string;
  skorMin?: string; 
  skorMax?: string;
  materiPokok?: string;
  kompetensiDasar?: string;
  soalEsai?: string;
}

interface SoalTabState 
{ 
  soalEsai?: string;
  skorMin: string;
  skorMax?: string;
  kompetensiDasar?: string;
  materiPokok?: string;
}

class SoalTab extends PureComponent<SoalTabAttribute, SoalTabState>
{
  constructor(props: any)
  {
    super(props);

    this.state = {
      skorMin: props.skorMin || "0",
      skorMax: props.skorMax,
      materiPokok: props.materiPokok,
      kompetensiDasar: props.kompetensiDasar,
      soalEsai: props.soalEsai
    };

    this.onSkorMinInput = this.onSkorMinInput.bind(this);
    this.onSkorMaxInput = this.onSkorMaxInput.bind(this);
    this.onMateriPokokInput = this.onMateriPokokInput.bind(this);
    this.onKompetensiDasarInput = this.onKompetensiDasarInput.bind(this);
    this.onSoalEsaiInput = this.onSoalEsaiInput.bind(this);
  }

  /**
   * Ketika Telah Render Ulang
   */
  componentDidUpdate(prevProps: SoalTabAttribute, prevState: SoalTabState)
  {
    if(this.props.idsoal !== prevProps.idsoal) return;

    var update = prevState.soalEsai !== this.state.soalEsai;
    update = update || prevState.skorMax !== this.state.skorMax;
    update = update || prevState.skorMin !== this.state.skorMin;
    update = update || prevState.kompetensiDasar!== this.state.kompetensiDasar;
    update = update || prevState.materiPokok!== this.state.materiPokok;

    /**
     * Kirim Perubahan ke BackEnd
     */
    if(update)
    {
      updateDataSoal(this.props.idsoal, this.state).then(state => {
        this.setState(state);
      });
    }
  }

  //------------------------- Skor Input -----------------------//
  onSkorMinInput(event: any)
  {
    this.setState({ skorMin: event.target.value });
  }

  onSkorMaxInput(event: any)
  {
    this.setState({ skorMax: event.target.value });
  }

  onMateriPokokInput(event: any)
  {
    this.setState({ materiPokok: event.target.value });
  }

  onKompetensiDasarInput(event: any)
  {
    this.setState({ kompetensiDasar: event.target.value });
  }

  onSoalEsaiInput(event: any)
  {
    this.setState({ soalEsai: event.target.value });
  }

  // ------------------------------- Render ----------------------///

  render()
  {
    if(this.props.viewonly)
    {
      return (
        <TabPane tabId={String(this.props.tabId)}>
          <FormGroup row>
            <Col className="col-sm-2">
              <h5>No. Soal: {this.props.tabId + 1}</h5>
            </Col>    
            <Col className="col-sm-2 text-right">
              Minimal Skor Jawaban : {this.props.skorMin}
            </Col>
            <Col className="col-sm-2 text-right">
              Maksimal Skor Jawaban : {this.props.skorMax}
            </Col>
            <Col className="col-sm-6 text-right">
              <p>Materi Pokok : {this.props.materiPokok}</p>
            </Col>
            <Col className="col-sm-12 text-right">
              <p>Kompetensi Dasar : {this.props.kompetensiDasar}</p>
            </Col>
            <p>{this.props.soalEsai}</p>                       
          </FormGroup>
        </TabPane>
      );
    }

    return (
      <TabPane tabId={String(this.props.tabId)}>
        <FormGroup row>
          <Col className="col-sm-2">
            <h5>No. Soal: {this.props.tabId + 1}</h5>
          </Col>    
          <Col className="col-sm-2 text-right">
            <Input bsSize="sm" type="number" defaultValue={this.props.skorMin||''} onBlur={this.onSkorMinInput} placeholder="Minimum Skor" required />
          </Col>
          <Col className="col-sm-2 text-right">
            <Input bsSize="sm" type="number" defaultValue={this.props.skorMax||''} onBlur={this.onSkorMaxInput} placeholder="Maksimum Skor" required/>
          </Col>
          <Col className="col-sm-6 text-right">
            <Input bsSize="sm" type="text" defaultValue={this.props.materiPokok||''} onBlur={this.onMateriPokokInput} placeholder="Materi Pokok" required />
          </Col>
          <Col className="col-sm-12 text-right">
            <Input bsSize="sm" type="text" defaultValue={this.props.kompetensiDasar||''} onBlur={this.onKompetensiDasarInput} placeholder="Kompetensi Dasar" required />
          </Col>
          <Input type="textarea" rows="5" defaultValue={this.props.soalEsai||''} onBlur={this.onSoalEsaiInput} placeholder="Input Soal" required/>                       
        </FormGroup>
      </TabPane>
    );
  }
}

export default SoalTab;