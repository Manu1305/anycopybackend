const express = require("express");


const router = express.Router();


const {
  signup,
  login,
  updateEmail,
  updatePassword,
  sendCode,
} = require("../controller/userController");
const { generateAdsApi } = require("../controller/urlToAdsController");
const { chatStreaming } = require("../controller/chatController");
const {
  createProject,
  createCollection,
  deleteCollection,
  getProject,
  getCollection,
  updateProject,
  deleteProject,
  updateCollection,
  copyProjects,
  moveProjects,
} = require("../controller/projectController");

const {generateGoogleAds} = require('../controller/createGoogleAds')
const {faceBookAds}=require('../controller/createFacebookAds')
const {generateLandingPage} = require('../controller/createLandingpage')
const {
  createTemplate, fetchTemplateBasedOnCategroy, getTemplateById, updateTemplate, deleteTemplate
}
  = require("../controller/templateController")
const { auth } = require("../midllewir/Auth");
const { upgradPlan } = require("../controller/plansController");

//login and signup

router.post("/api/signup", signup);
router.post("/api/login", login);
router.post("/api/sendcode", sendCode);
router.patch("/api/emailchange", updateEmail);
router.patch("/api/passwordchange", auth, updatePassword);
router.post("/api/urltoads", auth, generateAdsApi);
router.post("/api/upgradplan", upgradPlan);

//AI Writer

router.post("/api/openAI", auth, chatStreaming);
router.get("/", (req, res) => {
  res
    .status(200)
    .send({ success: true, message: "Welcome to AnyCopy Dashboard" });
});

//project and collection

router.post("/api/project", createProject);
router.get("/api/project", getProject);
router.get("/api/project/:id", getProject);
router.put("/api/project/:id", updateProject);
router.post("/api/collection", createCollection);
router.get("/api/collection", getCollection);
router.get("/api/collection/:id", getCollection);
router.delete("/api/project", deleteProject);
router.put("/api/collection/:id", updateCollection);
router.delete("/api/collection/:id", deleteCollection);
router.post("/api/copyProjects", copyProjects);
router.post("/api/moveProjects", moveProjects);
router.post("/api/:name", generateAdsApi);

// template 

router.get("/api/template",fetchTemplateBasedOnCategroy)
router.get("/api/template/:id", getTemplateById)
router.post("api/template", createTemplate)
router.delete('/api/template', deleteTemplate)
router.put('api/template/:id',updateTemplate)


//googleAds

router.get("/api/googleads", generateGoogleAds)
// fbads
router.get("api/facebookads", faceBookAds)
// landingpage
router.get("api/landingpafe", generateLandingPage )
module.exports = router;
