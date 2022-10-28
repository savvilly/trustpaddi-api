import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import router from "./routes"

const app = express();
dotenv.config();
connectDB();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    true: false,
    limit: '50mb',
    extended: true,
  }),
);

app.use(bodyParser.json({ limit: '50mb' }));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
// app.use('/auth', [
//   require('./routes/auth/signup'),
//   require('./routes/auth/signin'),
//   require('./routes/auth/avatar'),
//   require('./routes/auth/getProfile'),
//   require('./routes/auth/updateProfile'),
//   require('./routes/auth/changePassword'),
// ]);

// app.use('user', [require('./services/user/wallet')]);

// app.use('/states', require('./routes/states'));
// app.use('/banks', require('./routes/banks'));

// app.use('/banks', [
//   require('./routes/banks/banks'),
//   require('./routes/banks/addBankAccount'),
//   require('./routes/banks/resolveBankAccount'),
//   require('./routes/banks/removeBankAccount'),
//   require('./routes/banks/userBanks'),
// ]);

// app.use('/ticket', [
//   require('./routes/supportTicket/createSupportTicket'),
//   require('./routes/supportTicket/getSupportTicket'),
//   require('./routes/supportTicket/getSingleTicket'),
//   require('./routes/supportTicket/closeTicket'),
//   require('./routes/supportTicket/deleteTicket'),
// ]);

// app.use('/transaction', [
//   require('./services/transaction/createTransaction'),
//   require('./services/transaction/getTransactions'),
//   require('./services/transaction/getSingleTransaction'),
//   require('./services/transaction/updateTransaction'),
//   require('./services/transaction/approveTransaction'),
//   require('./services/transaction/confirmTransaction'),
//   require('./services/transaction/declineTransaction'),
//   require('./services/transaction/transactionProofOfPayment'),
//   require('./services/transaction/deleteTransaction'),
//   require('./services/transaction/webhook'),
// ]);

// app.use('/product', [
//   require('./routes/product/createProduct'),
//   require('./routes/product/getProducts'),
//   require('./routes/product/getSingleProduct'),
//   require('./routes/product/updateProduct'),
// ]);

// app.use('/order', require('./routes/order'));

//all routes
app.use('/api/v1', router);
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to trustpaddi API',
  });
});

// Error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log(error);
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`));
