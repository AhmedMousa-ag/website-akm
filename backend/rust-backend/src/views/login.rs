use crate::controller::apis_logic::login::get_user;
use crate::models::api_schema::login::{LoginRequest, LoginResponse};
use crate::models::security::{JWTOperations, Password, PasswordsProtection, UserAuth};
use axum::{extract::Json, http::StatusCode, response};
use serde_json::{json, Value};

#[utoipa::path(
    post,
    path = "/login",
    request_body=LoginRequest,
    responses(
        (status = 200, description = "Successfull Login", body = LoginResponse),
        (status = NOT_FOUND, description = "Invalide User")
    ),
)]
pub async fn login_view(Json(payload): Json<LoginRequest>) -> (StatusCode, response::Json<Value>) {
    let query_res = get_user(payload.username);
    if query_res.is_err() {
        return (
            StatusCode::NOT_FOUND,
            Json(json!(LoginResponse {
                status: false,
                token: None,
                error: Some(format!("{:?}", query_res.err()))
            })),
        );
    }
    let db_user = query_res.unwrap();
    //---------------------
    let password_ver = Password {
        pass: db_user.password,
    };
    if !password_ver.is_same_password(password_ver.hash_salt_password()) {
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
