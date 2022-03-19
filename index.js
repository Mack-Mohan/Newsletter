const mailchimp = require('@mailchimp/mailchimp_marketing');
const express = require('express');

const app = express();
const https = require('https');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/fail", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

mailchimp.setConfig({
  apiKey: "583e6012758d549d7aa292bc64b1295c-us14",
  server: "us14"
});

app.post("/",function(req,res){
  const fname=req.body.first_name;
  const lname=req.body.last_name;
  const email=req.body.email;
  const listId = "b5e687c369";

  const subscribingUser = {
 firstName: fname,
 lastName: lname,
 email: email
};
  async function run(){
     response = await mailchimp.lists.addListMember(listId,{
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
  FNAME: subscribingUser.firstName,
  LNAME: subscribingUser.lastName
 }
});
res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}

  run().catch(e => res.sendFile(__dirname + "/fail.html"));
});


app.listen(3000 || process.env.PORT,function(){
console.log("I am on!");
});
