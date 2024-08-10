const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0F2TG02VlVCUE9CZjYrYiswbTQ3cjdCWlc5UTN6Nm1CSEU3VTZEM1Uxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib3FGWnF6TU96M3Zhd2djaFJqR0VTeFNSc1hGaGYxNm4rWjVXeVdvS2MyZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRWI2ZDVrZUltbXkybG1uOEcwZmpBT0w1azJlcGxWWG5YOENkRy92UFdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzVlV3TWhLY09LaFN3MWE0eWF4NVVOc1ZQVDB1cUpveHBkdjJURCtJdkd3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitEOWJXTk1yMlZBaTFMYXNubjI4Znc2TW5MVFpxUFJWTWZEbG9HS1lsMlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBTeHdxR0lIV0VBQk8xbDRpNWVGQWpvMWdRb29wY1gwNCtVSUNKRWRMQjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUJLdm43UWVIRVAzT25yWjNIUU80Lzc1WUI5STltblJlWm5sOU9QZSsxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlBNSlRreTFtUDE5Ynpqai92NC9hc0w2K2VDZVlqbElFTlhFYWpIakozaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFiL2FWVVBTcVAxNGVNalZxNi9NUktqZGxKUHVFamgvd29adFF0aDBWR3dsb2FpZVRncmJsLzNWN0szNEhmMUlqQ2RSbHhZbHR3UnpkeklPVk5sWmlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzYsImFkdlNlY3JldEtleSI6IjZwYVFBZ2hPdWJ5eWszSkxHak1OdWtKWUJyandzNDhQQzhUOWlmaFRRbHM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImFYbkt3M2gwUzVXWU5TdzdBTHYwbHciLCJwaG9uZUlkIjoiMGJmNzBkYTctN2Y4OC00ODRjLWJhOTktOTRkMTFhNGMyYjJiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRVMkUrQmlQdEhJdWdMRzNYNFBpL3gxek9wTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1VHhPMUprcG5wMmUrT01RekMxTVJIcExSRDQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQkpFWkxOWjEiLCJtZSI6eyJpZCI6IjIzNDgwODI3MzM0NzU6MjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tHcXhhVUJFSkdGM3JVR0dCVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZlNktxYjJPaC9OVU03R0pUM2FaUjVXWUZucUs2bTZVMU1ZVUpaVkR4VFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlFtbTNCWHUzN2VncEUrTytFRWNxZWsrMEgxZ1hrcG1adU5aKy9XOTcrbi95VDdOVUlTU1RlMGJQeEZaRk45VUpHbkxleUw4R2dXTWZ3TXp6aXdQSEFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJWQVgxTkduOFkvblBUY2xUeWlLR01ibUtoVm9yZGlXUUdYQ0lxTkhkYSs5Vkdia0pRdXhRdkJsZGdkamZmRTBvVlR1djNhcTlwcjZuZW9UaDNJb0ppZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwODI3MzM0NzU6MjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVlh1aXFtOWpvZnpWRE94aVU5Mm1VZVZtQlo2aXVwdWxOVEdGQ1dWUThVMCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzMwMjU1OH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
