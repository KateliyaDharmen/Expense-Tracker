import { HOST_URL } from '../../config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestMe = async(route: string, option: any) => {

    option = {
        ...option,
        'Content-Type': 'application/json',
    }

    return await fetch(HOST_URL+ route, option)
        .then(async (res)=>{
            if (!res || !res.ok || res.status >= 400) {
                throw res;
            }
            const response = await res.json();
            
            if (response.status !== 'success') {
                throw response;
            } else {
                // console.log({route, options, response});
                return response.payload;
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
}