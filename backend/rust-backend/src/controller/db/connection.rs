use crate::configs::config::get_config;
use diesel::prelude::*;

pub fn psql_connection() -> PgConnection {
    println!("Will get config");
    let config = get_config();
    //postgres://username:password@localhost/diesel_demo
    println!("Got config");
    let database_url = format!(
        "postgres://{}:{}@{}/{}",
        config.psql_username, config.psql_password, config.psql_host, config.psql_db_name
    );
    println!("database url {}", database_url);
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}
