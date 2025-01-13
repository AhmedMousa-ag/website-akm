use crate::models::api_schema::login::{LoginRequest, LoginResponse};
use crate::models::api_schema::posts::{AddPostRequest, AddPostResponse, GetPostsResponse};
use crate::views::login;
use crate::views::posts;
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;
#[derive(OpenApi)]
#[openapi(
    paths(login::login_view, posts::add_post, posts::get_posts, posts::delete_post, posts::update_post),
    components(
        schemas(LoginRequest,LoginResponse,AddPostRequest,AddPostResponse,GetPostsResponse)
    ),
    tags(
        (name= "Ahmed Karem Mousa",description="Ahmed Karem Mousa Backend In Rust Website")
    )
)]
struct ApiDoc;

pub fn get_swagger_ui_router() -> SwaggerUi {
    SwaggerUi::new("/docs").url("/api-doc/openapi.json", ApiDoc::openapi())
}
