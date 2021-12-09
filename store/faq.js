import { data } from "jquery"

const endPoints = {
    'get_all': '/faq/get-all',
    'add': '/faq/add',
    'edit': '/faq/edit',
    'delete': '/faq/delete'
}

export const state = () => ({
    all_faq: []
})

export const getters = {
    getAllFAQ: (state) => {
        return state.all_faq
    }
}

export const mutations = {
    SET_FAQ_STATE: (state, data) => {
        state.all_faq = data
    }
}

export const actions = {
    async getAllFAQ({ state, commit }) {
        try {
            let res = this.$axios.$get(endPoints.get_all)
            commit('SET_FAQ_STATE', res)
            return res
        } catch (error) {
            return 0
        }
    },

    async addFAQ({ state, commit }, data) {
        try {
            let res = this.$axios.$post(endPoints.add, data)
            return res
        } catch (error) {
            return 0
        }
    },

    async editFAQ({ state, commit }, data) {
        try {
            let res = this.$axios.$put(endPoints.edit + '/' + data.id, data)
            return res
        } catch (error) {
            return 0
        }
    },

    async deleteFAQ({ state, commit }, id) {
        try {
            let res = this.$axios.$delete(endPoints.delete + '/' + id)
            return res
        } catch (error) {
            return 0
        }
    }
}