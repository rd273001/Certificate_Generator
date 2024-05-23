const express = require( 'express' );
const router = express.Router();
const certificateController = require( '../controllers/certificateController' );

router.get( '/get/:_id', async ( req, res ) => {
  try {
    res.status( 200 ).json( `Root API called...   ID =>  ${ req.params._id }` );
  } catch ( error ) {
    res.status( 500 ).json( { error: `Root API error !!!` } );
  }
} );

// Route for creating a new certificate request
router.post( '/request', certificateController.createRequest );

// Route for retrieving all certificate requests
router.get( '/requests', certificateController.getAllRequests );

// Route for generating a new certificate
router.post( '/create/:_id', certificateController.generateCertificate );

// Route for retrieving all certificates
router.get( '/all', certificateController.getAllCertificates );

module.exports = router;