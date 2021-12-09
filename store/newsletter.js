const apiEndpoints = {
    'get_all': '/newsletter/get-all',
    'subscribe': '/newsletter/subscribe',
    'unsubscribe': '/newsletter/unsubscribe'
}

export const state = () => ({
    all_newsletter: [],
})

export const mutations = {
    
}

export const actions = {

    //////////////////////////////
    //ACTIONS FOR NEWSLETTER//////////
    //////////////////////////////

    async getAllNewsletterSubscribers({ state, commit }) {
        let res = await this.$axios.$get(apiEndpoints.get_all)
        return res
    },

    async subscribe({ state, commit }, data) {
        let res = await this.$axios.$post(apiEndpoints.subscribe, data)
        return res;
    },

    async unsubscribe({}, data) {
        let res = await this.$axios.$delete(apiEndpoints.unsubscribe, data)
        return res
    },

}