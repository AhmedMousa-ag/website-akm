use crate::{configs::config::get_config, models::api_schema::posts::PostParams};
use std::fs;

pub fn get_auth_header_token<'a>(req: &hyper::Request<axum::body::Body>) -> &str {
    let header = req.headers().get("Authorization");
    if header.is_none() {
        return &"";
    };
    let auth_token = header.unwrap().to_str().unwrap().split(" ");

    let token_vec = auth_token.collect::<Vec<_>>();
    if token_vec.len() <= 1 {
        return &"";
    }
    return token_vec[1];
}

pub fn construct_post_img_path(params: PostParams) -> String {
    let directory = format!(
        "{}{}/{}/",
        get_config().posts.img_base_path,
        params.post_type.unwrap(),
        params.id.unwrap()
    );
    match fs::create_dir_all(directory.clone()) {
        // Ok(_) => "".to_string(),
        Err(e) => println!("Error creating directory: {:?}", e),
        _ => (),
    };
    directory
}
