const express = require('express');
const server = express();
console.log("Hello World!");

server.get("/json", (req, res) => {
    res.json({ volume: 50 });
 });

 server.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });

 const PORT = process.env.PORT || 3000;

 const body_parser = require('body-parser');
 //const _port = 3000;
 server.use(body_parser.json())

 app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

let data = require('./data');
let volume = require('./volume');

server.get("/volume", (req, res) => {
    res.json(volume);
});

server.get("/items", (req, res) => {
    res.json(data);
 });

 server.get("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = data.find(_item => _item.id === itemId);
 
    if (item) {
       res.json(item);
    } else {
       res.json({ message: `item ${itemId} doesn't exist`})
    }
 });

 server.get("/volume/:id", (req, res) => {
    const itemId = req.params.id;
    const item = volume.find(_item => _item.id === itemId);
 
    if (item) {
       res.json(item);
    } else {
       res.json({ message: `item ${itemId} doesn't exist`})
    }
 });


server.put("/volume/:id", (req, res) => {
    const itemID = req.params.id;
    const item = req.body;
    console.log("updating volume to : ", item);
    const updatedListItems = [];
    volume.forEach(oldItem => {
        if (oldItem.id === itemID) {
            updatedListItems.push(item);
        } else {
            updatedListItems.push(oldItem);
        }
    });
    volume = updatedListItems;
    res.json(volume);
})

server.put("/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    console.log("Editing item: ", itemId, " to be ", item);
 
    const updatedListItems = [];
    // loop through list to find and replace one item
    data.forEach(oldItem => {
       if (oldItem.id === itemId) {
          updatedListItems.push(item);
       } else {
          updatedListItems.push(oldItem);
       }
    });
 
    // replace old list with new one
    data = updatedListItems;
 
    res.json(data);
 });



