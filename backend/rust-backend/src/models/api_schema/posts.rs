use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Deserialize, ToSchema)]
pub struct AddPostRequest {
    pub title: String,
    pub content: String,
    pub summary: String,
    pub post_type: String,
    pub post_order: i32,
}
#[derive(Debug, Deserialize, ToSchema)]
pub struct ImageUpload {
    #[schema(content_media_type = "application/octet-stream")]
    pub image: Vec<u8>,
}
pub struct PostTypeEnum;
impl PostTypeEnum {
    pub const HISTORY: &str = "history";
    pub const PROJECT: &str = "project";
    pub const CERTIFICATE: &str = "certificate";
}

impl PostTypeEnum {
    pub fn is_valid_type(&self, post_type: &str) -> bool {
        matches!(
            post_type,
            PostTypeEnum::HISTORY | PostTypeEnum::CERTIFICATE | PostTypeEnum::PROJECT,
        )
    }
}
#[derive(Serialize, ToSchema)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub summary: String,
    pub post_type: String,
    pub img_url: Option<String>,
    pub post_order: i32,
}
#[derive(Serialize, ToSchema)]
pub struct AddPostResponse {
    pub data: Option<Post>,
    pub status: bool,
    pub error: Option<String>,
}

#[derive(Serialize, ToSchema)]
pub struct GetPostsResponse {
    pub data: Option<Vec<Post>>,
    pub status: bool,
    pub error: Option<String>,
}

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct PostParams {
    pub id: Option<i32>,
    pub post_type: Option<String>,
}
