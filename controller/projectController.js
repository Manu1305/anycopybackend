const { Mongoose } = require("mongoose");
const Collection = require("../models/Collections");
const Projects = require("../models/Projects");

// exports.createProject = async (req, res) => {
//   try {
//     const { project_name, collection_id, description, audience, key_words, userId } =
//       req.body;

//     if (
//       !project_name ||
//       !collection_id ||
//       !description ||
//       !audience ||
//       !key_words ||
//       !userId
//     ) {
//       return res.status(422).json({
//         success: false,
//         message: "All Fields Are Required",
//       });
//     }

//     const collections = await Collection.findOne({
//       _id: collection_id,
//     }).populate("projects");
//     const isExist = collections.projects.find(
//       (ele) => ele.project_name === project_name
//     );

//     if (isExist) {
//       return res.status(401).json({
//         success: false,
//         message: "Project name already exists. Try a different name.",
//       });
//     }

//     const formattedAudience = audience.map((name) => ({ name }));
//     const formattedKeyWords = key_words.map((name) => ({ name }));

//     const project = await Projects.create({
//       project_name,
//       collection_id,
//       description,
//       audience: formattedAudience,
//       key_words: formattedKeyWords,
//     });

//     const collectionToUpdate = await Collection.findById({
//       _id: collection_id,
//     });
//     collectionToUpdate.projects.push(project);
//     await collectionToUpdate.save();

//     return res.json({
//       success: true,
//       data: project,
//       message: "New project created successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.createProject = async (req, res) => {
  try {
    const { project_name, collection_id, description, audience, key_words, userId } =
      req.body;

    if (!project_name || !collection_id || !description || !audience || !key_words || !userId) {
      return res.status(422).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const collections = await Collection.findOne({ _id: collection_id }).populate("projects");
    if (!collections) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }
    const isExist = collections.projects.find((ele) => ele.project_name === project_name);
    if (isExist) {
      return res.status(401).json({
        success: false,
        message: "Project name already exists. Try a different name.",
      });
    }

    const formattedAudience = audience.map((name) => ({ name }));
    const formattedKeyWords = key_words.map((name) => ({ name }));

  
    const project = await Projects.create({
      project_name,
      collection_id,
      description,
      audience: formattedAudience,
      key_words: formattedKeyWords,
    });

    collections.projects.push(project);
    await collections.save();

    return res.json({
      success: true,
      data: project,
      message: "New project created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};





exports.getProject = async (req, res) => {
  const projectId = req.params.id;
  let project;
  try {
    if (projectId) {
      project = await Projects.findById({ _id: projectId }).catch((err) =>
        console.log(err, "err")
      );
    } else {
      project = await Projects.find();
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { project_name, description, audience, key_words } = req.body;
    // Check if projectId is provided
    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const formattedAudience = audience.map((name) => ({ name }));
    const formattedKeyWords = key_words.map((name) => ({ name }));

    const updatedProject = {
      project_name,
      description,
      audience: formattedAudience,
      key_words: formattedKeyWords,
    };
    // Find the project by ID and update it
    const project = await Projects.findByIdAndUpdate(
      { _id: projectId },
      updatedProject,
      { new: true }
    ).catch((error) => console.log("error", error));
    // Check if the project exists
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.json({
      success: true,
      data: updatedProject,
      message: "updated successfully ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { project_id, collection_id } = req.query;
    const seletedProject = await Projects.findById(project_id);
    const sourceCollection = await Collection.findById(collection_id);
    if (!project_id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    if (!seletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    seletedProject.collection_id.pull(collection_id);
    sourceCollection.projects.pull(project_id);
    await seletedProject.save();
    await sourceCollection.save();

    if (seletedProject.collection_id.length === 0) {
      await Projects.findByIdAndDelete(project_id);
    }

    return res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createCollection = async (req, res) => {
  try {
    const { collection_name } = req.body;

    if (!collection_name) {
      return res.status(422).json({
        success: false,
        message: "Collection name is Required",
      });
    }

    const dbChecking = await Collection.findOne({ collection_name });
    if (dbChecking) {
      return res.status(401).json({
        success: false,
        message: "Collection name already exists. Try a different name.",
      });
    }

    const project = await Collection.create({
      collection_name,
    });

    return res.json({
      success: true,
      data: project,
      message: "New collection_id created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCollection = async (req, res) => {
  const collectionId = req.params.id;
  let collections;
  try {
    if (collectionId) {
      collections = await Collection.findById(collectionId).populate(
        "projects"
      );
    } else {
      collections = await Collection.find().populate("projects");
    }

    if (!collections) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.json({
      success: true,
      data: collections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const { collection_name } = req.body;
    if (!collectionId) {
      return res.status(400).json({
        success: false,
        message: "Collection ID is required",
      });
    }
    const collections = await Collection.findByIdAndUpdate(
      collectionId,
      { collection_name },
      { new: true }
    );
    if (!collections) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.json({
      success: true,
      data: collections,
      message: "Collection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteCollection = async (req, res) => {
  const collectionId = req.params.id;

  await Projects.deleteMany({ collection_id: collectionId });

  await Collection.deleteOne({ _id: collectionId });

  return res.json({
    success: true,
    message: "Collection and associated projects deleted successfully",
  });
};

exports.copyProjects = async (req, res) => {
  try {
    const { collection_id, project_id } = req.body;
    if (!collection_id || !project_id) {
      res.status(401).json({
        success: false,
        message: "project id and collection id required",
      });
    }
    const collections = await Collection.findOne({
      _id: collection_id,
    }).populate("projects");


    const existing_id = await Collection.findOne({ collection: project_id });
    const project = await Projects.findById(project_id);

    if (existing_id) {
      console.log(existing_id.prject_name + "copy");
    }

    const copyData = {
      project_name: existing_id
        ? existing_id.prject_name + "-copy"
        : project.project_name,
      collection_id: collection_id,
      description: project.description,
      audience: project.audience,
      key_words: project.key_words,
    };

    const newData = await Projects.create(copyData);

    collections.projects.push(newData._id);

    await collections.save();
    await project.save();

    res.json({
      success: true,
      message: "Project Duplicated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.moveProjects = async (req, res) => {
  try {
    const { collection_id, project_id } = req.body;

    const project = await Projects.findById(project_id);
    const sourceCollectionId = project.collection_id;
    const sourceCollection = await Collection.findById(sourceCollectionId);
    const destinationCollection = await Collection.findById(collection_id);

    if (!sourceCollection || !destinationCollection || !project) {
      return res.status(404).json({
        success: false,
        message: "One or more entities not found",
      });
    }

    destinationCollection.projects.push(project_id);
    sourceCollection.projects.pull(project_id);
    await Projects.findByIdAndUpdate(
      project_id,
      { collection_id },
      { new: true }
    );
    await project.save();
    await destinationCollection.save();
    await sourceCollection.save();

    return res.json({
      success: true,
      message: "Project Moved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
