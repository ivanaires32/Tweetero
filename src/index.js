import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const usuarios = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatorios")
        return
    }

    const conta =
    {
        username,
        avatar
    }

    usuarios.push(conta)

    res.status(201).send("ok")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    console.log(req.body)
    const logado = usuarios.find((e) => e.username === username)
    if (logado === undefined) {
        res.status(400).send("usuario não logado")
        return
    } else if (!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatorios")
        return
    } else if (tweets.length === 10) {
        tweets.shift()
    }

    const newTweet = {
        username,
        tweet,
        avatar: usuarios[usuarios.length - 1].avatar
    }

    tweets.push(newTweet)

    res.send("Deu Certo")


})

app.get("/tweets", (req, res) => {
    res.send(tweets)
})

app.listen(5000, () => console.log("Server rodando"))