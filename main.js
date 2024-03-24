const { app, BrowserWindow, Menu, dialog } = require('electron');
const { autoUpdater } = require('electron-updater')

let mainWindow;
let loadingWindow;
let PitType = "Inconnue" 
let PitName = ""
let RecapPitName = PitName
//let maintenanceWindow; // Ajout de cette ligne
////////// Auto Updater - Bêta
autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'https://nisuky-devs.github.io/app/cyborgbulls/application/updater/updates.json'
})
///
autoUpdater.on('checking-for-update', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Vérification des mises à jour',
        message: 'La vérification des mises à jour est en cours...',
    });
});

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Mise à jour disponible',
        message: 'Une mise à jour est disponible. Le téléchargement est en cours',
    });
});

autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Pas de mise à jour disponible',
        message: 'Votre application est à jour. Aucune mise à jour n\'est requise.',
    });
});

autoUpdater.on('error', (error) => {
    dialog.showErrorBox('Erreur de mise à jour', error == null ? "unknown" : (error.stack || error).toString());
});

autoUpdater.on('download-progress', (progressObj) => {
    const logMessage = `Téléchargement de ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total} octets)`;
    console.log(logMessage);
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Mise à jour téléchargée',
        message: 'La mise à jour a été téléchargée et est prête à être installée. Voulez-vous redémarrer l\'application pour appliquer la mise à jour maintenant ?',
        buttons: ['Redémarrer', 'Plus tard']
    }).then((response) => {
        if (response.response === 0) {
            autoUpdater.quitAndInstall();
        }
    });
});

autoUpdater.checkForUpdatesAndNotify();

///

/////////
const createLoadingWindow = () => {
    loadingWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            frame: false,
        }
    });

    loadingWindow.loadFile('loading.html');

    loadingWindow.on('closed', () => {
        loadingWindow = null;
        createMainWindow();
    });

    setTimeout(() => {
        loadingWindow.close();
    }, 12000);
};

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        icon: '9102.png'
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const customMenu = Menu.buildFromTemplate([
        {
            label: 'Navigation',
            submenu: [
                {
                    label: 'Retour à l\'accueil',
                    click: () => {
                        mainWindow.loadFile('./index.html');
                    } 
                },
                { type: 'separator' },
                {
                    label: 'Recharger la page',
                    role: 'reload'
                }, 
            ]
        },
        {
            label: 'Application',
            submenu: [
                { 
                    label: 'Réduire l\'application',
                    role: 'minimize'
                },
                { type: 'separator'},
                {
                    label: 'Quitter',
                    role: 'quit'
                },
                { type: 'separator' },
                {
                    label: 'Passer en plein écran',
                    role: 'togglefullscreen'
                },
                {
                    label:'Developer Console',
                    role: 'toggleDevTools'
                }
            ]
        },
        {
            label: 'Informations',
            submenu: [
                {
                    label: 'FRC TEAM: 9102',
                    role: ''
                },
                { type: 'separator'},
                {
                    label:  'Scout Name: Aucun',
                    role: ''
                },
                {
                    label: 'Scout Zone: Inconnue' ,
                    role: ''
                },
                { type: 'separator'},
                {
                    label:  'État de la licence: Invalide',
                    role: ''
                },
            ]
        }
    ]);

    Menu.setApplicationMenu(customMenu);
};

app.on('ready', createLoadingWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createLoadingWindow();
    }
});

//// CHAMP RESERVE AUX FONCTIONS
function commentaire_main() {
    console.log('Unable to retrieve data from scouting.cyborgbulls.fr')
}
//// FIN DE CHAMP
