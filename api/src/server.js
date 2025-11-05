import express from 'express'
import {homepageTemplate} from './views/index.js'


const app = express()
const PORT = 3000
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send(homepageTemplate())
})

app.listen(PORT||3000,()=>{
    console.log(`App running on http://localhost:${PORT}`)
})