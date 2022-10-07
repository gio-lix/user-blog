import axios from "axios";

export const fetchDataApi = {
    async postData(url: string, token: string, postData: any) {
        try {
            const {data} = await axios.post(`/api/${url}`, postData,{
                headers: {
                    'Authorization': `${token}`
                }
            })
            return data
        } catch (err) {
            console.log(err)
        }
    }
}