const { request } = require("express")
const Template = require("../models/Template")

// add new template to the database
exports.createTemplate = async (req, res) => {
    try {

        const { heading, description, category } = request.body

        if (
            !heading ||
            !description ||
            !category
        ) {
            return res.status(206).json({
                message: "all fields are mandatory",
            });
        }
        const template = await Template.create({
            heading: heading,
            description: description,
            category: category
        });
        return res.status(200).json({ message: 'successfully created template' })

    } catch (error) {
        return res.status(400).json({ message: "error", error })
    }
}

exports.fetchTemplateBasedOnCategroy = async (req, res) => {
    try {
        const category = req.body.category;

        if (!category) {
            return res.status(400).json({ message: "for taking template based on category,category required " });
        }

        const templates = await Template.find({ category: category });
        if (!templates || templates.length === 0) {
            return res.status(404).json({ message: "No templates found for the given category" });
        }
        return res.status(200).json({ templates, "category": category, message: 'success' });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

// Fetch a template by ID
exports.getTemplateById = async (req, res) => {
    try {
        const templateId = req.params.id;

        const template = await Template.findById(templateId);
        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }

        return res.status(200).json({ template ,message:'success' });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};


// Delete a template by ID
exports.deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;

        const deletedTemplate = await Template.findByIdAndDelete(templateId);
        if (!deletedTemplate) {
            return res.status(404).json({ message: "Template not found" });
        }

        return res.status(200).json({ message: "Template deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

// Update a template by ID 
exports.updateTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const { heading, description, category } = req.body;

        const updatedTemplate = await Template.findByIdAndUpdate(templateId, {
            heading: heading,
            description: description,
            category: category
        }, { new: true });

        if (!updatedTemplate) {
            return res.status(404).json({ message: "Template not found" });
        }

        return res.status(200).json({ message: "Template updated successfully", updatedTemplate });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

