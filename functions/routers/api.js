//config for database
const admin = require('firebase-admin');
var serviceAccount = require("../permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://first-web-api-79c5f.firebaseio.com"
});
const db = admin.firestore();


const express = require('express');
const router=express.Router();

router.get('/',function(req,res){
    return res.status(200).send('Hello my app')
});
// create new item request
router.post('/create', (req, res) => {
    (async () => {
        try {
          await db.collection('items').doc('/' + req.body.id + '/')
              .create({item: req.body.item});
          return res.status(200).send("done to save data");
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      }
    )();
});
// read a specific item (by ID)
router.get('/read/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('items').doc(req.params.id);
            let item = await document.get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
// read all items (total collection)
router.get('/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('items');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    item: doc.data().item
                };
                response.push(selectedItem);
            }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
// update an item
router.put('/update/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('items').doc(req.params.id);
            await document.update({
                item: req.body.item
            });
            return res.status(200).send('Updated!');
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });
// delete an item
router.delete('/delete/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('items').doc(req.params.id);
            await document.delete();
            return res.status(200).send('Delete sucess');
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

//exports router
module.exports=router;
