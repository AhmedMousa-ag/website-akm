use crate::controller::apis_logic::posts::update_post_img_url;
use crate::controller::utils::util::construct_post_img_path;
use crate::models::api_schema::posts::{ImageUpload, PostParams, PostTypeEnum};
use crate::models::psql::posts::{EditPost, Posts};
use crate::{
    controller::apis_logic::posts::{create_post, delete_db_post, get_posts_type, update_db_post},
    models::{
        api_schema::posts::{AddPostRequest, AddPostResponse, GetPostsResponse, Post},
        psql::posts::NewPost,
    },
};
use axum::extract::Query;
use axum::Router;
use axum::{extract::Json, extract::Multipart, http::StatusCode, response};
// use futures_util::stream::StreamExt;
use serde_json::{json, Value};
use std::fs::File;
use std::io::Write; // bring trait into scope
use std::time::SystemTime;
use tower_http::services::ServeDir;

#[utoipa::path(
    post,
    path = "/posts/upload_img/{post_type}/{id}",
    params(("post_type" = String, Query, description = "Post Type"),("id"=String,Query,description="Post Id")),
    request_body(content_type = "multipart/form-data", content = inline(ImageUpload), description = "Images to upload"),
    responses(
        (status = 200, description = "Successfull uploaded image", body = AddPostResponse),
        // (status = NOT_FOUND, description = "Invalide Post")
    ),
)]
pub async fn upload_post_image(
    Query(params): Query<PostParams>,
    mut image: Multipart,
) -> (StatusCode, response::Json<Value>) {
    let file_path = construct_post_img_path(&params);
    let mut response = (
        StatusCode::OK,
        Json(json!(AddPostResponse {
            data: None,
            status: true,
            error: None
        })),
    );
    let mut complete_file_path = String::new();
    while let Some(field) = image.next_field().await.unwrap() {
        // let name = field.name().unwrap().to_string();
        let file_name = field.file_name().unwrap().to_string();
        let data_bytes = field.bytes().await.unwrap();
        complete_file_path = format!("{:}{:}", file_path, file_name);
        let mut image_file = File::create(complete_file_path.clone()).unwrap();
        response = match image_file.write_all(&data_bytes) {
            Ok(_) => (
                StatusCode::OK,
                Json(json!({"image_url":complete_file_path})),
            ),
            Err(e) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!(AddPostResponse {
                    data: None,
                    status: false,
                    error: Some(format!(
                        "{:?}{:?}",
                        "Error writting image into database: ", e
                    ))
                })),
            ),
        };
    }
    let db_res = update_post_img_url(params.id.unwrap(), &complete_file_path);
    if db_res.is_err() {
        return (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!(AddPostResponse {
                data: None,
                status: false,
                error: Some(format!(
                    "{:?}{:?}",
                    "Error writting image into database: ",
                    db_res.err()
                ))
            })),
        );
    }
    response
}

pub fn serve_images() -> Router {
    // serve the file in the "assets" directory under `/assets`
    Router::new().nest_service("/images", ServeDir::new("images/"))
}
// response.body_mut().into_data_stream();

// response
#[utoipa::path(
    post,
    path = "/posts",
    request_body=AddPostRequest,
    responses(
        (status = 200, description = "Successfull added post", body = AddPostResponse),
        // (status = NOT_FOUND, description = "Invalide Post")
    ),
)]
pub async fn add_post(Json(payload): Json<AddPostRequest>) -> (StatusCode, response::Json<Value>) {
    if !PostTypeEnum.is_valid_type(&payload.post_type) {
        return (
            StatusCode::NOT_ACCEPTABLE,
            Json(json!(AddPostResponse {
                data: None,
                status: false,
                error: Some(format!("{:?}", "Post Type is invalid"))
            })),
        );
    }

    let created_post: Result<Posts, diesel::result::Error> = create_post(NewPost {
        title: &payload.title,
        content: &payload.content,
        summary: &payload.summary,
        post_type: &payload.post_type,
        post_order: &payload.post_order,
        created_at: &SystemTime::now(),
        img_url: None,
    });
    match created_post {
        Ok(post) => (
            StatusCode::OK,
            Json(json!(AddPostResponse {
                data: Some(Post {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    summary: post.summary,
                    post_type: post.post_type,
                    post_order: post.post_order,
                    img_url: None,
                }),
                status: true,
                error: None
            })),
        ),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!(AddPostResponse {
                data: None,
                status: false,
                error: Some(format!("{:?}", e))
            })),
        ),
    }
}

#[utoipa::path(
    get,
    path = "/posts/{post_type}",
    params(("post_type" = String, Query, description = "Post Type")),
    responses(
        (status = 200, description = "Successfull got all posts", body = GetPostsResponse),
        // (status = NOT_FOUND, description = "Invalide Post")
    ),
)]

pub async fn get_posts(Query(params): Query<PostParams>) -> (StatusCode, response::Json<Value>) {
    let unwraped_post = params.post_type;
    if unwraped_post.is_none() {
        return (
            StatusCode::NOT_ACCEPTABLE,
            Json(json!(GetPostsResponse {
                data: None,
                status: false,
                error: Some(format!("{:?}", "Post Type is requierd"))
            })),
        );
    }
    let post_type = unwraped_post.unwrap();
    if !PostTypeEnum.is_valid_type(post_type.as_str()) {
        return (
            StatusCode::NOT_ACCEPTABLE,
            Json(json!(GetPostsResponse {
                data: None,
                status: false,
                error: Some(format!("{:?}", "Post Type is invalid"))
            })),
        );
    }
    let result = get_posts_type(post_type.to_string());
    match result {
        Ok(posts) => {
            if posts.is_empty() {
                return (
                    StatusCode::NOT_FOUND,
                    Json(json!(GetPostsResponse {
                        data: None,
                        status: false,
                        error: Some(format!("{:?}", "No Posts Found")),
                    })),
                );
            };
            (StatusCode::OK, Json(json!(posts)))
        }
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!(GetPostsResponse {
                data: None,
                status: true,
                error: Some(format!("{:?}", e)),
            })),
        ),
    }
}

#[utoipa::path(
    patch,
    path = "/posts/{id}",
    request_body=AddPostRequest,
    params(("id" = i32, Path, description = "Post Id")),
    responses(
        (status = 200, description = "Successfull Updated post", body = AddPostResponse),
        // (status = NOT_FOUND, description = "Invalide Post")
    ),
)]
pub async fn update_post(
    Query(params): Query<PostParams>,
    Json(payload): Json<EditPost>,
) -> (StatusCode, response::Json<Value>) {
    let unwraped_post = params.id;
    if unwraped_post.is_none() {
        return (
            StatusCode::NOT_ACCEPTABLE,
            Json(json!(AddPostResponse {
                data: None,
                status: false,
                error: Some(format!("{:?}", "Post Id is required"))
            })),
        );
    }
    let id = unwraped_post.unwrap();
    let result = update_db_post(id, payload);
    match result {
        Ok(post) => (StatusCode::OK, Json(json!(post))),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!(GetPostsResponse {
                data: None,
                status: true,
                error: Some(format!("{:?}", e)),
            })),
        ),
    }
}

#[utoipa::path(
    delete,
    path = "/posts/{id}",
    request_body=AddPostRequest,
    params(("id" = i32, Path, description = "Post Id")),
    responses(
        (status = 200, description = "Successfull Deleted post", body = AddPostResponse),
        // (status = NOT_FOUND, description = "Invalide Post")
    ),
)]
pub async fn delete_post(Query(params): Query<PostParams>) -> (StatusCode, response::Json<Value>) {
    let unwraped_post = params.id;
    if unwraped_post.is_none() {
        return (
            StatusCode::NOT_ACCEPTABLE,
            Json(json!(AddPostResponse {
                data: None,
                status: false,
                error: Some(format!("{:?}", "Post Id is required"))
            })),
        );
    }
    let id = unwraped_post.unwrap();
    let result = delete_db_post(id);
    match result {
        Ok(posts) => (StatusCode::NO_CONTENT, Json(json!(posts))),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!(GetPostsResponse {
                data: None,
                status: true,
                error: Some(format!("{:?}", e)),
            })),
        ),
    }
}
