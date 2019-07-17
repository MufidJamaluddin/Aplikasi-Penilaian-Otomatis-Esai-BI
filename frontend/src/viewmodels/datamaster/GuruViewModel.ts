import API from "../../models/api";
import DataGuru from '../../models';
import DataPengampu from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIGuru { list: Array<DataGuru>; }
interface JsonAPIPengampu { list: Array<DataPengampu>; }

/**
 * Kelas untuk mendapatkan data guru
 */
export class GuruViewModel
{
    /**
     * Mendapatkan Data Guru
     * dan Menampilkannya di View
     */
    initDataGuru()
    {
        return API<JsonAPIGuru>('/api/guru')
        .then(value => {
            return value.list;
        })
    }

    /**
     * Mendapatkan Detail Data Guru (Pengampu)
     * dan Menampilkannya di View
     */
    initDataPengampu(idguru: string)
    {
        return API<JsonAPIPengampu>('/api/pengampu/' + idguru)
        .then(value => {
            return value.list;
        })
    }

    /**
     * Menginputkan Data Guru
     * @param data Data Guru Sekolah
     */
    inputDataGuru(data:Partial<DataGuru>)
    {
        return API<JsonAPIGuru>('/api/guru', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.list;
        });
    }

    /**
     * Mengubah Data Guru
     * @param data Data Guru Sekolah
     */
    updateDataGuru(idguru:string, data:Partial<DataGuru>)
    {
        return API<JsonAPIGuru>('/api/guru/' + idguru, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.list;
        });
    }

    /**
     * Menghapus Data Guru
     * @param data Data Guru Sekolah
     */
    hapusDataGuru(idguru:string)
    {
        return API<JsonAPIGuru>('/api/guru/' + idguru, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        })
        .then(value => {
            return value.list; 
        })
    }

}