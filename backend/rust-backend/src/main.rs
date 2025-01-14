use axum::{
    extract::DefaultBodyLimit,
    routing::{get, patch, post},
    Router,
};
use http::Method;
use rust_backend::{
    configs::config,
    controller::utils::env_var::load_env_var,
    views::{posts::upload_post_image, swagger_ui::get_swagger_ui_router},
};
use rust_backend::{controller::db::startup::create_default_user, views::login::login_view};
use rust_backend::{
    controller::middlewares::auth,
    views::posts::{add_post, delete_post, get_posts, update_post},
};
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    load_env_var();
    let config = config::get_config();
    create_default_user();
    let cors = CorsLayer::new()
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::OPTIONS,
            Method::DELETE,
            Method::PATCH,
        ])
        .allow_headers(Any)
        .allow_origin(Any);
    let app = Router::new()
        .route("/posts", post(add_post))
        .route("/posts/upload_img/", post(upload_post_image))
        .route("/posts/", patch(update_post).delete(delete_post))
        .route_layer(auth::AuthLayer)
        .route("/posts/", get(get_posts))
        .route("/health", get(|| async { "Healthy!" }))
        .route("/login", post(login_view))
        .layer(DefaultBodyLimit::max(20 * 1024 * 1024))
        .route_layer(cors)
        .merge(get_swagger_ui_router());

    // run our app with hyper, listening globally on port 3000
    let host_port = format!("{}:{}", config.operation.host, config.operation.port);
    println!("Will run on: {}", host_port);
    let listener = tokio::net::TcpListener::bind(host_port).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
