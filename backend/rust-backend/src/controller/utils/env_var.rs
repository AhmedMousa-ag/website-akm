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