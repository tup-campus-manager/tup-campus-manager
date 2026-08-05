#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      let app_handle = app.handle().clone();

      let _main_window = tauri::webview::WebviewWindowBuilder::new(
        app,
        "main",
        tauri::WebviewUrl::App("index.html".into()),
      )
      .title("Campus Manager")
      .inner_size(800.0, 600.0)
      .resizable(true)
      .additional_browser_args(
        "--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection,msEnhancedTrackingPreventionEnabled",
      )
      .on_new_window(move |url, features| {
        let label = format!(
          "popup-{}",
          std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .expect("time went backwards")
            .as_millis()
        );
        let builder = tauri::webview::WebviewWindowBuilder::new(
          &app_handle,
          label,
          tauri::WebviewUrl::External(url),
        )
        .window_features(features);
        match builder.build() {
          Ok(window) => tauri::webview::NewWindowResponse::Create { window },
          Err(error) => {
            eprintln!("error creating popup window: {error}");
            tauri::webview::NewWindowResponse::Allow
          }
        }
      })
      .build()?;

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
