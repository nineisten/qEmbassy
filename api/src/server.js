import express from 'express'

const app = express()
const PORT = 3000
app.listen(PORT||3000,()=>{
    console.log(`App running on localhost:${PORT}`)
})