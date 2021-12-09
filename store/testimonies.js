const apiEndpoints = {
    'get_all_testimonies': '/testimony/get-all',
    'get_testimony_details': '/testimony',
    'add_testimony': '/testimony/add',
    'edit_testimony': '/testimony/edit',
    'delete_testimony': '/testimony/delete',
}

export const state = () => ({
    all_testimonies: [],
})

export const mutations = {
    SET_CATEGORIES: (state, all_testimonies) => {
        state.all_testimonies = all_testimonies
    }
}

export const actions = {

    //////////////////////////////
    //ACTIONS FOR ARTICLES//////////
    //////////////////////////////

    async getAllTestimonies({ state, commit }, data) {
        let res = await this.$axios.$get(apiEndpoints.get_all_testimonies + '/' + data.status_id)
        return res
    },
    async getTestimonyDetails({ state, commit }, id) {
        let res = await this.$axios.$get(apiEndpoints.get_testimony_details + '/' + id)
        return res
    },

    async addTestimony({}, data) {
        let res = await this.$axios.post(apiEndpoints.add_testimony, data)
    },

    async editTestimony({}, data) {
        //console.log(data)
        let res = await this.$axios.put(apiEndpoints.edit_testimony + "/" + data.id, data)
        //console.log(res)
    },

    async deleteTestimony({}, id) {
        let res = await this.$axios.delete(apiEndpoints.delete_testimony + "/" + id)
        //console.log(res)
        return res
    }

}