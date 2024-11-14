// const Candidate = require('../models/Candidate');
// const xlsx = require('xlsx');
// const async = require('async');


// exports.uploadCandidates = async (req, res) => {
//     try {
//         if (!req.file) return res.status(400).send('No file uploaded.');

//         // Process the file (e.g., read and parse Excel)
//         // Insert records into MongoDB here...

//         res.send('File processed successfully');
//     } catch (error) {
//         console.error(error); // Log the error
//         res.status(500).send('Server error');
//     }
// };

const xlsx = require('xlsx');
const Candidate = require('../models/Candidate');
const fs = require('fs');

exports.uploadCandidates = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send('No file uploaded.');

        // Read and parse the Excel file
        const workbook = xlsx.readFile(file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const records = xlsx.utils.sheet_to_json(sheet);

        // Process each record sequentially
        for (const record of records) {
            const { name, email, phone, position } = record;

            // Check if a candidate with the same email already exists
            const existingCandidate = await Candidate.findOne({ email });
            if (!existingCandidate) {
                await Candidate.create({ name, email, phone, position });
            }
        }

        // Delete the uploaded file after processing (optional)
        fs.unlinkSync(file.path);

        res.send('File processed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error while processing records');
    }
};
