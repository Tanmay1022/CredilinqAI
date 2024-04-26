const express = require('express');
const cors = require('cors');
const UserModel = require('./Model/userInfoModel');
const connectDatabase = require('./mongoose');

const app = express();
const port = 5000;

connectDatabase();
app.use(cors());
app.use(express.json());

app.get('/displayData', async (req, res) => {
    try{
        const data = await UserModel.find();
        res.send(data);
        console.log(data)
    }catch(error){
        console.log("Error in fetching the data");
    }
});

app.post('/postData', async (req, res) => {
    console.log("Received POST request with data:", req.body);
    
    try {
        let result = new UserModel(req.body);
        console.log("Creating new UserModel instance:", result);

        // Save the new user
        let savedData = await result.save();
        console.log("Data saved successfully:", savedData);
        
        res.send("Data saved successfully");
    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).send("Error saving data to database: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
