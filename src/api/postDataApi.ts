import axios from "axios";

export const fetchDataApi = {
    async postData(url: string, token: string, postData: any) {
        try {
            const {data} = await axios.post(`/api/${url}`, postData, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return {success: data}
        } catch (err) {
            return {error: err}
        }
    },
    async updateData(url: string, token: string, postData: any = null) {
        try {
            const {data} = await axios.put(`/api/${url}`, postData, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return {success: data}
        } catch (err) {
            return {error: err}
        }
    },
    async deleteData(url: string, token: string) {
        try {
            const {data} = await axios.delete(`/api/${url}`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return {success: data}
        } catch (err) {
            return {error: err}
        }
    },
    async getData(url: string, token: string) {
        try {
            const {data} = await axios.get(`/api/${url}`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            return {success: data}
        } catch (err) {
            return {error: err}
        }
    }
}