// use axum::http::Error;
use hmac::{Hmac, Mac};
use jwt::{SignWithKey, VerifyWithKey};
use sha2::Sha256;

// use std::collections::BTreeMap;
use crate::configs::config::get_config;
use crate::models::user::{JWTOperations, UserAuth};

impl JWTOperations<UserAuth> for UserAuth {
    fn sign(&self) -> String {
        let config = get_config();
        let key: Hmac<Sha256> = Hmac::new_from_slice(config.jwt_pub_key.as_bytes())
            .expect("HMAC can take key of any size");
        let signed_claim: String = self
            .sign_with_key(&key)
            .expect("Couldn't sign with the key");

        signed_claim
    }
    fn validate_token(&self, token: String) -> (bool, Option<UserAuth>) {
        let config = get_config();
        let key: Hmac<Sha256> = Hmac::new_from_slice(config.jwt_pub_key.as_bytes())
            .expect("HMAC can take key of any size");
        let claims: Result<UserAuth, jwt::Error> = token.verify_with_key(&key);
        if claims.is_err() {
            return (false, None);
        }
        (true, Some(claims.unwrap()))
    }
}
