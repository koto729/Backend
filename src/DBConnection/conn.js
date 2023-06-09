const mongoose =  require("mongoose")

mongoose.connect("mongodb+srv://koto:1234@user.prz7fn7.mongodb.net/?retryWrites=true&w=majority").then(()=>{
  console.log("connection is setup successfully..")
}).catch((err))=>{
  console.log("connection not setup")
  console.log(err)
})
