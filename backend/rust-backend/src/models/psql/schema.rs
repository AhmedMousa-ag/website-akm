// @generated automatically by Diesel CLI.

diesel::table! {
    course (id) {
        id -> Int8,
        #[max_length = 255]
        name -> Nullable<Varchar>,
        #[max_length = 255]
        title -> Nullable<Varchar>,
        instructor_id -> Nullable<Int8>,
        course_id -> Nullable<Int8>,
    }
}

diesel::table! {
    employee (id) {
        id -> Int4,
        #[max_length = 255]
        email -> Nullable<Varchar>,
        #[max_length = 255]
        first_name -> Nullable<Varchar>,
        #[max_length = 255]
        last_name -> Nullable<Varchar>,
    }
}

diesel::table! {
    instructor (id) {
        id -> Int8,
        #[max_length = 255]
        email_name -> Nullable<Varchar>,
        #[max_length = 255]
        first_name -> Nullable<Varchar>,
        #[max_length = 255]
        last_name -> Nullable<Varchar>,
        instructor_detail_id -> Nullable<Int8>,
    }
}

diesel::table! {
    instructor_detail (id) {
        id -> Int8,
        #[max_length = 255]
        hobby -> Nullable<Varchar>,
        #[max_length = 255]
        youtube_channel -> Nullable<Varchar>,
    }
}

diesel::table! {
    instructordetail (id) {
        id -> Int8,
    }
}

diesel::table! {
    posts (id) {
        id -> Int4,
        title -> Text,
        content -> Text,
        summary -> Text,
        post_type -> Text,
        created_at -> Nullable<Timestamp>,
        edited_at -> Nullable<Timestamp>,
        #[max_length = 6000]
        img_url -> Nullable<Varchar>,
    }
}

diesel::table! {
    student (id) {
        id -> Int4,
        #[max_length = 255]
        email -> Nullable<Varchar>,
        #[max_length = 255]
        first_name -> Nullable<Varchar>,
        #[max_length = 255]
        last_name -> Nullable<Varchar>,
        #[max_length = 255]
        new_column -> Nullable<Varchar>,
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

diesel::joinable!(instructor -> instructor_detail (instructor_detail_id));

diesel::allow_tables_to_appear_in_same_query!(
    course,
    employee,
    instructor,
    instructor_detail,
    instructordetail,
    posts,
    student,
    users,
);
