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
    static __instance?: JawabanViewModel;

    static getInstance() : JawabanViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new JawabanViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Jawaban
     * @param data Data Jawaban
     */
    async initDataJawaban(idsoal:string)
    {
        const value = await API<JsonAPIDataJawaban>('/api/jawaban/' + idsoal);
        console.log(value);
        return value.data;
    }

    /**
     * Menginputkan Data Jawaban
     * @param data Data Jawaban
     */
    async inputDataJawaban(data:any)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIJawaban>('/api/jawaban', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log(value.idjawaban);
        return value.idjawaban;
    }

    /**
     * 
     * @param idjawaban 
     * @param data 
     */
    updateDataJawaban(idjawaban: string, data:any)
    {
        console.log(JSON.stringify(data));

        return API<JsonAPIJawaban>('/api/jawaban/'+ idjawaban,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }

}