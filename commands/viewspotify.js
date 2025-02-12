const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/spotify.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {

    let prefix = "%";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    var userMention = msg.mentions.users.first();
    var id = args[1];
    var user;

    let spotifyEmoji = client.emojis.cache.find(emoji => emoji.name === "spotify");

    if (!userMention) {
        user = msg.guild.members.cache.get(id);
    }

    if (userMention) {
        user = msg.guild.members.cache.get(userMention.id)
    }

    if (!userMention && !args[1]) {
        user = msg.guild.members.cache.get(msg.author.id);
    }
    
    if (!user) {
        return msg.channel.send("Please mention a user or paste an ID!");
    }

    directory = path.join(__dirname + '/../storage/spotify.json')

    if (!botstorage[user.id]) {
        return msg.channel.send(user.user.username + " doesn't have a Spotify!");
    }

    console.log(botstorage[user.id]);

    const spotEmbed = new Discord.MessageEmbed()
        .setAuthor(user.user.tag + "'s Spotify", user.user.displayAvatarURL({dynamic: true}))
        .setDescription(spotifyEmoji.toString() +" "+ `Click [here](${botstorage[user.id]}) to view ${user.user.username}'s Spotify`)
        .setTimestamp();

    msg.channel.send(spotEmbed);

    //msg.delete();

}