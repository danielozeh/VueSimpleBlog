export default {
  
    data() {
        return {
            all_testimonies: [],
            all_testimonies_columns: ["full_name", "message", "status", "created_at", "action"],
            all_testimonies_table_options: {
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