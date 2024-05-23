const mongoose = require( 'mongoose' );

// Define the schema for the certificate data
const certificateSchema = new mongoose.Schema( {
  name: { type: String, required: true },
  course: { type: String, required: true },
  approvalDate: { type: Date, required: true },
  email: { type: String, required: true },
  certificateLink: { type: String, required: true }
} );

// Create the Certificate model
const Certificate = mongoose.model( 'Certificate', certificateSchema );

module.exports = Certificate;