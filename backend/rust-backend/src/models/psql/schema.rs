// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        password -> Text,
        email -> Varchar,
        last_login -> Nullable<Timestamp>,
    }
}
