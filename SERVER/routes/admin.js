const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth")
const { Admin , Question, Language ,User} = require("../db/index.js")

const router = express.Router()

// Check: Server Started or Not 
router.get("/", async (req,res) => {
  res.status(200).send({
    message :"Server Started : Render.com / sameer",
  })
})

//Admin Authorisation
router.get("/me",authenticateJwt , (req , res) => {
    res.json({
      username: req.user.username 
    })
  })

// Create Account  
router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: 'Admin account already exists' });
    } else {
      const obj = { email: email, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ email, role: 'admin' }, SECRET, { expiresIn: '4h' });
      res.json({ message: 'Admin account created successfully', token });
    }
  }
  Admin.findOne({ email }).then(callback);
}); 

// Login  
router.post('/login', async (req, res) => {
  const { email, password } = req.headers;
  const admin = await Admin.findOne({ email, password });
  if (admin) {
    const token = jwt.sign({ email, role: 'admin' }, SECRET, { expiresIn: '4h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

//List of Users 
router.get("/allUser", async (req,res)=> {
const users = await User.find({})
res.json({users})
})

//ADD Language
router.post("/addLanguage", authenticateJwt, async (req,res) => {
  const language = new Language(req.body);
    await language.save();
    res.json({ message: 'New Language Added', languageId: language._id });
})

// GET ALL Questions
router.get('/questions', authenticateJwt, async (req, res) => {
  const questions = await Question.find({});
  console.log(questions)
  res.json({ questions });
});


// ADD Questions  
  router.post('/addQuestion', authenticateJwt, async (req, res) => {
    const question = new Question(req.body);
    await question.save();
    res.json({ message: 'New Question Added', questionId: question._id });
  });
  
// Select one Question   
  router.get("/question/:questionId",authenticateJwt, async (req,res)=>{
    const questionId = req.params.questionId ;
    const question = await Question.findById(questionId)
    res.json({question})
  })

// EDIT Question
  router.put('/questions/:questionId', authenticateJwt, async (req, res) => {
    const question = await Question.findByIdAndUpdate(req.params.questionId, req.body, { new: true });
    if (question) {
      res.json({ message: 'question updated successfully' });
    } else {
      res.status(404).json({ message: 'question not found' });
    }
  });

// DELETE  Question
router.delete("/questions/:questionId", authenticateJwt, async (req,res) => {
  const questionId = req.params.questionId ;
  const deletedQuestion = await Question.findByIdAndDelete(questionId, req.body, { new: true })
  console.log(deletedQuestion)
   try{
     if(!deletedQuestion){
       res.status(404).json({message:"question not found"})
      }
      res.json({message:"Question deleted successfully",deletedQuestion})
   }catch(error){
    res.status(500).json({ message: 'Error deleting question', error: error.message });
   }
})


module.exports = router