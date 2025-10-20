import { getCurrentWindow } from "@tauri-apps/api/window";
import { Webview, } from "@tauri-apps/api/webview";
import { invoke } from "@tauri-apps/api/core";

const CONTROLS_HEIGHT = 50;

// Config type definitions
interface SiteConfig {
    url: string;
    name: string;
}

interface DashboardConfig {
    controls_enabled: boolean;
    rotation_seconds: number;
    rotation_enabled: boolean;
    rotation_on_by_default: boolean;
    primary_color: string;
    primary_contrast_color: string;
    text_color: string;
    background_color: string;
}

interface AppConfig {
    sites: SiteConfig[];
    dashboard: DashboardConfig;
}

// This code runs in the context of the main window
document.addEventListener("DOMContentLoaded", async () => {
    // Get the configuration
    let config: AppConfig;
    try {
        config = await invoke('get_config');
        console.log('Loaded configuration:', config);
    } catch (err) {
        console.error('Error loading configuration:', err);
        // Fallback config if loading fails
        config = {
            sites: [
                { url: 'https://v2.tauri.app/', name: 'Tauri' },
                { url: 'https://businesssimulations.com/', name: 'Business Simulations' }
            ],
            dashboard: {
                controls_enabled: true,
                rotation_seconds: 30,
                rotation_enabled: true,
                rotation_on_by_default: true,
                primary_color: '#1976d2',
                primary_contrast_color: '#ffffff',
                text_color: '#000000',
                background_color: '#f5f5f5',
            }
        };
    }

    // Apply theme from config
    applyTheme(config.dashboard);

    const appWindow = getCurrentWindow();

    const size = await appWindow.innerSize();
    const scale = await appWindow.scaleFactor();

    // Convert physical pixels to logical pixels
    const logicalWidth = size.width / scale;
    const logicalHeight = size.height / scale;

    // Get URLs from config
    const urls = config.sites.map(site => site.url);
    const urlLabels = config.sites.map(site => site.name);

    let currentUrlIndex = 0;
    let webview: Webview | null = null;
    let rotationInterval: number | null = null;
    let isAutoRotateEnabled = config.dashboard.rotation_on_by_default;

    // Function to create a new webview with the current URL
    const createWebview = async (urlIndex: number = currentUrlIndex) => {
        try {
            currentUrlIndex = urlIndex; // Update the current index

            // If a previous webview exists, destroy it
            if (webview) {
                await webview.close();
            }

            // Create a new webview within the current window
            webview = new Webview(appWindow, 'webview', {
                url: urls[currentUrlIndex],

                x: 0,
                y: CONTROLS_HEIGHT,
                width: logicalWidth,
                height: config.dashboard.controls_enabled ? logicalHeight - CONTROLS_HEIGHT : logicalHeight,
            });

            webview.once('tauri://created', function () {
                console.log(`Webview successfully created with URL: ${urls[currentUrlIndex]}`);
            });

            webview.once('tauri://error', function (e) {
                console.error('an error happened creating the webview', e);
            });
        } catch (err) {
            console.error('Error creating webview:', err);
            return null;
        }
    };

    // Function to start the rotation interval
    const startRotation = () => {
        if (rotationInterval || !config.dashboard.rotation_enabled) return; // Don't start if already running or disabled

        rotationInterval = window.setInterval(async () => {
            // Update to the next URL
            const nextIndex = (currentUrlIndex + 1) % urls.length;

            // Create a new webview with the next URL
            await createWebview(nextIndex);
        }, config.dashboard.rotation_seconds * 1000); // Convert seconds to milliseconds

        console.log("Auto rotation started");
    };

    // Function to stop the rotation interval
    const stopRotation = () => {
        if (rotationInterval) {
            window.clearInterval(rotationInterval);
            rotationInterval = null;
            console.log("Auto rotation stopped");
        }
    };

    // Function to apply theme from configuration
    function applyTheme(dashboardConfig: DashboardConfig) {
        const style = document.createElement('style');
        style.textContent = `
    nav {
      background-color: ${dashboardConfig.background_color};
      color: ${dashboardConfig.text_color};
      display: ${dashboardConfig.controls_enabled ? 'flex' : 'none'};
    }
    nav button {
      background-color: ${dashboardConfig.primary_color};
      color: ${dashboardConfig.primary_contrast_color};
    }

    .auto-rotate label {
      color: ${dashboardConfig.text_color};
    }

    .toggle-icon {
      color: ${dashboardConfig.primary_color};
    }

    .hidden-checkbox:checked + .toggle-icon {
      color: ${dashboardConfig.primary_color};
    }

    .hidden-checkbox:not(:checked) + .toggle-icon {
      color: ${dashboardConfig.primary_color};
    }
  `;
        document.head.appendChild(style);
    }

    if (config.dashboard.controls_enabled) {
        // Set up the auto-rotate toggle
        const autoRotateToggle = document.getElementById('auto-rotate-toggle') as HTMLInputElement;
        const toggleIcon = document.querySelector('.toggle-icon');

        if (autoRotateToggle && toggleIcon) {
            autoRotateToggle.checked = isAutoRotateEnabled && config.dashboard.rotation_enabled;
            autoRotateToggle.disabled = !config.dashboard.rotation_enabled;

            // Make the SVG clickable to toggle the checkbox
            toggleIcon.addEventListener('click', () => {
                if (!autoRotateToggle.disabled) {
                    autoRotateToggle.checked = !autoRotateToggle.checked;

                    // Dispatch change event since we're changing the checkbox programmatically
                    const event = new Event('change');
                    autoRotateToggle.dispatchEvent(event);
                }
            });

            // Also add keyboard support for the SVG toggle
            toggleIcon.addEventListener('keydown', (e) => {
                if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
                    if (!autoRotateToggle.disabled) {
                        autoRotateToggle.checked = !autoRotateToggle.checked;

                        // Dispatch change event
                        const event = new Event('change');
                        autoRotateToggle.dispatchEvent(event);
                    }
                    e.preventDefault();
                }
            });

            // Hide the toggle if rotation is disabled
            if (!config.dashboard.rotation_enabled) {
                const autoRotateContainer = document.querySelector('.auto-rotate');
                if (autoRotateContainer) {
                    autoRotateContainer.classList.add('hidden');
                }
            }

            autoRotateToggle.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                isAutoRotateEnabled = target.checked;

                if (isAutoRotateEnabled && config.dashboard.rotation_enabled) {
                    startRotation();
                } else {
                    stopRotation();
                }
            });
        }

        // Create navigation buttons
        const navBar = document.getElementById('nav-buttons');
        if (navBar) {
            urls.forEach((_, index) => {
                const button = document.createElement('button');
                button.textContent = urlLabels[index];
                button.addEventListener('click', async () => {
                    // Clean up event listener from previous webview if it exists
                    if (autoRotateToggle) {
                        autoRotateToggle.checked = false;
                    }
                    stopRotation();
                    // Create a new webview with the selected URL
                    await createWebview(index);
                });
                navBar.appendChild(button);
            });
        }
    }

    // Create the initial webview
    await createWebview();

    // Start auto-rotation if enabled
    if (isAutoRotateEnabled && config.dashboard.rotation_enabled) {
        startRotation();
    }
});
