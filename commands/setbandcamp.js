const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/bandcamp.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";
    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    let bandcampEmoji = client.emojis.cache.find(emoji => emoji.name === "bandcamp");

    var bcLink = args[1];
    //args.slice(1).join(" ");

    function findWord(word, str) {
        return RegExp('\\b'+ word +'\\b').test(str)
      }
      
    if (!bcLink) {
        return msg.channel.send(bandcampEmoji.toString() + " Bro you must provide a link!");
    }

    if (!bcLink.startsWith("https://")) {
        return msg.channel.send("Provide a valid link plz");
    }

    //sanitization
    if (!findWord("bandcamp", bcLink)) {
        return msg.channel.send("Looks like this isn't a bandcamp link smh");
    }

    directory = path.join(__dirname + '/../storage/bandcamp.json')

    botstorage[msg.author.id] = bcLink;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Bandcamp Successfully Set!")
        .setColor("#629aa9")
        .setDescription(bandcampEmoji.toString() + " Your Bandcamp has been successfully set!")
        .setFooter("View your link on your profile with !profile")
        .setTimestamp();

    msg.channel.send(successEmbed);
}