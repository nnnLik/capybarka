use tauri::command;
// use tauri_plugin_http::reqwest;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct UserDTO {
    id: usize,
    username: String,
    email: String,
    avatar_uri: String,
    created_at: String,
}

#[derive(Deserialize, Serialize)]
struct AuthResponse {
    access: String,
    u_id: usize,
    u_name: String,
    u_email: String,
}

#[derive(Deserialize, Serialize)]
struct UserServerResponse {
    id: usize,
    name: String,
    count_of_members: usize,
    count_of_online_members: usize,
}

#[derive(Deserialize, Serialize)]
struct GetUserServersResponse {
    result: Vec<UserServerResponse>,
    count_of_servers: usize,
}

#[derive(Deserialize, Serialize)]
struct UserServerDetailDTO {
    id: usize,
    name: String,
    admin_id: usize,
    members: Vec<UserDTO>,
    count_of_members: usize,
    count_of_online_members: usize,
}

#[command]
async fn login(email: String, password: String) -> AuthResponse {
    let response: AuthResponse = AuthResponse {
        access: String::from("1231231"),
        u_id: 123,
        u_email: String::from("porn@gmail.com"),
        u_name: String::from("qweqw"),
    };
    return response;
}

#[command]
async fn get_user_servers(uId: usize, accessToken: String) -> GetUserServersResponse {
    let mock_response: GetUserServersResponse = GetUserServersResponse {
        result: vec![
            UserServerResponse {
                id: 1,
                name: "Server 1".to_string(),
                count_of_members: 100,
                count_of_online_members: 50,
            },
            UserServerResponse {
                id: 2,
                name: "Server 2".to_string(),
                count_of_members: 200,
                count_of_online_members: 100,
            },
        ],
        count_of_servers: 2,
    };
    mock_response
}

#[command]
async fn get_server_info_by_id(id: usize) -> UserServerDetailDTO {
    let mock_response: UserServerDetailDTO = UserServerDetailDTO {
        id: 1,
        name: String::from("Server-1"),
        admin_id: 1,
        members: vec![UserDTO {
            id: 1,
            username: String::from("Lik"),
            email: String::from("poew@sadas.com"),
            avatar_uri: String::from("https://pornhub.com"),
            created_at: String::from("2024-01-01 12:12:12"),
        }],
        count_of_members: 1,
        count_of_online_members: 1,
    };
    mock_response
}

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
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            login,
            get_user_servers,
            get_server_info_by_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
