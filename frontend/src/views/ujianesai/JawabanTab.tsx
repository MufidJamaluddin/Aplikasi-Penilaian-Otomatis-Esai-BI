import React, { Component } from "react";
import { FormGroup, Input, Col, TabPane } from 'reactstrap';
import { initDataJawaban, inputDataJawaban, updateDataJawaban } from '../../models/JawabanData';

const INTERVAL = 1000;

interface SoalTabAttribute 
{ 
  tabId: number;
  noSoal: number;
  idsoal: string;
  skorMax: string;
  soalEsai: string;
}

interface JawabanState 
{
    idsoal: string; 
    idjawaban?: string, 
    jawabanEsai?: string; 
}

class JawabanTab extends Component<SoalTabAttribute, JawabanState>
{
    /**
     * Kirim Ke BackEnd dengan Interval
     */
    private _interval_typing:any;
    private _waktunya_ngirim:boolean = false;

    constructor(props:any)
    {
        super(props);
        this.state = { idsoal: props.idsoal }

        this._interval_typing = setInterval(()=>{this._waktunya_ngirim = true}, INTERVAL);
        this.onJawabanEsaiChange = this.onJawabanEsaiChange.bind(this);
    }

    onJawabanEsaiChange(event:any)
    {
        this.setState({ jawabanEsai: event.target.value });
    }

    componentDidMount()
    {
        initDataJawaban(this.props.idsoal).then(jawaban => {
            this.setState({ jawabanEsai: jawaban.jawabanEsai || '' });
        })
        .catch(error=> {
            console.log(error);
        });
    }

    componentDidUpdate(prevProps: SoalTabAttribute, prevState: JawabanState)
    {
        if(this._waktunya_ngirim && prevState.jawabanEsai != this.state.jawabanEsai)
        {
            clearTimeout(this._interval_typing);
            this._waktunya_ngirim = false;

            if(this.state.idjawaban)
            {
                updateDataJawaban(this.state.idjawaban, this.state);
            }
            else
            {
                inputDataJawaban(this.state).then(idjawaban => {
                    this.setState({ idjawaban: idjawaban });
                });
            }

            setInterval(()=>{this._waktunya_ngirim = true}, INTERVAL);
        }
    }

    render()
    {
        return(
            <TabPane tabId={this.props.tabId}>
                <FormGroup row>
                <Col className="col-sm-3">
                    <h5>Soal { this.props.noSoal } :</h5>
                </Col>    

                <Col sm="12">
                    <p>{ this.props.soalEsai }</p>
                    <span>Maks Skor {this.props.skorMax}</span>
                </Col>
                <Col sm="12">
                    <Input 
                        type="textarea" 
                        rows="6" 
                        placeholder="Input Jawaban" 
                        value={this.state.jawabanEsai||''}
                        onChange={this.onJawabanEsaiChange}
                        required/> 
                </Col>                      
                </FormGroup>
            </TabPane>
        );
    }
}

export default JawabanTab;