import useApi from "src/composables/UserApi"

export default function postsService() {
    const { list, post, update, remove, getById, validateDate } = useApi('/api/data')

    return {
        list,
        post,
        update,
        remove,
        getById,
        validateDate
    }
}