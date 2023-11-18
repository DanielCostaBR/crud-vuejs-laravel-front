import { api } from 'boot/axios'

export default function useApi(url) {
    const list = async () => {
        try {
            const { data } = await api.get(url)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const getById = async (id) => {
        try {
            const { data } = await api.get(`${url}/${id}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const post = async (values) => {
        try {
            const { data } = await api.post('/api/register-expense', values)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const validateDate = async (values) => {
        try {
            const { data } = await api.post('/api/validate-date', values)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const update = async (values) => {
        try {
            const { data } = await api.put(`${'/api/edit-expense'}/${values.id}`, values)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const remove = async (id) => {
        try {
            const { data } = await api.delete(`${'/api/remove'}/${id}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    return {
        list,
        post,
        update,
        remove,
        getById,
        validateDate
    }
}