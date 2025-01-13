use crate::models::psql::schema::posts;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use std::time::SystemTime;

#[derive(Debug, Queryable, Selectable, Serialize)]
#[diesel(table_name = posts)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Posts {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub summary: String,
    pub post_type: String,
    pub created_at: Option<SystemTime>,
    pub edited_at: Option<SystemTime>,
}

#[derive(Debug, Insertable, Serialize)]
#[diesel(table_name = posts)]
pub struct NewPost<'a> {
    pub title: &'a str,
    pub content: &'a str,
    pub summary: &'a str,
    pub post_type: &'a str,
    pub created_at: &'a SystemTime,
}

#[derive(Debug, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = posts)]
pub struct EditPost {
    pub title: Option<String>,
    pub content: Option<String>,
    pub summary: Option<String>,
    pub post_type: Option<String>,
    pub created_at: Option<SystemTime>,
    pub edited_at: Option<SystemTime>,
}
