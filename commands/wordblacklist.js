const db = require("../mongoDB");

module.exports = {
    name: "blacklists",
    description: "word blacklist system",
    permissions: "0x00000000000000020",
    options: [{
      name: "action",
      description: "action to perform",
      type: 3,
      required: true,
      choices: [{
                name: "add",
                value: "add",
                },
                {
                name: "remove",
                value: "remove",
                },
                ],
        },
        {
        name: "word",
        description: "word to add or remove",
        type: 3,
        required: true,
        },
    ],

    run: async (client, interaction) => {
        let action = interaction.options.getString('action');
        word = interaction.options.getString('word').toLowerCase();
        let data =
          (await db.blacklists.findOne({guildID: interaction.guild.id})) ||
          (await db.blacklists.create({guildID: interaction.guild.id}));
        
        if (action === "add") {
          if (data.words.includes(word))
            return interaction.reply({
              content: "This word already exists", ephemeral: true,
            });
          
          data.words.push(word);
          await data.save();
          interaction.reply({content: `${word} has been added`, ephemeral: true}); 
        } else if (action === "remove") {
          if (!data.words.includes(word))
            return interaction.reply({
              content: "This word hasn't been added", ephemeral: true,
            });
      
          const removed = data.words.filter((a) => a !== word);
          data.words = removed;
          await data.save();
      
          interaction.reply({ content: `${word} has been removed`, ephemeral: true});
        }
      },
      
};