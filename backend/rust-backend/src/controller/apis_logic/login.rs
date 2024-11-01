// use std::fmt::Error;

use diesel::{
    query_dsl::methods::{FilterDsl, SelectDsl},
    ExpressionMethods, RunQueryDsl,
};

use crate::{
    controller::db::connection::psql_connection,
    models::psql::{schema::users, users::Users},
};

pub fn get_user(username: String) -> Result<Users, diesel::result::Error> {
    let conn = &mut psql_connection();
    let user: Result<Users, diesel::result::Error> = users::table
        .select(users::all_columns)
        .filter(users::username.eq(username))
        .first(conn);
    user
}
