const Bankers = require('../modules/bankers.module').BankerModel
const validator=require('validator')
const GetAllBankers = (req, res) => {
    Bankers.find({}, (err, data) => {
        if (err) return res.status(404).json(err)
        return res.status(200).json({'data': data})
    })
}

const GetBankerById = (req, res) => {
    const{bankerId}=req.params
    Bankers.find({ _id: { $eq: bankerId} }, (err, data) => {
        if (err) return res.status(404).json(err)
        return res.status(200).json({'data': data})
    })
}


const AddBanker = (req, res) => {
    const {name, passportId, email,cash,credit} = req.body
    if (name !== "" && passportId !== "" && email !== "" && validator.isEmail(email)) {
        Bankers.find({passportId: passportId}, (err, data) => {
            console.log(data)
            if (data.length===0) {
            const newBanker = new Bankers({name, passportId, email, cash, credit})
            newBanker.save((err, data) => {
                if (err) return res.status(404).json(err)
                return res.status(200).json({'newBanker': data})
            })
        }else
            {
                return res.status(404).json('passportId exists')
            }
        })
    }else{
            return res.status(404).json('fill all the fields OR inter a valid email')
        }
}

const AddCashToBanker=(req,res)=>{
    const{bankerId}=req.params
    const{cash}=req.body
    if(typeof cash!=='number'){
        return res.status(404).send('cash must be a number')
    }else {
        Bankers.findById(bankerId, (err, banker) => {
            console.log(cash)
            if (err) return res.status(404).send(err)
            Bankers.findByIdAndUpdate(bankerId, {cash: parseInt(banker.cash) + parseInt(cash)}, {
                new: true,
                runValidators: true
            }, (err, data) => {
                if (err) return res.status(404).json('Banker Not Found')
                return res.status(200).json({'updated': data})
            })

        })
    }
}


const SetCreditToBanker=(req,res)=>{
    const{bankerId}=req.params
    const{credit}=req.body
    if(typeof credit!=='number'){
        return res.status(404).send('credit must be a number')
    }else {
            Bankers.findByIdAndUpdate(bankerId, {credit: parseInt(credit)}, {
                new: true,
                runValidators: true
            }, (err, data) => {
                if (err) return res.status(404).json(err.message)
                return res.status(200).json({'updated': data})
            })}

}
const WithdrawMoney=(req,res)=>{
    const{bankerId}=req.params
    const{cash}=req.body
    if(typeof cash!=='number'){
        return res.status(404).send('cash must be a number')
    }else {
        Bankers.findById(bankerId, (err, banker) => {
            if (err) return res.status(404).send(err)
            console.log(parseInt(cash))
            if (parseInt(cash) <= parseInt(banker.cash) + parseInt(banker.credit)) {
                Bankers.findByIdAndUpdate(bankerId, {cash: parseInt(banker.cash) - parseInt(cash)}, {
                    new: true,
                    runValidators: true
                }, (err, data) => {
                    if (err) return res.status(404).json('Banker Not Found')
                    return res.status(200).json({'updated': data})
                })
            } else {
                return res.status(404).send(`your max withdraw money should be less or equal than${parseInt(banker.cash) + parseInt(banker.credit)}`)
            }

        })
    }

}

const TransferMoney=(req,res)=>{
    // const{from,to}=req,params
    const{cash,from,to}=req.body
    if(from!==to){
    Bankers.findById(from,(err,user1)=>{
        if(err) return res.status(404).json(err)
        if(cash<=parseInt(user1.cash) + parseInt(user1.credit)) {
            Bankers.findByIdAndUpdate(from, {cash: user1.cash - parseInt(cash)}, {
                new: true,
                runValidators: true
            }, (err, user1Updated) => {
                if (err) return res.status(404).json(err)
                Bankers.findById(to, (err, user2) => {
                    if (err) return res.status(404).json(err)
                    Bankers.findByIdAndUpdate(to, {cash: user2.cash + parseInt(cash)}, {
                        new: true,
                        runValidators: true
                    }, (err, user2Updated) => {
                        if (err) return res.status(404).json(err)
                        if (user2Updated) res.status(200).json({
                            'user1Updated': user1Updated,
                            'user2Updated': user2Updated
                        })
                    })
                })
            })
        }
    })
    }else{
        return res.status(404).json("users ID must be different")
    }
}



module.exports = {
    GetAllBankers,
    AddBanker,
    AddCashToBanker,
    SetCreditToBanker,
    TransferMoney,
    WithdrawMoney,GetBankerById
}