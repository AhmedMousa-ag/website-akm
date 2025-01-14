use crate::controller::utils::env_var;
use std::sync::LazyLock;
pub struct PostsConfig {
    pub img_base_path: String,
}
pub struct OperationsConfig {
    pub port: u16,
    pub host: String,
    pub jwt_pub_key: String,
    pub jwt_algo: String,
    pub psql_host: String,
    pub psql_port: String,
    pub psql_username: String,
    pub psql_password: String,
    pub psql_db_name: String,
    pub salting_text: String,
    pub default_username: String,
    pub default_password: String,
    pub default_email: String,
}
pub struct Config {
    pub operation: OperationsConfig,
    pub posts: PostsConfig,
}

static CONFIGURATIONS: LazyLock<Config> = LazyLock::new(|| Config {
    operation: OperationsConfig {
        port: env_var::load_port(),
        host: env_var::load_host(),
        jwt_pub_key: env_var::load_jwt_pub_key(),
        jwt_algo: env_var::load_jwt_algo(),
        psql_host: env_var::load_psql_host(),
        psql_port: env_var::load_psql_port(),
        psql_username: env_var::load_psql_username(),
        psql_password: env_var::load_psql_password(),
        psql_db_name: env_var::load_psql_db_name(),
        salting_text: env_var::load_salting_text(),
        default_username: env_var::load_default_username(),
        default_password: env_var::load_default_password(),
        default_email: env_var::load_default_email(),
    },
    posts: PostsConfig {
        img_base_path: "./images/posts/".into(),
    },
});

pub fn get_config<'a>() -> &'a LazyLock<Config> {
    &CONFIGURATIONS
}
