const express = require('express');
const morgan = require('morgan');

const app = express();

// Use Morgan middleware with the 'dev' option for concise output
app.use(morgan('dev'));

//Middleware



//Route

//1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    res.send(`<h1>Hello there, ${req.params.username}</h1>`);
});

//2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    let number = req.params.number;
    
        if(!isNaN(number)){
        res.send(`<h1>You rolled a ${req.params.number}.</h1>`);
        }else{
            res.send(`<h1>You must specify a number.</h1>`);
        };
    });

//3. I Want THAT One!
app.get('/collectibles/:index', (req, res) => {

    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
      ];

      if (req.params.index === "0") {
        res.send(`<h1>So, you want the ${collectibles[0].name}? For ${collectibles[0].price}, it can be yours!</h1>`);
      }else if (req.params.index === "1") {
        res.send(`<h1>So, you want the ${collectibles[1].name}? For ${collectibles[1].price}, it can be yours!</h1>`);
      }else if (req.params.index === "2") {
        res.send(`<h1>So, you want the ${collectibles[2].name}? For ${collectibles[2].price}, it can be yours!</h1>`);
      }else{
        res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
      }
      
});

//4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
    let i
    const minPrice = req.query.minprice;
    const maxPrice = req.query.maxprice;
    const type = req.query.type;
    const minPriceArray =[];
    const maxPriceArray =[];
    const typeArray =[];
    const listArray =[];

    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];
  
    if (minPrice !== undefined) {
        i=0
        console.log("1");
        
        shoes.forEach(shoe => {
            if (shoe.price >= minPrice) {
                minPriceArray[i] = (`<li>${shoe.name} - ${shoe.price} - ${shoe.type}</li>`);
            }
            i++
        });
        res.send(`<h1>list of shoes with price less then ${minPrice}</h1><ul>${minPriceArray}</ul>`);
    }else if (maxPrice !== undefined) {
        i=0
        shoes.forEach(shoe => {
            if (shoe.price <= maxPrice) {
                maxPriceArray[i] = (`<li>${shoe.name} - ${shoe.price} - ${shoe.type}</li>`);
            }
            i++
        });
        res.send(`<h1>list of shoes with price grater then ${maxPrice}</h1><ul>${maxPriceArray}</ul>`);
    }else if (type !== undefined) {
        i=0
        shoes.forEach(shoe => {
            if (shoe.type === type) {
                typeArray[i] = (`<li>${shoe.name} - ${shoe.price} - ${shoe.type}</li>`);
            }
            i++
        });
        res.send(`<h1>${type}</h1><ul>${typeArray}</ul>`);
    }else{
        i=0
        shoes.forEach(shoe => {
                listArray[i] = (`<li>${shoe.name} - ${shoe.price} - ${shoe.type}</li>`);
            i++
        });
        res.send(`<h1>list of shoes</h1><br><ul>${listArray}</ul>`);
    }

});


app.listen(3000, () => {
    console.log('Listening on port 3000')
})