import express from 'express'
import cors from 'cors'

import route from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', route)

app.listen(5555, () => {
    console.log("Servidor iniciado com sucesso.")
})