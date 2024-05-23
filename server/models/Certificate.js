const mongoose = require( 'mongoose' );

// Define the schema for the certificate request data
const certificateSchema = new mongoose.Schema( {
  name: {
    type: String,
    required: () => this.status === 'pending',
  },
  course: {
    type: String,
    required: () => this.status === 'pending',
  },
  email: {
    type: String,
    required: () => this.status === 'pending',
  },
  approvalDate: {
    type: Date,
    required: () => this.status === 'approved',
  },
  certificateLink: {
    type: String,
    required: () => this.status === 'approved'
  },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
} );

// Create the CertificateRequest model
const Certificate = mongoose.model( 'Certificate', certificateSchema );

module.exports = Certificate;