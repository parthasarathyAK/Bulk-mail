const express = require("express")
const cors = require("cors")
const app = express()
const mongoose=require("mongoose")

const nodemailer = require("nodemailer")
app.use(cors())
app.use(express.json())
app.listen(5000, function () {
    console.log("server started...")
})
mongoose.connect(`mongodb+srv://sarathypartha631:6383541898@cluster0.ytwgh5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(function(){
    console.log("Database connected")
})

const credential=mongoose.model("credential",{},"bulkmail")

app.post("/sendmail", function (req, res) {
    var msg = req.body.msg
    var email = req.body.email

    credential.find().then(function(data){
        const transporter = nodemailer.createTransport(
            {
                service: "gmail",
                auth: {
                    user: data[0].toJSON().user,
                    pass: data[0].toJSON().pass,
                },
            }
        )
    
        new Promise( async function(resolve,reject){
    
            try{
                for (count = 0; count < email.length; count = count + 1) {
                   await transporter.sendMail({
                        from: "sarathypartha631@gmail.com",
                        to: email[count],
                        subject: "A message from Bulk Mail",
                        text: msg
            
            
                    },
                    console.log("email sent to :"+email[count])
                    )
                    resolve("success")
                }
                }
                catch(error){
                        reject("failed")    
                } 
        }).then(function(){
            res.send(true)
        }).catch(function(){
            res.send(false)
        })
    
        
    })
    
})