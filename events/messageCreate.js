const db = require("../mongoDB");

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  const data = 
    (await db.blacklists.findOne({ guildID: message.guild.id})) ||
    (await db.blacklists.create({ guildID: message.guild.id }));

    const bannedWords = data.words.map((x) => x.toLowerCase().trim());
    const messageWords = message.content.toLowerCase().split(/\s+/);
    
    if (messageWords.some((word) => bannedWords.includes(word))) {
      message.delete();
      const user = message.author;
      message.channel.send({ content: `Vô văn hoá! ${user}` });
    }
    
}
