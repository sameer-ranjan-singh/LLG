const mongoose = require("mongoose")

// Define mongoose schemas

// Schema for User Data
const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  progressId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Progress' }],
  resetProgress: Boolean
});

// Schema for Admin Data
const adminSchema = new mongoose.Schema({
  email:String,
  password:String,
});

// Schema for user's language preferences
const languagePreferenceSchema = new mongoose.Schema({
  language: String, 
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const questionSchema = new mongoose.Schema({
  language: String, // Language identifier
  proficiency: String, // Beginner, Intermediate, Advanced.
  level:String, // level (Gold,Diamond,Ace)
  difficulty: String, // Difficulty level (Easy,Medium,hard)
  question: String, // Exercise question
  correctAnswer: String, // Correct answer
  optionsToChoose: { //choose from the options
    option1: String,
    option2: String
  },
})

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the question
  language: String,
  proficiency: String, // Beginner, Intermediate, Advanced.
  level:String, // level (Gold,Diamond,Ace)
  difficulty: String, // Difficulty level (Easy,Medium,hard)
  solvedQuestionId: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Question' } ]
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Language = mongoose.model('Language', languagePreferenceSchema);
const Progress = mongoose.model('Progress', progressSchema);
const Question = mongoose.model('Questions', questionSchema);


module.exports = {
  User,
  Admin, 
  Progress,
  Question,
  Language
}