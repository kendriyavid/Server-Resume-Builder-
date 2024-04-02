const rTempmodel = require('./../models/ResumeTemplateModel');

const handleTemplates = async (req, res) => {
    console.log("herer")
    const reftoken = req.cookies.jwt;
    if (!reftoken){
        return res.json({"message":"no user found"})
    }
    try {
        // Find all documents in ResumeTemplateModel
        const templates = await rTempmodel.find({});
        // Return the documents as JSON response
        return res.json(templates);
    } catch (error) {
        console.error("Error while fetching templates:", error);
        // Return error response
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const handleTemplatesaddition = async (req, res) => {
    console.log("here")
    try {
        // Extract template data from the request body
        const { name, image } = req.body;

        // Create a new template instance
        const newTemplate = new rTempmodel({
            name: name,
            image: image
        });

        // Save the new template to the database
        const savedTemplate = await newTemplate.save();

        // Send the saved template as a JSON response
        res.status(201).json(savedTemplate);
    } catch (error) {
        console.error('Error adding template:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { handleTemplates,handleTemplatesaddition };
