const endPoints = {
    'get_settings': '/settings/get-info',
    'update_writeups': '/settings/update-writeups',
    'update_contact_info': '/settings/update-contact-info',
    'delete': '/faq/delete'
}

export const state = () => ({
    settings: []
})

export const getters = {
    getSettings: (state) => {
        return state.settings
    }
}

export const mutations = {
    SET_SETTINGS_STATE: (state, data) => {
        state.settings = data
    }
}

export const actions = {
    async getSettings({ state, commit }) {
        let res = await this.$axios.$get(endPoints.get_settings)
        commit('SET_SETTINGS_STATE', res)
        return res
    },

    async updateWriteups({ state, commit }, data) {
        try {
            let res = this.$axios.$put(endPoints.update_writeups, data)
            return res
        } catch (error) {
            return 0
        }
    },

    async updateContactInfo({ state, commit }, data) {
        try {
            let res = this.$axios.$put(endPoints.update_contact_info, data)
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