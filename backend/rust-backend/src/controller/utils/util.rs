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
