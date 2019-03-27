class ApiResource
{
    static get<T>(url: string): Promise<T>
    {
        return fetch(url).then(response => {
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