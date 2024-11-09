// @generated automatically by Diesel CLI.

diesel::table! {
    posts (id) {
        id -> Int4,
        title -> Text,
        content -> Text,
        summary -> Text,
        post_type -> Text,
        created_at -> Nullable<Timestamp>,
        edited_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        password -> Text,
        email -> Varchar,
        last_login -> Nullable<Timestamp>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(posts, users,);
