// use std::fmt::Error;

use diesel::prelude::*;
use diesel::query_dsl::methods::FindDsl;
use diesel::RunQueryDsl;

use crate::{
    controller::db::connection::psql_connection,
    models::psql::{
        posts::{EditPost, NewPost, Posts},
        schema::posts,
    },
};

pub fn create_post(new_post: NewPost) -> Result<Posts, diesel::result::Error> {
    let conn = &mut psql_connection();
    diesel::insert_into(posts::table)
        .values(&new_post)
        .returning(Posts::as_returning())
        .get_result(conn)
}

/*Get posts based on type*/
pub fn get_posts_type(post_type: String) -> Result<Vec<Posts>, diesel::result::Error> {
    let conn = &mut psql_connection();
    let posts: Result<Vec<Posts>, diesel::result::Error> = posts::table
        .select(posts::all_columns)
        .filter(posts::post_type.eq(post_type))
        .load(conn);
    posts
}

pub fn update_db_post(id: i32, new_data: EditPost) -> Result<Posts, diesel::result::Error> {
    let conn = &mut psql_connection();
    let post: Result<Posts, diesel::result::Error> =
        diesel::update(posts::table.filter(posts::id.eq(id)))
            .set(&new_data)
            .get_result(conn);
    post
}

pub fn delete_db_post(id: i32) -> Result<usize, diesel::result::Error> {
    let conn = &mut psql_connection();
    let deleted_post: Result<usize, diesel::result::Error> =
        diesel::delete(posts::table.filter(posts::id.eq(id))).execute(conn);
    deleted_post
}
