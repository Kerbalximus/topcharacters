const express = require("express")
const sqlite = require('sqlite3')
const cors = require('cors')
const bodyParser = require('body-parser')
var crypto = require('crypto')

const app = express();
const port = 4000

var ratingTimeout = {} // чтобы пользователи не могли несколько раз голосовать за одного персонажа

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(cors())

const db = new sqlite.Database('database.db');

app.get("/characters", (req, res) => {


    db.all("SELECT * FROM characters", [], (err, table) => {
        let resposne = []
        table.forEach((value) => {
            resposne.push(
                {
                    "id": value['id'],
                    "characterName": value['characterName'],
                    "rating": value['rating'],
                    "avatarUrl": value['avatarUrl'],
                    "fandomName": value['fandomName']
                }
            )

        })

        console.log(resposne)

        res.send(resposne)
    })



})

// CREATE TABLE IF NOT EXISTS characters (id INTEGER  PRIMARY KEY AUTOINCREMENT, characterName TEXT, fandomName TEXT, rating INTEGER, avatarUrl TEXT, bannerUrl TEXT, color TEXT, aboutCharacter TEXT, aboutCharacterOrigin TEXT)


// INSERT INTO characters (characterName, fandomName, rating, avatarUrl, bannerUrl, color, aboutCharacter, aboutCharacterOrigin) VALUES ('Spider-Gwen', 'spiderman, marvel comics', 0, 'https://www.superherohype.com/wp-content/uploads/sites/4/2023/06/gwen-stacy-spider-man-across-the-spider-verse.png', 'https://moewalls.com/wp-content/uploads/2023/06/miles-morales-and-gwen-stacy-spiderman-across-the-spider-verse-thumb.jpg', '#BD8FC6', 'Gwendolyne Maxine "Gwen" Stacy is a fictional character appearing in American comic books published by Marvel Comics, usually as a supporting character in those featuring Spider-Man.', 'Wikipedia')

// INSERT INTO characters (characterName, fandomName, rating, avatarUrl, bannerUrl, color, aboutCharacter, aboutCharacterOrigin) VALUES ('DK', 'russian edm ', 0, 'https://sun9-54.userapi.com/impg/hO36CyrAfIIHdh89l9ay-BVyULd4A3s0w2eO9g/ueecai9gwf0.jpg?size=807x807&quality=96&sign=ea25278cd6f0e5b91a1219850a4f8fcb&c_uniq_tag=da6LnrwqOPqHaFxMGzypjId9gb8WWsa3c0yWePQJ5ms&type=album', 'https://i.ytimg.com/vi/fbNxn7rIxvE/maxresdefault.jpg', '#04637C', "Danila Vladimirovich Kashin, also known as DK, is a Russian video blogger, rap artist and EDM producer. On his YouTube channels he publishes videos of musical parodies and author's video clips", 'Wikipedia')

// INSERT INTO characters (characterName, fandomName, rating, avatarUrl, bannerUrl, color, aboutCharacter, aboutCharacterOrigin) VALUES ('DK', 'russian edm ', 0, 'https://sun9-54.userapi.com/impg/hO36CyrAfIIHdh89l9ay-BVyULd4A3s0w2eO9g/ueecai9gwf0.jpg?size=807x807&quality=96&sign=ea25278cd6f0e5b91a1219850a4f8fcb&c_uniq_tag=da6LnrwqOPqHaFxMGzypjId9gb8WWsa3c0yWePQJ5ms&type=album', 'https://i.ytimg.com/vi/fbNxn7rIxvE/maxresdefault.jpg', '#04637C', "Danila Vladimirovich Kashin, also known as DK, is a Russian video blogger, rap artist and EDM producer. On his YouTube channels he publishes videos of musical parodies and author's video clips", 'Wikipedia')

// INSERT INTO characters (characterName, fandomName, rating, avatarUrl, bannerUrl, color, aboutCharacter, aboutCharacterOrigin) VALUES ('RAIDEN SHOGUN', 'genshin impact', 0, 'https://www.hdwallpapers.in/thumbs/2021/baal_purple_hair_eyes_hd_genshin_impact-t2.jpg', 'https://images6.alphacoders.com/129/1297123.png', '#906997', 'Raiden Shogun, real name Raiden Ei, is a playable character in the action role-playing game Genshin Impact, developed by miHoYo. Within the game's story, she is the ruling god, or "Archon," of the Japan-inspired nation of Inazuma, first encountered as a stern and authoritarian ruler', 'Wikipedia')

// INSERT INTO characters (characterName, fandomName, rating, avatarUrl, bannerUrl, color, aboutCharacter, aboutCharacterOrigin) VALUES ('Pepe', '', 0, 'http://t1.gstatic.com/images?q=tbn:ANd9GcT0RKJKMLBQUzxe9bGiAH8WeVEzskSRnISCvByqe3R3DZ4k-PTd0iJjCo6Ep-UaMg_tnHX7', 'https://ichef.bbci.co.uk/images/ic/1200x675/p0g3zj2w.jpg', '#01864D', 'Pepe the Frog is a cartoon character and Internet meme created by cartoonist Matt Furie. Designed as a green anthropomorphic frog with a humanoid body, Pepe originated in Furie's 2005 comic Boy's Club.', 'Wikipedia')

function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

app.post("/auth", (req, res) => {
    var email = req.body.email
    var password = req.body.password

    db.get(`SELECT * FROM auth WHERE email="${email}"`, [], async (err, table) => {
        console.log(table)
        if (table == undefined) {
            console.log("Аккаунт не найден, нужно регать")

            var token = await hash(email + password + String(getRandomInt(-11111, 99999999)))
            console.log(email, password, token)

            db.run(`INSERT INTO auth (email, password, token) VALUES ("${email}", "${password}", "${token}")`)

            res.send(token)
        }

        else if (table['password'] == password) {
            res.send(table['token'])
        }

        else { res.send("Password failed") }


    })

})

app.get("/character", (req, res) => {
    db.all(`SELECT * FROM characters WHERE id=${req.query.id}`, [], (err, table) => {
        res.send(table[0])
    })
})

app.post("/review", (req, res) => {
    var reviewText = req.body.reviewText
    var characterId = req.body.characterId
    console.log(reviewText, characterId)
    db.all(`SELECT * FROM auth WHERE token="${req.headers['authorization']}"`, [], (err, table) => {
        console.log(table)
        if (table.length == 0) {
            res.send("No authorization")
            return
        }

        db.run(`INSERT INTO reviews (author_id, author_name, review, characterId) VALUES ("${table[0]['id']}", "${table[0]['email'].slice(0, 6)}", "${reviewText}", ${parseInt(characterId)})`)


        res.send("true")
    }
    )
})


app.get("/review", (req, res) => {
    db.all(`SELECT * FROM reviews WHERE characterId=${parseInt(req.query.id)}`, [], (err, table) => {
        let resposne = []

        console.log(req.query, table)

        if (table === undefined) {
            return res.send([])
        }
        table.forEach((value) => {
            resposne.push(
                {
                    "id": value['id'],
                    "author_name": value['author_name'],
                    "review": value['review']
                }
            )

        })

        console.log(resposne)

        res.send({ "response": resposne })
    })
})

app.post("/score", (req, res) => {

    var result = req.body.score
    var characterId = req.body.characterId

    console.log(req.headers['authorization'], req.body)


    if (req.headers['authorization'] in ratingTimeout) {
        var workingDoc = ratingTimeout[req.headers['authorization']]
        if (workingDoc['characterId'] == characterId && Date.now() - workingDoc['time'] < 60 * 60 * 24 * 1000) {
            res.send("Retry after 24h")
            return
        }
    }

    db.all(`SELECT * FROM auth WHERE token="${req.headers['authorization']}"`, [], (err, table) => {
        if (table.length == 0) {
            res.send("No authorization")
            return
        } if (result == "good") {
            db.run(`UPDATE characters SET rating = rating + 1 WHERE id = ${characterId}`)
        }
        else if (result == "bad") {
            {
                db.run(`UPDATE characters SET rating = rating - 1 WHERE id = ${characterId}`)
            }
        }


        ratingTimeout[req.headers['authorization']] = {
            "time": Date.now(),
            "characterId": characterId
        }

        res.send("true")
        return
    })



})

app.delete("/review", (req, res) => {
    var reviewId = req.query.id

    if (reviewId === "-1") {
        return res.send("Not author")
    }

    db.all(`SELECT * FROM auth WHERE token="${req.headers['authorization']}"`, [], (err, table) => {
        if (table.length == 0) {
            res.send("No authorization")
            return
        }
        db.get(`SELECT * FROM reviews WHERE id=${reviewId}`, [], (err, _table) => {
            if (table.length == {}) {
                res.send("No found")
                return
            }
            console.log(table, _table, reviewId)

            if (table[0]['id'] === _table['author_id']) {
                console.log("It's author")
                db.run(`DELETE FROM reviews WHERE id=${reviewId}`)
                return res.send("true")
            } else {
                return res.send("Not author")
            }
        })
    })




    // db.run(`DELETE FROM reviews WHERE id=${reviewId}`)

})


app.listen(port, () => {

    console.log(`Сервер запущен на порту ${port}`);

});
