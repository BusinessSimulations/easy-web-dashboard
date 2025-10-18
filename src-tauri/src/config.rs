use serde::{Deserialize, Serialize};
use std::{fs};
use std::path::Path;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SiteConfig {
    pub url: String,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DashboardConfig {
    #[serde(default = "default_controls_enabled")]
    pub controls_enabled: bool,
    #[serde(default = "default_rotation_seconds")]
    pub rotation_seconds: i32,
    #[serde(default = "default_rotation_enabled")]
    pub rotation_enabled: bool,
    #[serde(default = "default_rotation_on_by_default")]
    pub rotation_on_by_default: bool,
    #[serde(default = "default_primary_color")]
    pub primary_color: String,
    #[serde(default = "default_primary_contrast_color")]
    pub primary_contrast_color: String,
    #[serde(default = "default_text_color")]
    pub text_color: String,
    #[serde(default = "default_background_color")]
    pub background_color: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AppConfig {
    pub sites: Vec<SiteConfig>,
    #[serde(default = "default_dashboard_config")]
    pub dashboard: DashboardConfig,
}

// Default values functions
fn default_controls_enabled() -> bool { true }
fn default_rotation_seconds() -> i32 { 30 }
fn default_rotation_enabled() -> bool { true }
fn default_rotation_on_by_default() -> bool { true }
fn default_primary_color() -> String { String::from("#1976d2") }
fn default_primary_contrast_color() -> String { String::from("#ffffff") }
fn default_text_color() -> String { String::from("#000000") }
fn default_background_color() -> String { String::from("#f5f5f5") }

fn default_dashboard_config() -> DashboardConfig {
    DashboardConfig {
        controls_enabled: default_controls_enabled(),
        rotation_seconds: default_rotation_seconds(),
        rotation_enabled: default_rotation_enabled(),
        rotation_on_by_default: default_rotation_on_by_default(),
        primary_color: default_primary_color(),
        primary_contrast_color: default_primary_contrast_color(),
        text_color: default_text_color(),
        background_color: default_background_color(),
    }
}

pub fn load_config() -> Result<AppConfig, String> {
    // Try to load from working directory first
    let config_path = Path::new("config.json");

    if config_path.exists() {
        match fs::read_to_string(config_path) {
            Ok(content) => {
                match serde_json::from_str(&content) {
                    Ok(config) => Ok(config),
                    Err(e) => Err(format!("Failed to parse config.json: {}", e)),
                }
            },
            Err(e) => Err(format!("Failed to read config.json: {}", e)),
        }
    } else {
        // Return a default config with a few example sites
        Ok(AppConfig {
            sites: vec![
                SiteConfig {
                    url: "https://v2.tauri.app/".to_string(),
                    name: "Tauri".to_string(),
                },
                SiteConfig {
                    url: "https://businesssimulations.com/".to_string(),
                    name: "Business Simulations".to_string(),
                },
            ],
            dashboard: default_dashboard_config(),
        })
    }
}
