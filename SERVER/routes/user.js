const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth")
const { User, Progress, Question, Language } = require("../db/index.js")

const router = express.Router()

// Check: Server Started or Not 
router.get("/", async (req,res) => {
  res.status(200).send({
    message :"Server Started : Render.com / sameer",
  })
})

//User Authorisation
router.get("/me",authenticateJwt , async (req , res) => {
  const user = await User.findOne({_id: req.userId})
  if(user){
    res.json({ username: user.username })
  }else{
    res.status(403).json({message: "User not Logged In"})
  }
  })

// Create Account  
  router.post('/signup', (req, res) => {
    const { username, password, email } = req.body;
    function callback(user) {
      if (user) {
        res.status(403).json({ message: 'User already exists' });
      } else {
        const obj = { username: username, password: password,email: email};
        const newUser = new User(obj);
        newUser.save();
        const token = jwt.sign({ id:newUser._id, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token  });
      }
  
    }
    User.findOne({ username }).then(callback);
  }); 
  
// Login  
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password});
    const progress = await Progress.findOne({}, user._id);
    const progressId = progress._id
    if(user){
      const progressTillNow = await Progress.findById(progressId)
        if(progressTillNow){
          const token = jwt.sign({id:user._id, role: 'user' }, SECRET, { expiresIn: '2h' });
          res.json({ message: 'Logged in successfully', token , user , progressTillNow });
        }else{
          const token = jwt.sign({ id:user._id, role: 'user' }, SECRET, { expiresIn: '2h' });
          res.json({ message: 'Logged in successfully', token , user });
        }
    }
  } catch (error) {
    res.status(403).json({ message: 'Invalid email or password',error });
  }
});

//User Profile : Detail and Progress
router.get("/profile/:userId/:progressId", async (req,res) =>{
try {
  const { userId, progressId } = req.params;
  const user = await User.findById( userId );
  // console.log(user.progressId)
  const progress = await Progress.findById( progressId );
  res.json({ user , progress })
} catch (error) {
  console.error('Error fetching user / progress:', error);
  res.status(500).json({ message: 'Error fetching user / progress' });
}
})

// List of Languages
router.get('/listOfLanguages',authenticateJwt, async (req, res) => {
  try {
    // Fetch a list of available languages
    // const languages = await Language.find({}, 'language');
    const languages = await Language.find({});
    res.json({ languages });
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ message: 'Error fetching languages' });
  }
});

// Select Language You Want to Learn

// router.post('/selectLanguage/:languageId/:userId', authenticateJwt, async (req, res) => {
//   const {languageId, userId} = req.params
router.post('/selectLanguage', authenticateJwt, async (req, res) => {
  const {languageId, userId} = req.body
  try {
    const language = await Language.findById(languageId);
    // userId = parseInt(userId); // Parse userId as a number
    const user = await User.findById(userId);
    // const user = await User.findOne({ username: req.user.username });
    if (language) {
      const userId = user._id
      if (userId) {
        language.userId.push(userId);
        await language.save();
        res.json({ message: 'Language Selected successfully' });
       } else {
        res.status(403).json({ message: 'User not found' });
      }
    }
     else {
      console.log(language)
      res.status(404).json({ message: 'Language not found in DataBase' });
    }

  } catch (error) {
    console.error('Error selecting language:', error);
    res.status(500).json({ message: 'Error selecting language' });
  }
});

//Create User Progress
router.post("/addProgress", authenticateJwt, async (req,res) => {
  const progress = new Progress(req.body);
    await progress.save();
    // const user = await User.findOne(progress._id,)
    res.json({ message: 'New Progress Added', progressId: progress._id });
})

// Fetch exercise questions based on Progress
router.get('/questions/:language/:proficiency/:level/:difficulty', authenticateJwt, async (req, res) => {
  const { language, proficiency, level, difficulty } = req.params; 
  
  try {
    const questions = await Question.find({
      language,
      proficiency,
      level,
      difficulty
    });
   
    res.json({ questions });
  } catch (error) {
    console.error('Error fetching exercise questions:', error);
    res.status(500).json({ message: 'Error fetching exercise questions' });
  }
});


// Update User progress after solving excercise questions
router.put('/updateProgress', authenticateJwt, async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(req.headers.progressId, req.body, { new: true });
    console.log(progress)
    res.json({ message: 'progress updated SUCCESSFULLY', progress });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(404).json({ message: 'progress updation FAILED' });
  }
});


module.exports = router





// GET ALL PUBLISHED COURSES
  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
  });

// BUY SINGLE COURSE  
  router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      console.log(course)
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
// GET ALL USER PURCHASHED COURSES  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

// GET SINGLE COURSE DETAILS   
  router.get("/course/:courseId",authenticateJwt, async (req,res)=>{
    const courseId = req.params.courseId ;
    const course = await Course.findById(courseId)
    const user = await User.findOne({ username: req.user.username })
    const alreadyPurchased = user.purchasedCourses.filter( (ObjectId) =>{
      if(ObjectId == courseId){
        return courseId
      }
    })
    console.log(alreadyPurchased)
    res.json({course,alreadyPurchased})
  })

