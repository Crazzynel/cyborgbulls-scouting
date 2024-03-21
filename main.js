const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;
let loadingWindow;
let PitType = "Inconnue" 
let PitName = ""
let RecapPitName = PitName
//let maintenanceWindow; // Ajout de cette ligne
////////// Discord Main 

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
        //icon: '9102.png'
        // Le logo est facultatif vu qu'il est déjà défini dans electron-builder.yaml
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
                        mainWindow.loadFile('./index.html');  // Permet d'effectuer la recharge d'une page
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
        },
        {
            label: 'AIDE',
            submenu: [
                {
                    label: 'Envoyer un commentaire',
                    role: commentaire_main()
                }
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