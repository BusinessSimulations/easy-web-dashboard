import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
    'api',
    {
        getConfig: () => ipcRenderer.invoke('get-config'),
        loadUrl: (url: string) => ipcRenderer.send('load-url', url)
    }
);
