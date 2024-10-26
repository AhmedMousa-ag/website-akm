use std::sync::LazyLock;
use crate::controller::utils::env_var;

pub struct Config {
    pub port: u16,
    pub host: String,
    pub jwt_pub_key: String,
    pub jwt_algo: String,
}

static CONFIGURATIONS: LazyLock<Config> = LazyLock::new(|| Config {
    port: env_var::load_port(),
    host: env_var::load_host(),
    jwt_pub_key: env_var::load_jwt_pub_key(),
    jwt_algo: env_var::load_jwt_algo(),
});

pub fn get_config<'a>() -> &'a LazyLock<Config> {
    &CONFIGURATIONS
}