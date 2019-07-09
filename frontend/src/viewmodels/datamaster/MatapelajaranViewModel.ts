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
    static __instance?: MatapelajaranViewModel;

    static getInstance() : MatapelajaranViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new MatapelajaranViewModel();

        return this.__instance
    }
    
    /**
     * Mendapatkan Data Mata Pelajaran
     * dan Menampilkannya di View
     */
    async initDatamatapelajaran()
    {
        const value = await API<JsonAPIMatapelajaran>('/api/matapelajaran');
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menginputkan Data Mata Pelajaran
     * @param data Data Mata Pelajaran Sekolah
     */
    async inputDatamatapelajaran(data:any)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIMatapelajaran>('/api/matapelajaran', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Mengubah Data Mata Pelajaran
     * @param data Data Mata Pelajaran Sekolah
     */
    async updateMatapelajaran(idmapel:string, data:any)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIMatapelajaran>('/api/matapelajaran/' + idmapel, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menghapus Data Mata Pelajaran
     * @param data Data Mata Pelajaran Sekolah
     */
    async hapusMatapelajaran(idmapel:string)
    {
        const value = await API<JsonAPIMatapelajaran>('/api/matapelajaran/' + idmapel, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

}