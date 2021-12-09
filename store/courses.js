const apiEndpoints = {
    'get_all_courses': '/courses/get-all',
    'get_my_courses': '/courses/user',
    'add_course': '/courses/add',
    'edit_course': '/courses/edit',
    'delete_course': '/courses/delete',
    'get_course_contents': '/courses/contents',
    'get_course_payments': '/courses/payments',
    'get_course_details': '/courses/details',
    'add_course_content': '/courses/add-content',
    'delete_course_content': '/courses/delete-content'
}

export const state = () => ({
    all_courses: [],
})

export const mutations = {
    SET_CATEGORIES: (state, all_courses) => {
        state.all_courses = all_courses
    }
}

export const actions = {

    //////////////////////////////
    //ACTIONS FOR COURSES//////////
    //////////////////////////////

    async getAllCourses({ state, commit }) {
        let res = await this.$axios.$get(apiEndpoints.get_all_courses)
        return res
    },

    async getMyCourses({ state, commit }, user_id) {
        let res = await this.$axios.$get(apiEndpoints.get_my_courses + '/' + user_id)
        return res
    },

    async addCourse({}, data) {
        //console.log(data)
        let res = await this.$axios.$post(apiEndpoints.add_course, data)
        return res
        //console.log(res)
    },

    async editCourse({}, data) {
        //console.log(data)
        let res = await this.$axios.$put(apiEndpoints.edit_course + "/" + data.id, data)
        return res
        //console.log(res)
    },

    async deleteCourse({}, id) {
        let res = await this.$axios.$delete(apiEndpoints.delete_course + "/" + id)
        //console.log(res)
        return res
    },

    async deleteCourseContent({}, id) {
        let res = await this.$axios.$delete(apiEndpoints.delete_course_content + "/" + id)
        //console.log(res)
        return res
    },

    async getCourseContents({}, id) {
        let res = await this.$axios.$get(apiEndpoints.get_course_contents + "/" + id)
        return res
    },

    async addCourseContent({}, data) {
        //console.log(data.content_id)
        let res = await this.$axios.$post(apiEndpoints.add_course_content + "/" + data.content_id, data.fd)
        return res
    },

    async getCoursePayments({}, id) {
        let res = await this.$axios.$get(apiEndpoints.get_course_payments + "/" + id)
        return res
    },

    async getCourseDetails({}, id) {
        let res = await this.$axios.$get(apiEndpoints.get_course_details + "/" + id)
        return res
    }

}