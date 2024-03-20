//const DiscordRPC = require('discord-rpc'); // We load the Discord RPC
// module to interact with Discord.
const clientId = '1074074348551426048';
const discordRPC = new DiscordRPC.Client({ transport: 'ipc' });

discordRPC.on('ready', () => {
  console.log('Discord RPC is ready!');
});

discordRPC.login({ clientId }).catch(console.error);

const updateRichPresence = () => {
    const details = 'Scout des Equipes';
    const state = 'Playing';
    //const largeImageKey = 'custom_large_image';
    //const largeImageText = 'Custom Large Image Text';
    //const smallImageKey = 'custom_small_image';
    //const smallImageText = 'Custom Small Image Text';
  
    discordRPC.setActivity({
      details,
      state,
      //largeImageKey,
      //largeImageText,
      //smallImageKey,
      //smallImageText,
    });
  };
  
  app.whenReady().then(updateRichPresence);
  setInterval(updateRichPresence, 15000);