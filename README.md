# easy-web-dashboard

A simple desktop web dashboard for displaying different pages. Provides automatic cycling between pages and manual
control of switching between pages. Built to provide a straightforward and useful dashboard on a big screen in an
office.

[![Business Simulations Logo](https://businesssimulations.com/logo.png)](https://businesssimulations.com/)

[Maintained by Business Simulations](https://businesssimulations.com/).

## What is it?

Easy Web Dashboard is a simple application that transforms any display into a dynamic information center. It
allows you to cycle through multiple websites automatically or manually on a single screen. The dashboard is designed
to be simple to set up and use, making it perfect for office environments where you want to display various web
resources like dashboards, metrics, news sites, or company information.

## Why would I use it?

- **Office Information Display**: Create an informative display for your office showing company KPIs, news, social
media, or other relevant websites
- **Meeting Room Intelligence**: Display project dashboards, relevant metrics, or company announcements in meeting
spaces
- **Reception Area Information**: Provide visitors with relevant information, news, or company highlights in waiting
areas
- **Touch-Enabled Interaction**: Allow team members to interact with the display through touch controls to navigate to
specific information when needed
- **Simplicity**: No complex setup required - just configure your websites and display settings, and you're ready to
go
- **Customization**: Adapt the look and feel to match your company branding through simple color customization

## Features

- **Automatic Rotation**: Cycles through configured websites at customizable intervals
- **Touch Controls**: Manually navigate between sites using touch-friendly controls
- **Pause/Resume**: Temporarily pause rotation when needed for focused viewing
- **Customizable Styling**: Adjust colors to match your company branding or preferences
- **Multiple Configuration Options**: Set up using either environment variables or a JSON configuration file
- **Cross-Platform Support**: Runs on Windows, MacOS, and Linux, on both AMD64 and ARM64 architectures
- **Responsive Design**: Works well on various screen sizes and orientations
- **Full-Screen Mode**: Optimize screen real estate for information display
- **Simple Navigation Bar**: Easy access to controls and site selection

## Getting started

Download the executable for your platform from the [latest release page](https://github.com/BusinessSimulations/easy-web-dashboard/releases/tag/0.4.0).

- [Linux AMD64 Debian](https://github.com/BusinessSimulations/easy-web-dashboard/releases/download/0.4.0/easy-web-dashboard-0.4.0-linux-x64.deb)
- [Linux ARM64 Debian/Raspberry PI](https://github.com/BusinessSimulations/easy-web-dashboard/releases/download/0.4.0/easy-web-dashboard-0.4.0-linux-arm64.deb)
- [MacOS ARM](https://github.com/BusinessSimulations/easy-web-dashboard/releases/download/0.4.0/easy-web-dashboard-0.4.0-macos-arm64.dmg)
- [MacOS Intel](https://github.com/BusinessSimulations/easy-web-dashboard/releases/download/0.4.0/easy-web-dashboard-0.4.0-macos-x64.dmg)
- [Windows AMD64](https://github.com/BusinessSimulations/easy-web-dashboard/releases/download/0.4.0/easy-web-dashboard-0.4.0-windows-x64.exe)
- [Windows ARM64](https://github.com/BusinessSimulations/easy-web-dashboard/releases/download/0.4.0/easy-web-dashboard-0.4.0-windows-arm64.exe)

Install the application according to your operating system procedure.

### Linux Debian/Raspberry PI

Install the application with:

```bash
sudo dpkg -i <downloaded deb file>
```

If it fails to install because dependencies are missing, you can install any required dependencies by running:

```bash
sudo apt install -f
```

And then run the `dpkg` command again to finish the installation.

### MacOS

Double click the DMG file and install it into your `Applications`.

When you try to open the application it will fail to open with a message like:

> Apple could not verify "easy-web-dashboard" is free of malware that may harm your Mac or compromise your privacy.

To allow you to open this, you need to allow it past this security feature.

Open up your 'System Settings', go to 'Privacy & Security' and scroll down to 'Security', there should be a message
stating that "easy-web-dashboard" was blocked from opening, and you can choose to override this and open it anyway.

Once this is done the application will be able to open normally.

### Windows

Double click the executable file, this will install the application, you may have to grant permission to allow it to
run.

### Others (Linux Fedora etc.)

Look at the available installation bundles on the [latest release
page](https://github.com/BusinessSimulations/easy-web-dashboard/releases/tag/0.4.0) to check for a supported installer.

## Configuration

You can configure easy-web-dashboard using a JSON configuration file called `config.json` in the directory that you are
running the program from.

### Example JSON Configuration

```json
{
    "sites": [
        {
            "url": "https://businesssimulations.com",
            "name": "Business Simulations"
        }
    ],
    "dashboard": {
        "controls_enabled": true,
        "rotation_seconds": 45,
        "rotation_enabled": true,
        "rotation_on_by_default": true,
        "primary_color": "#17D1C7",
        "primary_contrast_color": "#21244F",
        "text_color": "#FFFFFF",
        "background_color": "#21244F"
    }
}
```

### Reference

This is a list of all of the JSON properties that can be used to configure easy-web-dashboard.

#### Root

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>sites</td>
            <td>array</td>
            <td>List of websites to display in the dashboard.</td>
            <td>See <a href="#site">site</a> for more information.</td>
            <td>[One default site]</td>
        </tr>
        <tr>
            <td>dashboard</td>
            <td>object</td>
            <td>Dashboard display and behavior settings.</td>
            <td>See <a href="#dashboard">dashboard</a> for more information.</td>
            <td>Default values</td>
        </tr>
    </tbody>
</table>

#### site

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>url</td>
            <td>string</td>
            <td>URL of the website to display. Required.</td>
            <td>https://google.com</td>
            <td>https://businesssimulations.com</td>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Display name for the website. Required.</td>
            <td>Google</td>
            <td>Business Simulations</td>
        </tr>
    </tbody>
</table>

#### dashboard

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>controls_enabled</td>
            <td>boolean</td>
            <td>If the dashboard controls are enabled, if not the controls bar will not be visible.</td>
            <td>false</td>
            <td>true</td>
        </tr>
        <tr>
            <td>rotation_seconds</td>
            <td>integer</td>
            <td>Time in seconds before rotating to the next site.</td>
            <td>60</td>
            <td>30</td>
        </tr>
        <tr>
            <td>rotation_enabled</td>
            <td>boolean</td>
            <td>Whether rotation between sites is enabled.</td>
            <td>false</td>
            <td>true</td>
        </tr>
        <tr>
            <td>rotation_on_by_default</td>
            <td>boolean</td>
            <td>Whether rotation is on by default when loading the dashboard.</td>
            <td>false</td>
            <td>true</td>
        </tr>
        <tr>
            <td>primary_color</td>
            <td>string</td>
            <td>Primary color for UI elements (hex format).</td>
            <td>#17D1C7</td>
            <td>#1976d2</td>
        </tr>
        <tr>
            <td>primary_contrast_color</td>
            <td>string</td>
            <td>Contrast color for text on primary color (hex format).</td>
            <td>#21244F</td>
            <td>#000000</td>
        </tr>
        <tr>
            <td>text_color</td>
            <td>string</td>
            <td>Default text color (hex format).</td>
            <td>#FFFFFF</td>
            <td>#ffffff</td>
        </tr>
        <tr>
            <td>background_color</td>
            <td>string</td>
            <td>Background color of the dashboard (hex format).</td>
            <td>#21244F</td>
            <td>#f5f5f5</td>
        </tr>
    </tbody>
</table>

## Supported platforms

- Linux AMD64
- Linux ARM64
- MacOS AMD64
- MacOS ARM64
- Windows AMD64
- Windows ARM64

## License

This project is [licensed under the MIT license](./LICENSE.md), meaning it is free for personal and commercial use.

## Contributing

If you are interested in contributing in any way to this project (bug reports, feature suggestions, code changes)
please read the [contributing guidelines](./CONTRIBUTING.md) first.
