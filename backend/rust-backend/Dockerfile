FROM rust AS build

WORKDIR /usr/src/akm_rust


COPY . .
RUN cargo install diesel_cli --no-default-features --features postgres

RUN cargo clean
RUN cargo install --path . --target-dir .


FROM alpine
RUN addgroup -S akm_rust_group && adduser -S akm_rust_user -G akm_rust_group

WORKDIR /home/app/
COPY --from=build /usr/src/akm_rust/release/rust-backend .
COPY .env .
RUN chown -R akm_rust_user:akm_rust_group .
RUN chmod 600 .env

USER akm_rust_user
EXPOSE 8000
# ENTRYPOINT [ "sleep 5000" ]
CMD ["/home/app/rust-backend","&","rm .env"]
