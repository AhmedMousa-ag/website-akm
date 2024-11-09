use crate::models::api_schema::posts::{PostParams, PostTypeEnum};
use crate::models::psql::posts::{EditPost, Posts};
use crate::{
    controller::apis_logic::posts::{create_post, delete_db_post, get_posts_type, update_db_post},
    models::{
        api_schema::posts::{AddPostRequest, AddPostResponse, GetPostsResponse, Post},
        psql::posts::NewPost,
    },
};
use axum::extract::Query;
use axum::{extract::Json, http::StatusCode, response};
use serde_json::{json, Value};
use std::time::SystemTime;

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
        created_at: &SystemTime::now(),
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
                    post_type: post.post_type
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
            Json(json!(AddPostResponse {
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
            Json(json!(AddPostResponse {
                data: None,
                status: false,
                error: Some(format!("{:?}", "Post Type is invalid"))
            })),
        );
    }
    let result = get_posts_type(post_type.to_string());
    match result {
        Ok(posts) => {
            if posts.len() < 1 {
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
