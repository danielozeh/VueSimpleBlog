const apiEndpoints = {
    'get_all_users': '/user/get-all',
    'block_user': '/user/block-user',
    'unblock_user': '/user/unblock-user',
    'view_user_profile': '/user/user-profile',
    'view_profile': '/user/profile',
    'update_user_profile': '/user/update-user-profile',
    'update_profile': '/user/update-profile',
    'change_password': '/user/change-password',
    'update_profile_picture': '/user/update-profile-picture',
    'send_mail': '/mail/send',
}

export const state = () => ({
    all_users: [],
})

export const mutations = {
    SET_USERS: (state, all_users) => {
        state.all_users = all_users
    }
}

export const actions = {

    //////////////////////////////
    //ACTIONS FOR USERS//////////
    //////////////////////////////

    async getAllUsers({ state, commit }) {
        let res = await this.$axios.$get(apiEndpoints.get_all_users)
            commit('SET_USERS', res)
        return res
    },

    async viewUserProfile({ state, commit }, id) {
        let res = await this.$axios.$get(apiEndpoints.view_user_profile + '/' + id)
        return res;
    },

    async viewProfile({ state, commit }) {
        let res = await this.$axios.$get(apiEndpoints.view_profile)
        return res;
    },

    async blockUser({}, id) {
        let res = await this.$axios.$post(apiEndpoints.block_user + '/' + id)
        return res
    },

    async unblockUser({}, id) {
        let res = await this.$axios.$post(apiEndpoints.unblock_user + '/' + id)
        return res
    },

    async updateUserProfile({}, data) {
        let res = await this.$axios.$post(apiEndpoints.update_user_profile + '/' + data.user_id, data);
        return res;
    },

    async updateProfile({}, data) {
        let res = await this.$axios.$post(apiEndpoints.update_profile, data);
        return res;
    },

    async changePassword({}, data) {
        let res = await this.$axios.$post(apiEndpoints.change_password, data);
        return res;
    },

    async updateProfilePicture({}, data) {
        let res = await this.$axios.$post(apiEndpoints.update_profile_picture, data);
        return res;
    },

    async sendMail({}, data) {
        let res = await this.$axios.$post(apiEndpoints.send_mail, data);
        return res;
    }

}