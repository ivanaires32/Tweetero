import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

let perfil;

const usuarios = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if (!username || !avatar) {
        res.status(404).send("serviço fora do ar")
        return
    }

    const conta =
    {
        username,
        avatar
    }

    usuarios.push(conta)

    res.send("ok")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    const logado = usuarios.find((e) => e.username === username)
    if (logado === undefined) {
        res.status(401).send("usuario não logado")
        return
    } else if (!username || !tweet) {
        res.status(400).send("tweet não enviado")
        return
    } else if (tweets.length === 10) {
        tweets.shift()
    } else {
        const newTweet = {
            username,
            tweet
        }

        tweets.push(newTweet)
    }

    res.send("Deu Certo")


})

app.get("/tweets", (req, res) => {
    res.send(tweets)
})

app.listen(5000, () => console.log("Server rodando"))