use serde::{Deserialize, Serialize};
use jsonwebtoken:: Algorithm;

use crate::configs:: config::get_config;

#[derive(Debug, Serialize, Deserialize)]
pub struct UserAuth {
    // token_type: String,
    pub user_id: Option<i32>,
    pub username: Option<String>,
}

pub trait JWTOperations<T> {
    fn sign(&self) -> String;
    fn validate_token(&self, token: String) -> (bool, Option<T>);
    fn get_algo(&self)-> Algorithm{
        let configs = get_config();
        let algo: Algorithm = match configs.jwt_algo.as_str() {
            "HS256" => Algorithm::HS256,
            "ES256" => Algorithm::ES256,
            "HS384" => Algorithm::HS384,
            "RS256" => Algorithm::RS256,
            _ => Algorithm::HS256,
        };
        return algo
    }
}
