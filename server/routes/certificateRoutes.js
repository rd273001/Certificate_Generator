const express = require( 'express' );
const router = express.Router();
const certificateControllers = require( '../controllers/certificateControllers' );

router.get( '/get/:_id', async ( req, res ) => {
  try {
    res.status( 200 ).json( `Root API called...   ID =>  ${ req.params._id }` );
  } catch ( error ) {
    res.status( 500 ).json( { error: `Root API error !!!` } );
  }
} );

// Route for creating a new certificate request
router.post( '/request', certificateControllers.createCertificateRequest );

// Route for retrieving all certificate requests
router.get( '/requests', certificateControllers.getAllRequests );

// Route for generating a new certificate(updating the pending Certificate Request)
router.put( '/create/:_id', certificateControllers.generateCertificate );

// Route for retrieving all certificates
router.get( '/all', certificateControllers.getAllCertificates );

// Route for rejecting a certificate
router.delete( '/reject/:_id', certificateControllers.rejectCertificateRequest );

module.exports = router;