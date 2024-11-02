use super::connection::psql_connection;
use crate::{
    configs::config::get_config,
    models::{
        psql::{schema::*, users::NewUser},
        security::{Password, PasswordsProtection},
    },
};
use diesel::prelude::*;

pub fn create_default_user() {
    println!("Will call psql connection");
    let conn: &mut PgConnection = &mut psql_connection();
    let all_users = users::table
        .select(users::username)
        .limit(1)
        .load::<String>(conn);

    let is_user_in_sys = match all_users {
        Ok(users) => {
            if users.len() < 1 {
                false
            } else {
                true
            }
        }
        Err(e) => panic!("{:?}", e),
    };
    if !is_user_in_sys {
        println!("No users found, will create new ones...");
        let config = get_config();
        let hashed_password = Password {
            pass: config.default_password.clone(),
        };
        let hashed_pass = hashed_password.hash_salt_password();
        let new_user = NewUser {
            username: &config.default_username,
            password: &hashed_pass,
            email: &config.default_email,
        };
        let insertion_res = diesel::insert_into(users::table)
            .values(&new_user)
            .execute(conn);
        if insertion_res.is_err() {
            panic!("Error inserting default user into the system, you need at least one user in the system");
        }
    } else {
        println!("There're users already in the system...")
    }
}
