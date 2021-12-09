const endPoints = {
    'get_all': '/team/all',
    'add': '/team/add',
    'get_details': '/team/details',
    'edit': '/team/edit',
    'delete': '/team/delete'
}

export const state = () => ({
    all_team: []
})

export const getters = {
    getAll: (state) => {
        return state.all_team
    }
}

export const mutations = {
    SET_TEAM_STATE: (state, data) => {
        state.all_team = data
    }
}

export const actions = {
    async getAll({ state, commit }) {
        try {
            let res = this.$axios.$get(endPoints.get_all)
            commit('SET_TEAM_STATE', res)
            return res
        } catch (error) {
            return 0
        }
    },

    async add({ state, commit }, data) {
        try {
            let res = this.$axios.$post(endPoints.add, data)
            return res
        } catch (error) {
            return 0
        }
    },

    async getDetails({ state, commit }, id) {
        try {
            let res = this.$axios.$get(endPoints.get_details + '/' + id)
            return res
        } catch (error) {
            return 0
        }
    },

    async edit({ state, commit }, data) {
        try {
            let res = this.$axios.$post(endPoints.edit + '/' + data.id, data.fd)
            //console.log(res)
            return res
        } catch (error) {
            return 0
        }
    },

    async delete({ state, commit }, id) {
        try {
            let res = await this.$axios.$delete(endPoints.delete + '/' + id)
            return res
        } catch (error) {
            return 0
        }
    }
}