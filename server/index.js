const express = require( 'express' ); 7
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
const certificateRoutes = require( './routes/certificateRoutes' );
const chalk = require( 'chalk' );
require( 'dotenv' ).config();

const app = express();
const PORT = process.env.PORT || 5000;
const log = console.log;

// console.log( 'ENV variables  => ', process.env.GOOGLE_CLIENT_EMAIL );

// Connection to MongoDB
mongoose.connect( process.env.MONGODB_URI )
  .then( () => log( chalk.greenBright.bold( 'MongoDB connected successfully... 🎉' ) ) )
  .catch( error => console.error( 'MongoDB connection error : ', error ) );

// Middleware
app.use( cors() );
app.use( express.json() );

// Routes
app.use( '/api/certificates', certificateRoutes );

// Start the server
app.listen( PORT, () => {
  log( chalk.greenBright.bold( `Server started running... 🛜` ) );
} );