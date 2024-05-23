const { PDFDocument, rgb } = require( 'pdf-lib' );
const fs = require( 'fs' );
const { google } = require( 'googleapis' );
require( 'dotenv' ).config();

// Configure the Google Drive API credentials
// console.log( 'Private KEY  =>  ', process.env.GOOGLE_PRIVATE_KEY.replace( /\\n/g, '\n' ) );
const auth = new google.auth.GoogleAuth( {
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/drive']
} );

// Function to generate the certificate PDF
exports.generateCertificate = async ( name, course, approvalDate ) => {
  try {
    // Read the certificate template
    const templateBytes = fs.readFileSync( 'Certificate_Template.pdf' );

    // Create a new PDF document
    const pdfDoc = await PDFDocument.load( templateBytes );
    // Get the content of certificate template PDF
    const page = pdfDoc.getPage(0);

    page.drawText( `${ name }`, { x: 500, y: 3000, size: 35, color: rgb( 0.255, 0.189, 0.69 ) } );
    page.drawText( `\nFor successfully completing the ${ course }\ncourse on ${ approvalDate }.`, { x: 500, y: 3000, size: 12 } );

    // Change font size and color for the name
    // page.drawText( name, {
    //   x: 100,
    //   y: 500 - nameIndex * 12, // Adjust Y position based on the position of the name
    //   size: 30, // Font size
    // //   color: rgb( 255, 189, 69 ), // Mustard yellow color
    // } );

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync( 'Certificate.pdf', modifiedPdfBytes );

    // Create an authorized client
    const drive = google.drive( { version: 'v3', auth } );
    
    const fileMetadata = {
      name: `${ name }_${ course }_Certificate.pdf`,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };
    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream( 'Certificate.pdf' )
    };
    
    // Upload the certificate PDF to Google Drive
    const file = await drive.files.create( {
      requestBody: fileMetadata,
      media: media,
      fields: 'id'
    } );
    console.log( 'Google Drive Response  => ', file.data );

    // Get the link to the uploaded file
    const certificateLink = `https://drive.google.com/file/d/${ file.data.id }/view`;

    return certificateLink;
  } catch ( error ) {
    console.error( 'Error generating certificate:', error );
    throw error;
  }
};