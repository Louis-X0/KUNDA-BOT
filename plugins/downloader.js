const { command , isPrivate , getBuffer } = require("../lib");
const fetch = require("node-fetch");
const { CAPTION } = require("../config");
const axios = require("axios");
const config = require("../config");


command(
    {
        pattern: "song",
        fromMe: isPrivate,
        desc: "Song Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.sendMessage("*_Need Song Name Or Url_*");
var res = await axios.get(`https://api-viper-x.koyeb.app/api/song?name=${match}`)
var song = res.data
await message.client.sendMessage(message.jid, { text: `*_Downloading ${song.data.title}_*` },{ quoted: message})
const aswinsparky = await (await fetch(`${song.data.downloadUrl}`)).buffer()
await message.client.sendMessage(message.jid, { audio :aswinsparky,  mimetype:"audio/mpeg" }, {quoted: message })
    }
    );


command(
    {
        pattern: "insta",
        fromMe: isPrivate,
        desc: "Instagram Video/Photo Downloader",
        type: "downloader",
    },
    async (message, match) => {
    	
    	
   if (!match.includes("https://www.instagram"))return message.reply(`*_Need instagram link_*`)
      var ig = await (await fetch(`https://vihangayt.me/download/instagram?url=${match}`)).json();
     var igdl = ig;
    let res = await getBuffer(`${igdl.data.data[0].url}`)
    let mtype = igdl.data.data[0].type;
      if(mtype == "video"){
       await message.client.sendMessage(message.jid, { video :res ,  mimetype:"video/mp4", caption: (config.CAPTION)}, {quoted: message })
      } else if(mtype == "image"){
      await message.client.sendMessage(message.jid, { image :res ,  mimetype:"image/jpeg",caption: (config.CAPTION)}, {quoted: message })
}
             
});

command(
    {
        pattern: "yt",
        fromMe: isPrivate,
        desc: "Video Downloader 720p",
        type: "downloader",
    },
    async (message, match) => {
        if (!match.includes("https://youtu")) return await message.sendMessage("*_Need a YouTube url_*");
var ytmp4 = await
                    fetch(`https://vihangayt.me/download/ytmp4?url=${match}`)
        var yt = await ytmp4.json()
        await message.client.sendMessage(message.jid, { text: `*Downloading ${yt.data.title}*` },{ quoted: message})
                    await message.client.sendMessage(message.jid,{video:{ url: yt.data.vid_720p}, caption : `_*${yt.data.title}*_`}, {quoted : message})
    }
    );

command(
    {
        pattern: "video",
        fromMe: isPrivate,
        desc: "Yt Video Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.sendMessage("*_Need Video Name Or Url_*");
let result = await axios.get(`https://api-aswin-sparky.koyeb.app/api/downloader/yt_video?search=${match}`);
var yt = await result.data
await message.client.sendMessage(message.jid, { text: `*_Downloading ${yt.result.title}_*` },{ quoted: message})
await message.client.sendMessage(message.jid, { video :{ url: yt.result.url }, caption: `*${yt.result.title}*`}, {quoted: message })
    }
    );

command(
    {
        pattern: "spotify",
        fromMe: isPrivate,
        desc: "Spotify Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.sendMessage("*_Need Spotify Song Url_*");
var sex = await fetch(`https://vihangayt.me/download/spotify?url=${match}`);
        var fek = await sex.json();
        message.reply(`*_Downloading ${fek.data.album_name}_*`)
        await message.client.sendMessage(message.jid, { audio :{ url: fek.data.url } , mimetype : 'audio/mpeg' },  {quoted: message })
    }
    );


