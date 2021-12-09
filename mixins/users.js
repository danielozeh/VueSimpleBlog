export default {
  
      data() {
          return {
              //page_title: "Dashboard",
              all_users: [],
              all_users_columns: ["full_name", "email", "is_active", "is_verified", "created_date", "action"],
              all_users_table_options: {
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