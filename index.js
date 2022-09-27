const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000



//Static files
app.use(express.static("public"));
app.use(express.static(__dirname +"public/css"));
app.use(express.static(__dirname +"public/js"));
app.use(express.static(__dirname +"public/img"));

// make the way from current dir to the view dir
app.set('views', path.join(__dirname,'views'))
//define the engine that will be used in ejs
app.set('view engine','ejs')

//middleware
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

//ROUTES
app.get('/', (req, res) => {
    let contas =  []
    if('contas' in req.cookies){
        contas = req.cookies.contas
    }
    res.render('index',{
        contas
    })
})
app.post('/calc', (req, res) => {
    let {num1, num2, op} = req.body
    num1 = parseInt(num1)
    num2 = parseInt(num2)
    let total = 0
    if(op === '+'){
        total = num1+num2
    }else if(op==='-'){
        total = num1-num2
    }else if(op==='*'){
        total = num1*num2
    }else if(op=== '/'){
        total = num1/num2
    }
    let contas = []
    if('contas' in req.cookies){
        contas = req.cookies.contas
    }
    contas.push({
        num1, num2, op, total
    })
    //use {maxAge:1000} to drop cookie after one second
    res.cookie('contas',contas)

   res.redirect('/')
})



//connect sever

app.listen(port, ()=> {
    console.log('Server running...')
})