use crate::{
    configs::config::get_config,
    models::security::{Password, PasswordsProtection},
};
use std::hash::{DefaultHasher, Hash, Hasher};
fn salted_idx(salted_text: String) -> (usize, usize) {
    let salt_len = salted_text.len();
    let first_idx = salt_len / 2;
    (first_idx, first_idx + 1)
}
impl Password {
    pub fn new(pass: String) -> Self {
        Self { pass }
    }
}

impl PasswordsProtection for Password {
    fn hash_salt_password(&self) -> String {
        let configs = get_config();
        let salted_text = configs.salting_text.as_str();
        let (first_idx, second_idx) = salted_idx(salted_text.to_string());
        let mut salted_pass = String::new();
        let first_part_salt: &str = &salted_text[..first_idx];
        let second_part_salt: &str = &salted_text[second_idx..salted_text.len()];
        salted_pass.push_str(first_part_salt);
        salted_pass.push_str(self.pass.as_str());
        salted_pass.push_str(second_part_salt);

        let mut hasher = DefaultHasher::new();
        salted_pass.hash(&mut hasher);
        hasher.finish().to_string()
    }
}
