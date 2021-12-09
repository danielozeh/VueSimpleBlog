export const state = () => ({
    page_title: "",
})


export const mutations = {

    SET_PAGE_TITLE: (state, page_title) => {
        state.page_title = page_title
    },
}