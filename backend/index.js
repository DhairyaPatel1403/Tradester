const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

app.use(cors()); 
app.use(express.json());

const port = 3002;

// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://dhairya1403:4yNPtztK9IBjIw9l@cluster0.aebzonc.mongodb.net/?retryWrites=true&w=majority',
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

const User = mongoose.model('User', UserSchema,);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);


app.all('/signup', async (req, res) => {
  try {
    const { name, email, password, pan } = req.body;
    const user = new User({ name, email, password, pan });
    const userfind = await User.findOne({ email });
    const initialAmount = 100;



    if(userfind){
        res.status(409).json({ message: 'Error registering user or user already registered.' });
    }
    else{

      const newUser = await user.save();

        const portfolio = new Portfolio({
            user: newUser._id,
            accountType: 'Standard',
            pan,                   // Save PAN number
            accountAmount: initialAmount, // Save initial account amount
            stocks: [],
        } );

        await portfolio.save();

      
        
        res.status(201).json({ message: 'User registered successfully' });
        res.redirect('/');
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.all('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Sign in successful' });
      res.redirect('/');
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error signing in' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
