require('dotenv').config();
const app = require(`express`)();
const path = require(`path`);
const mongoose = require('mongoose');
const Aqmpoint = require("./models/Aqmpoint");
const aqmData = require('./out3.json');

const User = require("./models/User");
const userData = [{email: "admin@example.com"},{email: "admin@example.com"}];

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.set('views',path.join(__dirname,'views'));
app.set("view engine","hbs");

(async () => {
    await Aqmpoint.deleteMany();
    await User.deleteMany();
    const createdUser = await User.insertMany(userData);
    aqmData.map(p => p.user = createdUser[Math.floor(Math.random() * createdUser.length)]._id);
    const createdpoints = await Aqmpoint.insertMany(aqmData);
})();

app.get('/:userId?', async(req,res)=>{
    const query = req.params.userId ? {user: req.params.userId} : {};

    let aqmpoints = await Aqmpoint.find(query);
    let users = await User.find();
    res.render('index', {aqmpoints, users});
});

    //TODO map over all the aqmData and assign each row a random user id from created user
  //createdUser[Math.floor(Math.random() * createdUser.length)]
  //TODO save the enriched apqData to DB



app.listen(5000);
