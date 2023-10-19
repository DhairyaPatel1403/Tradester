const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const MongoClient = require('mongodb').MongoClient;
const Razorpay = require("razorpay");


const app = express();


app.use(cors()); 
app.use(express.json());

const port = 3002;

// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://dhairya1403:4yNPtztK9IBjIw9l@cluster0.aebzonc.mongodb.net/test',
    {
      useNewUrlParser: true,    
      useUnifiedTopology: true,
    }
  );

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    pan: String,
    createdAt: { type: Date, default: Date.now },
    stockHolding: [
      {
        name: String,
        amount: Number,
        bought_price: Number,
      },
    ],
    account:Number,
    stock_bought: [
      {
          name: String,
          date: { type: Date, default: Date.now },
      },
  ],
});

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountType: String,
  accountAmount: Number, 
  stocks: [
    {
      stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
      quantity: Number,
    },
  ],
});

const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
  bought: Boolean,
  bought_price: Number,
  prices: [Number],
  revenue: String,
  type: String,
});

const User = mongoose.model('User', UserSchema,);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema,);
const Stock = mongoose.model('Stock', stockSchema,);


app.all('/signup', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const pan = req.body.pan;

    console.log("name", name);

    if(name && email && password && pan){
            // Create a new user and save it to the database
      const user = new User({
        name,
        email,
        password,
        pan,
        stockHolding: [], // Empty array
        account: 50, // You can set the account value as needed
      });

      const newUser = await user.save();

      if(!user){
        return res.status(422).json({ error: "Invalid input"})
      }

      res.status(200).send(user);

    }
    else{
      return res.status(422).json({error:"Please enter all fields."})
    }


      

  } catch (error) {
    // Handling errors and sending an error response
    res.status(500).json({ message: 'Error registering user' });
  }
});



app.all('/signin', async (req, res) => {



});



app.all('/stock-det/:id', async (req, res) => {
  try {
    const stockId = req.params.id;
    // Fetch the stock data by ID from your MongoDB and populate it as needed
    const stockData = await Stock.findOne({ name: stockId });

    if (!stockData) { 
      return res.status(404).json({ message: 'Stock not found' });
    }

    // Return the stock data as JSON
    res.status(200).send(stockData);

    console.log(stockData.name)
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ message: 'Error fetching stock data' });
  }
});


app.all('/buy', async(req, res) => {
  try {
    const { stockName, amountstock, nameofuser } = req.body; // Assuming you have a field named "stockName" in the request body

    const parsedAmountStock = parseInt(amountstock, 10);

    // Find the user document with name "demo9"
    const user = await User.findOne({ name: nameofuser });
   

    

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the stockName already exists in the user's stockHolding
    const existingStock = user.stockHolding.find((stock) => stock.name === stockName);

    const stock = await Stock.findOne({ name: stockName });

    const boughtPrice = stock.price; 


    if(user.account - boughtPrice > 0){

        if (existingStock) {

          existingStock.bought_price = boughtPrice;

          user.account -= (boughtPrice * parsedAmountStock);

          // If the stock already exists, increment the amount
          existingStock.amount += parsedAmountStock;


        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Stock updated successfully', user });

        }
        else{
            // If the stock doesn't exist, add a new object to stockHolding
            user.stockHolding.push({ name: stockName, amount: parsedAmountStock, bought_price: stock.bought_price });
            user.account -= (stock.bought_price * parsedAmountStock);


            const boughtStock = user.stock_bought.find((stock) => stock.name === stockName);

            if (!boughtStock) {
              user.stock_bought.push({ name: stockName, date: new Date() });
            }


            await user.save();
            res.status(200).json({ message: 'Stock updated successfully', user });
        }

    }
    else{
        res.status(200).json({ message: 'You dont have enough money.' });
    }
   }
    catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Error updating stock' });
    }
});




app.all('/sell', async(req, res) => {
  try {
    const { stockName, amountstock, nameofuser } = req.body; // Assuming you have a field named "stockName" in the request body

    const parsedAmountStock = parseInt(amountstock, 10);

    // Find the user document with name "demo9"
    const user = await User.findOne({ name: nameofuser });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the stockName already exists in the user's stockHolding
    const existingStock = user.stockHolding.find((stock) => stock.name === stockName);

    if(existingStock){
      const stock = await Stock.findOne({ name: stockName });

      if (existingStock.amount - parsedAmountStock > 0) {
        
        existingStock.amount -= parsedAmountStock;

      } else {

        user.stockHolding = user.stockHolding.filter((stock) => stock.name !== stockName);

      }

      user.account += (stock.price * parsedAmountStock);

      // Save the updated user document
      await user.save();

      res.status(200).json({ message: 'Stock updated successfully', user });
  }

    else{
      res.status(500).json({ message: 'Cant sell a stock not bought' });
    }
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Error updating stock' });
  }
});


app.all('/wallet', async (req, res) => {

  const { nameofuser } = req.query;

  console.log("Name of user", nameofuser)

  try {
    // Find the user document with the name "demo9"
    const user = await User.findOne({ name: nameofuser });

    if (!user) {
      console.log("User not found")
      return res.status(404).json({ message: 'User not found' });
    }
    else{
      console.log("User found")
    }

    // Extract the stockHolding array and account from the user document
    const { stockHolding, account } = user;

    var totalValue = 0;

    for (const stock of stockHolding) {
      // Assuming each stock object has "amount" and "bought_price" fields
      totalValue += stock.amount * stock.bought_price;
    }

    console.log("Account of user", account)

    // Return stockHolding, account, and totalValue
    res.status(200).json({ stockHolding, account, totalValue });

  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({ message: 'Error fetching wallet' });
  }
});


app.all('/add-money', async (req, res) => {

  const { amount, nameofuser } = req.body;

  try {
    // Find the user document with the name "demo9"
    const user = await User.findOne({ name: nameofuser });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    // Ensure that the amount is a positive number
    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Add the amount to the user's account
    user.account += amount;

    // Save the updated user document
    await user.save();

    // Return a success response
    res.status(200).json({ message: 'Amount added to the account successfully', user });
  } catch (error) {
    console.error('Error adding money to account:', error);
    res.status(500).json({ message: 'Error adding money to account' });
  }
});




app.all("/transaction", async (req, res) => {
  try {
      const instance = new Razorpay({ 
          key_id: 'rzp_test_YqgJwLsBFWMQup',
          key_secret: 'cggXVySBsCsf9nleqJismoMm',
      });

      const { amountNumber, nameofuser } = req.body; 


      const options = {
          amount: (amountNumber*100), // amount in smallest currency unit
          currency: "INR",
          receipt: "receipt_order_74394",
      }; 

      const order = await instance.orders.create(options);

          const user = await User.findOne({ name: nameofuser });

          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }


          // Add the amount to the user's account
          user.account += amountNumber;

          // Save the updated user document
          await user.save();


      res.json(order);
  } catch (error) {
      res.status(500).send(error);
  }
});



app.all('/getprices', async (req, res) => {

  const { id } = req.body;

  try {
  
    // Find the stock document by name
    const stock = await Stock.findOne({ name: id });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    // Return the prices array from the stock document
    res.status(200).json({ prices: stock.prices });
  } 

  catch (error) {
    console.error('Error fetching stock prices:', error);
    res.status(500).json({ message: 'Error fetching stock prices' });
  }
});



app.all('/getallstock', async (req, res) => {
  try {
    // Use Mongoose to find all stock records in the collection
    const allStock = await Stock.find({});

    // Send the list of stock as a JSON response
    res.status(200).json(allStock);
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ message: 'Error fetching stock' });
  }
});



app.all('/history', async (req, res) => {
  try {
    const { nameofuser } = req.query;

    const user = await User.findOne({ name: nameofuser });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stockBought = user.stock_bought;

    console.log("from history", nameofuser)


    res.status(200).json({ stockBought });
  } catch (error) {
    console.error('Error fetching stock history:', error);
    res.status(500).json({ message: 'Error fetching stock history' });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
