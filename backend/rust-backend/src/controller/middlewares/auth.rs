use crate::controller::middlewares::val_user::validate_jwt_sub;
use axum::{
    extract::Request,
    response::{IntoResponse, Response},
};
use futures_util::future::BoxFuture;
use hyper::{Method, StatusCode};
use std::task::{Context, Poll};
use tower::{Layer, Service};
#[derive(Clone)]
pub struct AuthLayer;

impl<S> Layer<S> for AuthLayer {
    type Service = AuthMiddleware<S>;

    fn layer(&self, inner: S) -> Self::Service {
        AuthMiddleware { inner }
    }
}

#[derive(Clone)]
pub struct AuthMiddleware<S> {
    inner: S,
}

impl<S> Service<Request> for AuthMiddleware<S>
where
    S: Service<Request, Response = Response> + Send + 'static,
    S::Future: Send + 'static,
{
    type Response = S::Response;
    type Error = S::Error;
    // `BoxFuture` is a type alias for `Pin<Box<dyn Future + Send + 'a>>`
    type Future = BoxFuture<'static, Result<Self::Response, Self::Error>>;

    fn poll_ready(&mut self, cx: &mut Context<'_>) -> Poll<Result<(), Self::Error>> {
        self.inner.poll_ready(cx)
    }

    fn call(&mut self, request: Request) -> Self::Future {
        let is_valid = validate_jwt_sub(&request);

        if !is_valid {
            let mut status_code: StatusCode = StatusCode::UNAUTHORIZED;
            if request.method() == Method::OPTIONS {
                // For preflight cors by browsers
                status_code = StatusCode::OK;
            }
            let mut response = status_code.into_response();
            response
                .headers_mut() // For preflight cors by browsers
                .insert("Access-Control-Allow-Origin", "*".parse().unwrap());
            response.headers_mut().insert(
                "Access-Control-Allow-Methods",
                "POST, GET, OPTIONS, DELETE, PUT".parse().unwrap(),
            );
            response.headers_mut().insert(
                "Access-Control-Allow-Headers",
                "append,delete,entries,foreach,get,has,keys,set,values,Authorization,content-type,content-length,host,connection"
                    .parse()
                    .unwrap(),
            );
            return Box::pin(async { Ok(response) });
        }

        let future = self.inner.call(request);
        Box::pin(async move {
            let response: Response = future.await?;
            Ok(response)
        })
    }
}
