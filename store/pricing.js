const endPoints = {
    'get_all': '/plan/get-all',
    'add_plan': '/plan/add',
    'edit_plan': '/plan/edit',
    'delete_plan': '/plan/delete',
    'plan_details': '/plan/details',
    'subscribe': '/subscribers/subscribe',
    'my_subscriptions': '/subscribers',
    'all_subscriptions': '/subscribers/all',
    'check_if_subscribed': '/subscribers/check-subscription',
    'approve_payment': '/subscribers/approve',
    'approve_coinbase_payment': '/subscribers/coinbase/approve',
    'cancel_coinbase_payment': '/subscribers/coinbase/cancel'
}

export const state = () => ({

})

export const mutations = {

}

export const actions = {
    async getAllPlans({ state }) {
        try {
            let res = await this.$axios.$get(endPoints.get_all)
            return res
        } catch (error) {
            return error
        }
    },

    async getMySubscriptions({}) {
        try {
            let res = await this.$axios.$get(endPoints.my_subscriptions)
            return res
        } catch (error) {
            return error
        }
    },

    async getAllSubscriptions({}) {
        try {
            let res = await this.$axios.$get(endPoints.all_subscriptions)
            return res
        } catch (error) {
            return error
        }
    },

    async addPlan({ state }, data) {
        try {
            let res = await this.$axios.$post(endPoints.add_plan, data)
            return res
        } catch (error) {
            return error
        }
    },

    async editPlan({ state }, data) {
        try {
            let res = await this.$axios.$put(endPoints.edit_plan + '/' + data.id, data)
            return res
        } catch (error) {
            return error
        }
    },

    async deletePlan({ state }, id) {
        try {
            let res = await this.$axios.$delete(endPoints.delete_plan + '/' + id)
            return res
        } catch (error) {
            return error
        }
    },

    async getPlanDetails({}, id) {
        try {
            let res = await this.$axios.$get(endPoints.plan_details + '/' + id)
            return res
        } catch (error) {
            return error
        }
    },

    async subscribe({}, data) {
        try {
            let res = await this.$axios.$post(endPoints.subscribe + '/' + data.plan_id, data)
            return res
        } catch (error) {
            return error
        }
    },

    async checkIfSubscribed({}, user_id) {
        try {
            let res = await this.$axios.$get(endPoints.check_if_subscribed + '/' + user_id)
            return res
        } catch (error) {
            return error
        }
    },

    async approvePayment({ state }, id) {
        try {
            let res = await this.$axios.$post(endPoints.approve_payment + '/' + id)
            return res
        } catch (error) {
            return error
        }
    },

    async approveCoinbasePayment({ state }, ref) {
        try {
            let res = await this.$axios.$post(endPoints.approve_coinbase_payment + '/' + ref)
            return res
        } catch (error) {
            return error
        }
    },

    async cancelCoinbasePayment({ state }, ref) {
        try {
            let res = await this.$axios.$post(endPoints.cancel_coinbase_payment + '/' + ref)
            return res
        } catch (error) {
            return error
        }
    },
}