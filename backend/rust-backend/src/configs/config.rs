use crate::controller::utils::env_var;
use std::sync::LazyLock;

pub struct Config {
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
}

static CONFIGURATIONS: LazyLock<Config> = LazyLock::new(|| Config {
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
});

pub fn get_config<'a>() -> &'a LazyLock<Config> {
    &CONFIGURATIONS
}
