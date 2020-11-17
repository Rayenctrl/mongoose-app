const express=require("express");
const router=express.Router()
const Person=require('../models/person')


//@api http:localhost:5000/api/persons
//@desc Add new Person
//@access public
router.post("/", (req,res)=>{
    const newPerson = new Person ({...req.body});
    newPerson
    .save()
    .then(person=>res.send(person))
    .catch(err=>res.send(err));
});

//create and save a record of a model
var p = new Person;
name = "John";
age = 18;
favoriteFoods = ["hotdog", "Sushi"];
let SavePerson = (done)=> {
  p.save((err, data)=> {
    if (err){
      return done(err);
    }
    return done(null, data);
    
  });
};

//create many records with model.create()
var createManyPeople = (arrayOfPeople, done)=> {
    Person.create(arrayOfPeople, (err, data) =>
     err? done(err) : done(null,data));
}

// Using model.find() to search only th name
var findPeopleName=(personName, done)=> {
    Person.find( {name:personName}, (error, found)=>{
        if (error) return console.log(error);
        done(null, found);
    });
}


// model.findOne to get certain food using a callback function
var findCertainFood= (foodFound, done)=> {
Person.findOne({favoriteFoods:'pizza'}, (err, foodFound)=>{
    if (err) return console.log(error);
    done(null, foodFound)
});
};

// find a given Person byId
var findPersonById=(personId, done)=> {
    Person.findById(personId,(err, individual)=> {
        if (err) return console.log(err);
        done(null, individual);
    });
};

//classic update by running Find,Editand save
var findEditThenSave= (personId, done)=> {
    
    Person.findById(personId, (error, person)=> {
        if (error) return console.log(error);
        person.favoriteFoods.push("Hamburger");

        person.save((err, individual)=> {
            if (err) return console.log(err);
            done(null, individual);
        });
    })
}

//find byId and remove
var removeById=(personId, done)=> {
    Person.findByIdAndRemove(personId, (error, personToRemove)=>{
        if (error) return console.log(err);
        done(null,personToRemove);
    });
}
// delete many document
var deletemanyPeople=(done)=> {
    var nameToRemove="John"
    Person.remove({name: nameToRemove}, (error, removalInfo)=>{
        if(error) return console.log(error);
        done(null, removalInfo)
    });
}

//chain search
var queryChain=(done)=>{
    let query = {favoriteFoods:pizza};
    Person.find(query)
          .sort({name:'asc'})
          .limit(2)
          .select({age:0})
          .exec((error, searchResult)=> {
            console.log(searchResult)
        done(error, searchResult);
    });
}
module.exports=router