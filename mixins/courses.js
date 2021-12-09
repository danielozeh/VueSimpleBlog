export default {
  
    data() {
        return {
            //page_title: "Dashboard",
            all_courses: [],
            all_courses_columns: ["title", "chapters", "days", "created_at", "view_options", "action"],
            my_courses_columns: ["title", "chapters", "days", "view_options"],
            all_courses_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },

            all_contents: [],
            all_contents_columns: ["photo", "title", "type", "url", "duration", "created_at", "action"],
            all_contents_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },

            all_payments: [],
            all_payments_columns: ["id", "full_name", "amount", "date_paid"],
            all_payments_table_options: {
                perPage: 10,
                skin: "table table-striped table-bordered table-hover",
                pagination: {
                    show: true,
                },
                perPageValues: [10, 25, 50, 100],
                preserveState: true,
                headings: {}
            },
        }
    },
}