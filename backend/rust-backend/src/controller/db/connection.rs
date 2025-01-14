use crate::configs::config::get_config;
use diesel::prelude::*;

pub fn psql_connection() -> PgConnection {
    let config = get_config();
    let database_url = format!(
        "postgres://{}:{}@{}/{}",
        config.operation.psql_username,
        config.operation.psql_password,
        config.operation.psql_host,
        config.operation.psql_db_name
    );
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}
