function API<T>(api_uri: string, request?: any): Promise<T>
{
    return fetch(api_uri, request).then(response => {
        if(!response.ok)
        {
            /**
             * Error di Back End dengan Input Seperti Itu
             * cara catch: then -> catch((er)=>{ ... })
             */
            throw new Error(response.statusText);
        }
        return response.json().then(data => data as T);
    });
}

export default API;