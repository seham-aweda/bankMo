const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const mongoose=require('mongoose')

require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/bank',require('./routes/bank.router'))

//
// app.get('/', (req, res) => {
//     const Data = JSON.parse(fs.readFileSync('BankUsers.json').toString())
//     res.status(200).json(Data)
// })
//
//
// app.post('/', (req, res) => {
//     const {firstName, lastName, passportId, country, email} = req.body
//     const users = BankersController.loadUsers()
//     const bankerExist = users.find(b => b.PassportId === passportId)
//     const EmailExist = users.find(b => b.Email === email)
//     if (firstName !== "" && lastName !== "" && country !== "" && email !== "") {
//         if (EmailExist || bankerExist) {
//             res.status(200).json('These Banker PassportId And Email Already Exist')
//         } else {
//             if (validator.isEmail(email)) {
//                 if (validator.isNumeric(passportId) && passportId.length > 2) {
//                     let se = BankersController.Adduser(firstName, lastName, passportId, country, email)
//                     res.status(202).json(se)
//                 } else {
//                     res.status(200).json('PassportId must be only numbers and more than two characters')
//                 }
//             } else {
//                 res.status(200).send('Enter A Valid Email Please ')
//             }
//         }
//     } else {
//         res.status(200).json('enter your first and last name ,your country, your passportId and email')
//     }
// })
//
// app.put('/depositing/:userId', (req, res) => {
//     const {userId} = req.params
//     const {Cash} = req.body
//     const users = BankersController.loadUsers()
//
//     let user = users.find(u => parseInt(u.PassportId) === parseInt(userId))
//     if (user) {
//         user.Cash = user.Cash+parseInt(Cash)
//         let filteredData = users.filter(u => parseInt(u.PassportId) !== parseInt(userId))
//         filteredData.push(user)
//         BankersController.saveUser((filteredData))
//         return res.status(200).json({success: user})
//     } else {
//         return res.status(400).json({error: 'Item is not exist'})
//     }
// })
// app.put('/updating/:userId', (req, res) => {
//     const {userId} = req.params
//     const {Credit} = req.body
//     const users = BankersController.loadUsers()
//
//     let user = users.find(u => parseInt(u.PassportId) === parseInt(userId))
//     if (user) {
//         user.Credit = parseInt(Credit)
//         let filteredData = users.filter(u => parseInt(u.PassportId) !== parseInt(userId))
//         filteredData.push(user)
//         BankersController.saveUser((filteredData))
//         return res.status(200).json({success: user})
//     } else {
//         return res.status(400).json({error: 'Item is not exist'})
//     }
// })
//
// app.put('/withdraw/:userId',(req,res)=>{
//     const {userId}=req.params
//     const {withdraw}=req.body
//     const users = BankersController.loadUsers()
//
//     let user = users.find(u => parseInt(u.PassportId) === parseInt(userId))
//     if (user){
//         if(withdraw <= parseInt(user.Cash)+parseInt(user.Credit)){
//             user.Cash=parseInt(user.Cash) - parseInt(withdraw)
//             let filteredData = users.filter(u => parseInt(u.PassportId) !== parseInt(userId))
//             filteredData.push(user)
//             BankersController.saveUser((filteredData))
//             return res.status(200).json({success: user,withdraw:withdraw})
//         }else{
//             return res.status(404).json(`u can only withdraw at max ${user.Cash+user.Credit}`)
//         }
//     }else{
//         return res.status(400).json({error: 'Item is not exist'})
//     }
// })


mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(chalk.blueBright.inverse('The App is running on port 5000'))
})

