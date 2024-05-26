const { PDFDocument, cmyk, StandardFonts } = require( 'pdf-lib' );
const fontkit = require( '@pdf-lib/fontkit' );
const fs = require( 'fs' );
const { google } = require( 'googleapis' );
const { formattedDate } = require( './formattedDate' );
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
    const page = pdfDoc.getPage( 0 );
    
    // Get the width and height of the first page
    const { width, height } = page.getSize();

    pdfDoc.registerFontkit( fontkit );
    const font1Url = 'https://www.1001fonts.com/download/font/vollkorn.semibold.ttf';
    const font1Bytes = await fetch( font1Url ).then( res => res.arrayBuffer() );
    const font1 = await pdfDoc.embedFont( font1Bytes );
    const font2Url = 'https://www.1001fonts.com/download/font/roboto.medium.ttf';
    const font2Bytes = await fetch( font2Url ).then( res => res.arrayBuffer() );
    const font2 = await pdfDoc.embedFont( font2Bytes );
    const text1 = name;
    const text2 = `For successfully completing the ${ course }`;
    const text3 = `course on ${ formattedDate( approvalDate ) }.`;
    const widthOfText1 = font1.widthOfTextAtSize( text1, 44 );
    const widthOfText2 = font2.widthOfTextAtSize( text2, 18 );
    const widthOfText3 = font2.widthOfTextAtSize( text3, 18 );

    page.moveTo( ( width / 2 ) - ( widthOfText1 / 2 ), height / 1.61 );
    page.drawText( `${ name }`, { size: 44, color: cmyk( 0.00, 0.28, 0.89, 0.11 ), font: font1 } );
    page.moveTo( ( width / 2 ) - ( widthOfText2 / 2 ), height / 1.61 - 43.1 );
    page.drawText( text2, { size: 17.8, font: font2 } );
    page.moveTo( ( width / 2 ) - ( widthOfText3 / 2 ), height / 1.61 - ( 44 + 17.8 + 10 ) );
    page.drawText( text3, { size: 17.8, font: font2 } );

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