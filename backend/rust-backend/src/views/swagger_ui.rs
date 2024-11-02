use crate::models::api_schema::login::{LoginRequest, LoginResponse};
use crate::views::login;
use utoipa::OpenApi;
#[derive(OpenApi)]
#[openapi(
    paths(login::login_view),
    components(
        schemas(LoginRequest,LoginResponse)
    ),
    tags(
        (name= "Ahmed Karem Mousa",description="Ahmed Karem Mousa Backend In Rust Website")
    )
)]
pub struct ApiDoc;
