use crate::controller::utils::util;
use crate::models::security::UserAuth;
use crate::{configs::config::Config, models::security::JWTOperations};
use axum::extract::Request;
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use std::sync::LazyLock;
/*
Returns true if valide auth and the second boolean for the subscription
*/
pub fn validate_jwt_sub(req: &Request, configs: &LazyLock<Config>) -> bool {
    //-> Result<bool,ErrorKind> {
    let token = util::get_auth_header_token(&req);

    let user = UserAuth {
        user_id: None,
        username: None,
    };
    let (is_valid, _) = user.validate_token(token.to_string());

    is_valid
}
