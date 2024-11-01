use dotenv::dotenv;
use std::env;
/*
Loads Environment Variables into the systems, doesn't return any value
*/
pub fn load_env_var() {
    dotenv().ok();
}
pub fn load_port() -> u16 {
    let port: u16 = env::var("PORT")
        .expect("Running Port Must Be Set.")
        .parse()
        .unwrap();
    port
}
pub fn load_host() -> String {
    let host: String = env::var("HOST").expect("Running Port Must Be Set.");
    host
}
pub fn load_jwt_pub_key() -> String {
    let jwt_pub_key: String = env::var("JWT_KEY").expect("Running Port Must Be Set.");
    jwt_pub_key
}

pub fn load_jwt_algo() -> String {
    let jwt_algo: String = env::var("JWT_ALGORITHM").expect("Running Port Must Be Set.");
    jwt_algo
}

pub fn load_psql_host() -> String {
    env::var("PSQL_HOST").expect("PSQL Host Must be set")
}
pub fn load_psql_port() -> String {
    env::var("PSQL_PORT").expect("PSQL Port Must Be Set.")
}
pub fn load_psql_username() -> String {
    env::var("POSTGRES_USER").expect("PSQL Username Must Be Set.")
}
pub fn load_psql_password() -> String {
    env::var("POSTGRES_PASSWORD").expect("PSQL Password Must Be Set.")
}

pub fn load_psql_db_name() -> String {
    env::var("POSTGRES_DB").expect("PSQL DB Name Must Be Set.")
}

pub fn load_salting_text() -> String {
    env::var("SALTING_TEXT").expect("Salting Text Must Be Set.")
}

pub fn load_default_password() -> String {
    env::var("DEFAULT_PASSWORD").expect("Deafult Password Must Be Set")
}
pub fn load_default_username() -> String {
    env::var("DEFAULT_USERNAME").expect("Deafult Username Must Be Set")
}
pub fn load_default_email() -> String {
    env::var("DEFAULT_EMAIL").expect("Deafult Email Must Be Set")
}
