use diesel::prelude::*;
use std::time::SystemTime;
#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::models::psql::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Users {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub email: String,
    pub last_login: Option<SystemTime>,
}
