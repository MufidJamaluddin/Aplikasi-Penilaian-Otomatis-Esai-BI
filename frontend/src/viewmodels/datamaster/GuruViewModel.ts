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
    static __instance?: GuruViewModel;

    static getInstance() : GuruViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new GuruViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Guru
     * dan Menampilkannya di View
     */
    async initDataGuru()
    {
        const value = await API<JsonAPIGuru>('/api/guru');
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Mendapatkan Detail Data Guru (Pengampu)
     * dan Menampilkannya di View
     */
    async initDataPengampu(idguru: string)
    {
        const value = await API<JsonAPIPengampu>('/api/pengampu/' + idguru);
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menginputkan Data Guru
     * @param data Data Guru Sekolah
     */
    async inputDataGuru(data:Partial<DataGuru>)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIGuru>('/api/guru', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Mengubah Data Guru
     * @param data Data Guru Sekolah
     */
    async updateDataGuru(idguru:string, data:Partial<DataGuru>)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIGuru>('/api/guru/' + idguru, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menghapus Data Guru
     * @param data Data Guru Sekolah
     */
    async hapusDataGuru(idguru:string)
    {
        const value = await API<JsonAPIGuru>('/api/guru/' + idguru, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

}