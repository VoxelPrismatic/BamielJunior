const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/names.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    directory = path.join(__dirname + '/../storage/names.json')

    var checkmark = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let name = args.slice(1).join(" ");
    botstorage[msg.author.id] = name;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    msg.channel.send(checkmark.toString() + " Got it! Your musical name is now `" +botstorage[msg.author.id] + "`");
}