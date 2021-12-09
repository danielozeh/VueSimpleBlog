const endPoints = {
    'get_all_categories': '/blog/category/get-all',
    'add_new_category': '/blog/category/add',
    'delete_category': '/blog/category/delete',
    'get_all': '/blog/post/get-all',
    'blog_by_category': '/blog/post/category',
    'blog_by_category_slug': '/blog/post/category-slug',
    'blog_details': '/blog/post/details',
    'blog_details_by_slug': '/blog/post/details-by-slug',
    'moderate_post': '/blog/post/moderate',
    'pin_post': '/blog/pin-post',
    'unpin_post': '/blog/unpin-post',
    'feature_post': '/blog/make-featured',
    'unfeature_post': '/blog/unfeature-post',
    'delete_post': '/blog/post/delete',
    'moderate_comment': '/blog/comment/moderate',
    'add_blog_post': '/blog/post/add',
    'edit_blog_post': '/blog/post/edit',
    'delete_blog_post': '/blog/post/delete',
    'add_blog_comment': '/blog/post/comment/add',
    'get_category_details': '/blog/category/details',
    'edit_category': '/blog/category/edit'
}

export const state = () => ({
    all_post: [],
    all_categories: [],
})

export const mutations = {
    SET_BLOG_POST: (state, all_post) => {
    },
    SET_CATEGORIES: (state, all_categories) => {
        state.all_categories = all_categories
    }
}

export const actions = {
    ////////////////////////////////
    //////ACTIONS FOR BLOG/////////
    /////////////////////////////

    async getAllCategories({ state, commit }) {
        let res = await this.$axios.$get(endPoints.get_all_categories)
            //commit('SET_CATEGORIES', res)
        return res
    },

    async addNewCategory({}, data) {
        //console.log(data)
        let res = await this.$axios.post(endPoints.add_new_category, data)
        //console.log(res)
    },

    async deleteCategory({}, id) {
        let res = await this.$axios.delete(endPoints.delete_category + "/" + id)
        //console.log(res)
        return res
    },

    async getBlogPosts({ state, commit }, data) {
        try {
            let res = this.$axios.$get(endPoints.get_all + '/' + data.status)
            return res
        } catch (error) {
            return error
        }
    },

    async getBlogPostsByCategory({}, data) {
        try {
            let res = this.$axios.$get(endPoints.blog_by_category + '/' + data.id + '/' + data.status)
            return res
        } catch (error) {
            return error
        }
    },

    async getBlogPostsByCategorySlug({}, data) {
        try {
            let res = await this.$axios.$post(endPoints.blog_by_category_slug + '/' + data.slug + '/' + data.status, data)
            //console.log(data)
            return res
        } catch (error) {
            return error
        }
    },

    async getBlogPostDetails({}, data) {
        try {
            let res = this.$axios.$get(endPoints.blog_details + '/' + data.id)
            return res
        } catch (error) {
            return error
        }
    },

    async getBlogPostDetailsBySlug({}, data) {
        try {
            let res = this.$axios.$get(endPoints.blog_details_by_slug + '/' + data.slug)
            return res
        } catch (error) {
            return error
        }
    },

    async moderatePost({}, data) {
        let res = await this.$axios.$put(endPoints.moderate_post + "/" + data.id, data)
        //console.log(res)
        return res
    },

    async pinPost({}, id) {
        let res = await this.$axios.$post(endPoints.pin_post + "/" + id)
        //console.log(res)
        return res
    },

    async unpinPost({}, id) {
        let res = await this.$axios.$put(endPoints.unpin_post + "/" + id)
        //console.log(res)
        return res
    },

    async featurePost({}, id) {
        let res = await this.$axios.$post(endPoints.feature_post + "/" + id)
        //console.log(res)
        return res
    },

    async unfeaturePost({}, id) {
        let res = await this.$axios.$put(endPoints.unfeature_post + "/" + id)
        //console.log(res)
        return res
    },

    async deletePost({}, id) {
        let res = await this.$axios.$delete(endPoints.delete_post + "/" + id)
        //console.log(res)
        return res
    },

    async moderateComment({}, data) {
        let res = await this.$axios.$put(endPoints.moderate_comment + "/" + data.id, data)
        //console.log(res)
        return res
    },

    async addBlogPost({}, data) {
        //console.log(data)
        let res = await this.$axios.$post(endPoints.add_blog_post, data)
        return res
        //console.log(res)
    },

    async editBlogPost({}, data) {
        //console.log(data)
        let res = await this.$axios.$post(endPoints.edit_blog_post + '/' + data.blog_id, data.fd)
        //console.log(res)
    },

    async deleteBlogPost({}, data) {
        //console.log(data)
        let res = await this.$axios.$post(endPoints.delete_blog_post + '/' + id)
        //console.log(res)
    },

    async addBlogComment({}, data) {
        //console.log(data)
        let res = await this.$axios.$post(endPoints.add_blog_comment, data)
        //console.log(res)
        return res
    },

    async getBlogCategoryDetails({}, id) {
        try {
            let res = this.$axios.$get(endPoints.get_category_details + '/' + id)
            return res
        } catch (error) {
            return error
        }
    },

    async editCategory({}, data) {
        //console.log(data)
        let res = await this.$axios.$post(endPoints.edit_category + '/' + data.id, data.fd)
        //console.log(res)
        return res
        //console.log(res)
    },
}