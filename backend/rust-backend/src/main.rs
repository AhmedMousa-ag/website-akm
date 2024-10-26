use axum::{
    routing::get,
    Router,
};
use rust_backend::{configs::config, controller::utils::env_var::load_env_var};

#[tokio::main]
async fn main() {
    load_env_var();
    let config = config::get_config();
    let app = Router::new().route("/health", get(|| async { "Hello, World!" }));

    // run our app with hyper, listening globally on port 3000
    let host_port = format!("{}:{}",config.host,config.port);
    println!("Will run on: {}",host_port);
    let listener = tokio::net::TcpListener::bind(host_port).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
