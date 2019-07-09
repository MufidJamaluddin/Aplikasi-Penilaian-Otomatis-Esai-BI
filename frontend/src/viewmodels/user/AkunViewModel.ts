import { isNullOrUndefined } from "util";

/**
 * Kelas untuk menngelola data Akun
 */
export class AkunViewModel
{
    static __instance?: AkunViewModel;

    static getInstance() : AkunViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new AkunViewModel();

        return this.__instance
    }

    login()
    {

    }

    ganti_password()
    {
        
    }
}