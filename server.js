console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const { MongoClient, ObjectId } = require('mongodb')

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

MongoClient.connect('mongodb://localhost:27017', { 
    useUnifiedTopology: true 
})
.then(client => {    
    console.log('Connected to Database')
    const db = client.db('quotes')
    const quotesCollection = db.collection('quotes')    

    app.listen(3000, function() {
        console.log('listening on 3000')
    })
    
    app.get('/', function (req, res){
        db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs',{quotes: results})
        })
        .catch(console.error)
        
    })
    
    app.post('/quotes', (req, res) => {          
        quotesCollection.insertOne(req.body)
        .then(result =>{
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
                $set: {
                name: req.body.name,
                quote: req.body.quote
                }
            },
            {
                upsert: true
            }
        )
        .then(result => {
            res.json('Success')
        })        
        .catch(error => console.error(error))
    })    

    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            { name: req.body.name }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
        })
        .catch(error => console.error(error))
    })

    app.put('/subcomment', (req, res) => {        
        quotesCollection.findOneAndUpdate(
            { _id: ObjectId(req.body.id) },
            {
                $push: {
                    subcomment: {
                        name: req.body.name,
                        quote: req.body.quote
                    }                    
                }
            }
        )
        .then(result => {
            console.log(result);
            res.json('Success')
        })        
        .catch(error => console.error(error))
    })
})
.catch(console.error)