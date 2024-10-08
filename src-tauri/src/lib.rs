use tauri::command;
// use tauri_plugin_http::reqwest;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct AuthResponse {
    access: String,
    u_id: usize,
    u_name: String,
    u_email: String,
}

#[command]
async fn login(email: String, password: String) -> AuthResponse {
    let auth_response = AuthResponse {
        access: String::from("1231231"),
        u_id: 123,
        u_email: String::from("porn@gmail.com"),
        u_name: String::from("qweqw"),
    };
    return auth_response;

// #[command]
// async fn login(email: String, password: String) -> Result<AuthResponse, String> {
    // let client: reqwest::Client = reqwest::Client::new();
    // let res: Result<reqwest::Response, reqwest::Error> = client.post("https://example.com/api/login")
    //     .json(&serde_json::json!({
    //         "email": email,
    //         "password": password
    //     }))
    //     .send()
    //     .await;

    // match res {
    //     Ok(response) => {
    //         if response.status().is_success() {
    //             let auth_response: AuthResponse = response.json().await.unwrap();
    //             let auth_response = AuthResponse {
    //                 access: String::from("1231231"),
    //                 u_id: 123,
    //                 u_email: String::from("porn@gmail.com"),
    //                 u_name: String::from("qweqw"),
    //             };
    //             Ok(auth_response)
    //         } else {
    //             let error_message: String = response.text().await.unwrap();
    //             Err(error_message)
    //         }
    //     }
    //     Err(e) => Err(format!("Failed to connect: {}", e)),
    // }
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
