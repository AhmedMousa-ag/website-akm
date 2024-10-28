use axum::response::Json;
use serde_json::{json, Value};

use crate::models::security::{JWTOperations, UserAuth};

pub async fn login_view() -> Json<Value> {
    //TODO

    // Database Integeration

    //---------------------
    let user = UserAuth {
        username: None,
        user_id: None,
    };
    let sign = user.sign();
    println!("Token: {}", sign);
    // let (is_valid,user) = user.validate_token(sign);
    // println!("Validated token: {:?}",user);
    Json(json!({ "tokn": 42 }))
}
