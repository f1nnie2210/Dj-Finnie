const { SlashCommandBuilder, messageLink } = require('discord.js');
module.exports = {
    name: 'code',
    description: 'Stardew Valley invite code.',
    permissions: '0x0000000000000800',
    options: [],
    run: async (client, interaction) => {
        const codeCommand = new SlashCommandBuilder();
        var fs = require('fs');
        fs.readFile(
            'C://Program Files (x86)/Steam/steamapps/common/Stardew Valley/Mods/Always On Server/InviteCode.txt',
            'utf8',
            function (err, data) {
                if (err) throw err;
                console.log(data);
                interaction.reply(
                    'Enter this code to join the Stardew Valley server: ' + data
                );
            }
        );
    }
};
