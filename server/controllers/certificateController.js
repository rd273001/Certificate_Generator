const Certificate = require( '../models/Certificate' );
const certificateGenerator = require( '../utils/certificateGenerator' );

// Controller for creating a new certificate request
exports.createRequest = async ( req, res ) => {
  try {
    const { name, course, email } = req.body;

    const request = new Certificate( {
      name,
      course,
      email,
    } );

    await request.save();

    res.status( 201 ).json( 'Certificate request submitted successfully.' );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to submit certificate request!' } );
  }
};

// Controller for retrieving all certificate requests whose status are 'pending'
exports.getAllRequests = async ( req, res ) => {
  try {
    const requests = await Certificate.find( { status: 'pending' } );
    res.status( 200 ).json( requests );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to retrieve certificate requests!' } );
  }
};

// Controller for approving and generating the certificate requested by User
exports.generateCertificate = async ( req, res ) => {
  try {
    const _id = req.params._id;
    const { name, course, email, approvalDate } = req.body;

    // Find the existing certificate
    const existingCertificate = await Certificate.findById( _id );
    if ( !existingCertificate ) {
      return res.status( 404 ).json( { error: 'Certificate not found!' } );
    }

    // Check if the name, course, or email matches the existing values
    if ( name !== existingCertificate.name || course !== existingCertificate.course || email !== existingCertificate.email ) {
      return res.status( 400 ).json( { error: 'Name, course, or email do not match the existing certificate details!' } );
    }

    // Generate the certificate PDF
    const certificateLink = await certificateGenerator.generateCertificate( name, course, approvalDate );

    // Update the existing certificate document with status 'approved'
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      _id,
      { approvalDate, certificateLink, status: 'approved' },
      { new: true }  // returns updated document
    );
    if ( !updatedCertificate ) {
      return res.status( 404 ).json( { error: 'Failed to update certificate!' } );
    }

    res.status( 201 ).json( 'Certificate generated successfully.' );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to create certificate!' } );
  }
};

// Controller for retrieving all certificates whose status are 'approved'
exports.getAllCertificates = async ( req, res ) => {
  try {
    const certificates = await Certificate.find( { status: 'approved' } );
    res.status( 200 ).json( certificates );
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Failed to retrieve certificates!' } );
  }
};