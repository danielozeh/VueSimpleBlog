export default {
  
    data() {
        return {
            //page_title: "Dashboard",
            all_categories: [],
            all_categories_columns: ["thumbnail", "title", "status", "created_date", "view_options", "action"],
            all_categories_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },
            all_blogs: [],
            all_blogs_columns: ["featured_image", "title", "author", "status", "created_at", "action"],
            all_blogs_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },

            blog_details_columns: ["id", "full_name", "comment", "status", "created_at", "action"],
            blog_details_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },

            blog_likes_columns: ["id", "full_name", "created_at"],
            blog_likes_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },
            image_path: '',
        }
    },
}