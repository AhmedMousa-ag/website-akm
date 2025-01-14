use jsonwebtoken::Algorithm;
use serde::{Deserialize, Serialize};

use crate::configs::config::get_config;

#[derive(Debug, Serialize, Deserialize)]
pub struct UserAuth {
    // token_type: String,
    pub user_id: Option<i32>,
    pub username: Option<String>,
}

pub trait JWTOperations<T> {
    fn sign(&self) -> String;
    fn validate_token(&self, token: String) -> (bool, Option<T>);
    fn get_algo(&self) -> Algorithm {
        let configs = get_config();
        let algo: Algorithm = match configs.operation.jwt_algo.as_str() {
            "HS256" => Algorithm::HS256,
            "ES256" => Algorithm::ES256,
            "HS384" => Algorithm::HS384,
            "RS256" => Algorithm::RS256,
            _ => Algorithm::HS256,
        };
        return algo;
    }
}

pub struct Password {
    pub pass: String,
    // pub hasher: DefaultHasher,
}

pub trait PasswordsProtection {
    fn hash_salt_password(&self) -> String;
    fn is_same_password(&self, db_hashed_pass: String) -> bool {
        let hashed_pass = self.hash_salt_password();
        if hashed_pass == db_hashed_pass {
            return true;
        }
        false
    }
}
