class ApiResource
{
    static get<T>(api_uri: string): Promise<T>
    {
        return fetch(api_uri).then(response => {
            if(!response.ok)
            {
                throw new Error(response.statusText);
                //return {role:''};
            }
            return response.json().then(data => data as T);
        })
        .catch((error:Error)=> {
            throw error;
        });
    }
}

export default ApiResource;