# Architecture

This project is pretty straight-forward, it is designed to be as minimal and lightweight as possible.

The tool is a [Tauri](https://v2.tauri.app/) application, which uses Tauri's WebView feature to show different sites
within it, while providing a very simple UI (rendered as normal in Tauri using HTML, CSS, and JS) for navigating these
sites.

## Forked version of Tauri

To work on Linux we are currently using this fork of Tauri:

<https://github.com/ELginas/tauri/commits/multiwebview/>

This is to resolve this issue for now:

<https://github.com/tauri-apps/tauri/issues/10420>
