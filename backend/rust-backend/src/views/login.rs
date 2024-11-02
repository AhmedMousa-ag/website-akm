use crate::controller::apis_logic::login::get_user;
use crate::models::api_schema::login::{LoginRequest, LoginResponse};
use crate::models::security::{JWTOperations, Password, PasswordsProtection, UserAuth};
use axum::{extract::Json, http::StatusCode, response};
use serde_json::{json, Value};

pub async fn login_view(Json(payload): Json<LoginRequest>) -> (StatusCode, response::Json<Value>) {
    let query_res = get_user(payload.username);
    if query_res.is_err() {
        return (
            StatusCode::NOT_FOUND,
            Json(json!(LoginResponse {
                status: false,
                token: None,
                error: Some("User Doesn't Exists".to_string())
            })),
        );
    }
    let db_user = query_res.unwrap();
    //---------------------
    let password_ver = Password {
        pass: db_user.password,
    };
    if !password_ver.is_same_password(payload.password) {
        return (
            StatusCode::UNAUTHORIZED,
            Json(json!(LoginResponse {
                status: false,
                token: None,
                error: Some("Invalide Username Or Password".to_string())
            })),
        );
    }
    let user = UserAuth {
        username: Some(db_user.username),
        user_id: Some(db_user.id),
    };
    let token = user.sign();
    let login_resul = LoginResponse {
        status: true,
        token: Some(token),
        error: None,
    };
    (StatusCode::OK, Json(json!(login_resul)))
}
