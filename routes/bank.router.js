const express=require('express')
const Controller=require('../controller/bankers.controllar')
const router=express.Router()

router.get('/',(req,res)=>{
    Controller.GetAllBankers(req,res)
}).get('/:bankerId',(req,res)=>{
    Controller.GetBankerById(req,res)
}).post('/',(req,res)=>{
    Controller.AddBanker(req,res)
}).put('/updateCash/:bankerId',(req,res)=>{
    Controller.AddCashToBanker(req,res)
}).put('/updateCredit/:bankerId',(req,res)=>{
    Controller.SetCreditToBanker(req,res)
}).put('/transform',(req,res)=>{
    Controller.TransferMoney(req,res)
}).put('/withdraw/:bankerId',(req,res)=>{
    Controller.WithdrawMoney(req,res)
})


module.exports = router