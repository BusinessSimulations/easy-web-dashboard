mod config;

use config::{AppConfig, load_config};
use tauri::{WebviewUrl, WindowBuilder, LogicalPosition, LogicalSize};

#[tauri::command]
fn get_config() -> Result<AppConfig, String> {
    load_config()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_config])
        .setup(|app| {
            let win_builder =
                WindowBuilder::new(app, "main")
                .title("easy-web-dashboard")
                .fullscreen(true)
                .decorations(false)
                .resizable(false);

            let window = win_builder.build().unwrap();

            let size = window.inner_size()?;
            let scale_factor = window.scale_factor()?;
            let logical_size = size.to_logical(scale_factor);

            let controls_web_view = window.add_child(
                tauri::webview::WebviewBuilder::new("controls", WebviewUrl::App(Default::default())),
                LogicalPosition::new(0., 0.),
                LogicalSize::new(logical_size.width, 50.),
            )?;

            controls_web_view.set_bounds(tauri::Rect {
                position: LogicalPosition::new(0., 0.).into(),
                size: LogicalSize::new(logical_size.width, 50.).into(),
            }).unwrap();

            Ok({})
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
