const endPoints = {
    'get_all': '/signal/get-all',
    'get_mine': '/signal/mine',
    'add_signal': '/signal/add',
    'edit_signal': '/signal/edit',
    'delete_signal': '/signal/delete',
    'signal_details': '/signal/details',
}

export const state = () => ({

})

export const mutations = {

}

export const actions = {
    async getAllSignals({ state }, id) {
        try {
            let res = await this.$axios.$get(endPoints.get_all + '/' + id)
            return res
        } catch (error) {
            return error
        }
    },

    async getMySignals({ state }, id) {
        try {
            let res = await this.$axios.$get(endPoints.get_mine)
            return res
        } catch (error) {
            return error
        }
    },

    async addSignal({ state }, data) {
        try {
            let res = await this.$axios.$post(endPoints.add_signal, data)
            return res
        } catch (error) {
            return error
        }
    },

    async editSignal({ state }, data) {
        try {
            let res = await this.$axios.$put(endPoints.edit_signal + '/' + data.id, data)
            return res
        } catch (error) {
            return error
        }
    },

    async deleteSignal({ state }, id) {
        try {
            let res = await this.$axios.$delete(endPoints.delete_signal + '/' + id)
            return res
        } catch (error) {
            return error
        }
    },

    async getSignalDetails({}, id) {
        try {
            let res = await this.$axios.$get(endPoints.signal_details + '/' + id)
            return res
        } catch (error) {
            return error
        }
    }
}