import API from "../../models/api";
import DataJawabanSoal from '../../models';
import { isNullOrUndefined } from "util";

interface JsonAPIJawaban{ idjawaban:string; }
interface JsonAPIDataJawaban { data: DataJawabanSoal; }

/**
 * Kelas untuk menngelola data Jawaban
 */
export class JawabanViewModel
{

    /**
     * Mendapatkan Data Jawaban
     * @param data Data Jawaban
     */
    initDataJawaban(idsoal:string)
    {
        return API<JsonAPIDataJawaban>('/api/jawaban/' + idsoal)
        .then(value => {
            return value.data
        });
    }

    /**
     * Menginputkan Data Jawaban
     * @param data Data Jawaban
     */
    inputDataJawaban(data:any)
    {
        return API<JsonAPIJawaban>('/api/jawaban', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.idjawaban;
        });
    }

    /**
     * 
     * @param idjawaban 
     * @param data 
     */
    updateDataJawaban(idjawaban: string, data:any)
    {
        return API<JsonAPIJawaban>('/api/jawaban/'+ idjawaban,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }

}