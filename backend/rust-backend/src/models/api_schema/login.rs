use serde::{Deserialize, Serialize};
#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    pub status: bool,
    pub token: Option<String>,
    pub error: Option<String>,
}
