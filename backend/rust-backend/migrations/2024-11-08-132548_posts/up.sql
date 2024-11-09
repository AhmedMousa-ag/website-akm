-- Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT NOT NULL,
    post_type TEXT NOT NULL,
    created_at TIMESTAMP,
    edited_at TIMESTAMP
);