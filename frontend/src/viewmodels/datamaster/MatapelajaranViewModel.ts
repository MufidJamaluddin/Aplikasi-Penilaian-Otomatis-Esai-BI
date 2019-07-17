import API from "../../models/api";
import DataMatapelajaran from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIMatapelajaran { list: Array<DataMatapelajaran>; }

/**
 * Kelas untuk mendapatkan data guru
 */
export class MatapelajaranViewModel
{
   
    /**
     * Mendapatkan Data Mata Pelajaran
     * dan Menampilkannya di View
     */
    initDatamatapelajaran()
    {
        return API<JsonAPIMatapelajaran>('/api/matapelajaran')
        .then(value => {
            return value.list;
        });
    }

    /**
     * Menginputkan Data Mata Pelajaran
     * @param data Data Mata Pelajaran Sekolah
     */
    inputDatamatapelajaran(data:any)
    {
        return API<JsonAPIMatapelajaran>('/api/matapelajaran', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.list;
        });
    }

    /**
     * Mengubah Data Mata Pelajaran
     * @param data Data Mata Pelajaran Sekolah
     */
    updateMatapelajaran(idmapel:string, data:any)
    {
        return API<JsonAPIMatapelajaran>('/api/matapelajaran/' + idmapel, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.list;
        });
    }

    /**
     * Menghapus Data Mata Pelajaran
     * @param data Data Mata Pelajaran Sekolah
     */
    hapusMatapelajaran(idmapel:string)
    {
        return API<JsonAPIMatapelajaran>('/api/matapelajaran/' + idmapel, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        })
        .then(value => {
            return value.list;
        });
    }

}