const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;

//use express static folder
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  try {
    console.log(`Server is running ${port}`);
    mongoose.connect(
      "mongodb+srv://travelconnectmain:travelconnectmain123@cluster0.us7bgtd.mongodb.net/dbTravelconnect"
    );
    console.log("db connection established");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});

//AdminSchema

const adminSchemaStructure = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});
const Admin = mongoose.model("adminSchema", adminSchemaStructure);

//AdminPost

app.post("/Admin", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    let admin = await Admin.findOne({ adminEmail });

    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Admin already exists" }] });
    }

    admin = new Admin({
      adminName,
      adminEmail,
      adminPassword,
    });

    await admin.save();

    res.json({ message: "Admin inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Admin Select or Find

app.get("/Admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    } else {
      res.send(admin).status(200);
    }
  } catch (err) {
    console.error("Error Finding Admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Admin Delete

app.delete("/Admin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    } else {
      res.json({ message: "Admin deleted successfully", deletedAdmin });
    }
  } catch (err) {
    console.error("Error deleting Admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/Admin", (req, res) => {
  res.send({ msg: "hello " });
});

//DistrictSchema
const districtSchemaStructure = new mongoose.Schema({
  distName: {
    type: String,
    required: true,
  },
});

const District = mongoose.model("districtSchema", districtSchemaStructure);

//DistrictPost
app.post("/district", async (req, res) => {
  try {
    const { distName } = req.body;

    let district = await District.findOne({ distName });
    if (district) {
      return res
        .status(400)
        .json({ errors: [{ msg: "District already exists" }] });
    }

    district = new District({
      distName,
    });
    await district.save();
    res.json({ message: "District Added successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//District Find

app.get("/district", async (req, res) => {
  try {
    const districts = await District.find();
    if (!districts) {
      res.send({ msg: "No Data" });
    } else {
      res.send(districts).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Find District By Id

app.get("/district/:id", async (req, res) => {
  try {
    const districtId = req.params.id;
    const district = await District.findById(districtId);
    if (!district) {
      res.send("No Data With This ID");
    } else {
      res.send(district).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//District Delete

app.delete("/district/:id", async (req, res) => {
  try {
    const districtId = req.params.id;
    const deletedDist = await District.findByIdAndDelete(districtId);
    if (!deletedDist) {
      return res.status(404).json({ message: "District not found" });
    } else {
      res.json({ message: "District deleted successfully", deletedDist });
    }
  } catch (err) {
    console.error("Error deleting District:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//PlaceSchema
const placeSchemaStructure = new mongoose.Schema({
  placeDistName: {
    type: String,
    reuqired: true,
  },
  placeName: {
    type: String,
    required: true,
  },
});

const Place = mongoose.model("placeSchema", placeSchemaStructure);

//PlacePost

app.post("/place", async (req, res) => {
  try {
    const { placeDistName, placeName } = req.body;
    let place = await Place.findOne({ placeName });
    if (place) {
      return res.status(400).json({ msg: "Place Already exists" });
    }
    place = new Place({
      placeDistName,
      placeName,
    });
    await place.save();
    res.json({ msg: "Place Added" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Place Find

app.get("/place", async (req, res) => {
  try {
    const place = await Place.find();
    if (!place) {
      res.send({ msg: "No Data" });
    } else {
      res.send(place).status(200);
    }
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//Place Find By ID

app.get("/place/:id", async (req, res) => {
  try {
    const placeId = req.params.id;
    const place = await Place.findById(placeId);
    if (!place) {
      res.send("No Data With This ID");
    } else {
      res.send(place);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//place Delete

app.delete("/place/:id", async (req, res) => {
  try {
    const placeId = req.params.id;
    const deletedPlace = await Place.findByIdAndDelete(placeId);
    if (!deletedPlace) {
      return res.status(404).json({ message: "Place not found" });
    } else {
      res.json({ message: "Place deleted successfully", deletedPlace });
    }
  } catch (err) {
    console.error("Error Deleting Place", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//userSchema

const userSchemaStructre = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userContact: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "placeSchema",
  },
  userPhoto: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  userGender: {
    type: String,
  },
  userStatus: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchemaStructre);

//userPost

app.post("/user", async (req, res) => {
  try {
    const {
      userName,
      userContact,
      userEmail,
      userPassword,
      userPhoto,
      placeId,
      userType,
      userGender,
    } = req.body;
    let user = await User.findOne({ $or: [{ userName }, { userEmail }] });
    if (user) {
      return res
        .status(400)
        .json({ msg: " There is already an Account With These credentials" });
    }
    user = new User({
      userName,
      userContact,
      userEmail,
      userPassword,
      userPhoto,
      placeId,
      userType,
      userGender,
    });
    await user.save();
    res.json({ msg: "User Added" });
  } catch (err) {
    console.log(err.msg);
    res.status(500).json({ msg: "Server error" });
  }
});

//User Find

app.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.send({ msg: "No Data" });
    } else {
      res.send(user).status(200);
    }
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//user Find BY Id

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.send({ msg: "No Data with this ID" });
    } else {
      res.send(user).status(200);
    }
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//User Delete

app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully", deletedUser });
    }
  } catch (err) {
    console.error("Error Deleting User", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//PostsSchema

const postSchemaStructure = new mongoose.Schema({
  postCaption: {
    type: String,
    required: true,
  },
  postFile: {
    type: String,
    required: true,
  },
  postDateTime: {
    type: String,
    default: () => moment().tz("Asia/Kolkata").format(), // Use the timezone "Asia/Kolkata" for IST
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

postSchemaStructure.pre("save", function (next) {
  this.doj = moment(this.doj).tz("Asia/Kolkata").format();
  next();
});

const Post = mongoose.model("postschema", postSchemaStructure);

//AddPost

app.post("/addpost", async (req, res) => {
  try {
    const { postCaption, postFile, userId } = req.body;
    const post = new Post({
      postCaption,
      postFile,
      userId,
    });
    await post.save();
    res.json("Post Added");
  } catch (err) {
    console.log(err.msg);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Post Find

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      res.send({ msg: "No Data" });
    } else {
      res.send(posts).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Post Find By Id

app.get("/posts/:id", async (req, res) => {
  try {
    const postId=req.params.id;
    const posts = await Post.findById(postId);
    if (!posts) {
      res.send({ msg: "No Data with this ID" });
    } else {
      res.send(posts).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Post Delete

app.delete("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      res.json({ message: "Post deleted successfully", deletedPost });
    }
  } catch (err) {
    console.error("Error Deleting Post", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//commentSchema

const commentSchemaStructure = new mongoose.Schema({
  commentContent: {
    type: String,
    required: true,
  },
  commentDateTime: {
    type: Date,
    default: Date.now,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postschema",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Comment = mongoose.model("commentschema", commentSchemaStructure);

//addComment

app.post("/addcomment", async (req, res) => {
  try {
    const { commentContent, postId, userId } = req.body;
    const comment = new Comment({
      commentContent,
      postId,
      userId,
    });
    await comment.save();
    res.json({ msg: "Comment Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//commentFind

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) {
      res.send({ msg: "no data" });
    } else {
      res.send(comments).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//commentFind by ID

app.get("/comments/:id", async (req, res) => {
  try {
    const commentId=req.params.id;
    const comments = await Comment.findById(commentId);
    if (!comments) {
      res.send({ msg: "no data with this ID" });
    } else {
      res.send(comments).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});
//Comment Delete

app.delete("/comments/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    } else {
      res.json({ message: "Comment deleted successfully", deletedComment });
    }
  } catch (err) {
    console.error("Error Deleting Comment", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//likeSchema

const likeSchemaStructure = new mongoose.Schema({
  likeDateTime: {
    type: String,
    default: () => moment().tz("Asia/Kolkata").format(),
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postschema",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

likeSchemaStructure.pre("save", function (next) {
  this.doj = moment(this.doj).tz("Asia/Kolkata").format();
  next();
});
const Like = mongoose.model("likeschema", likeSchemaStructure);

//addLike

app.post("/like", async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const like = new Like({
      postId,
      userId,
    });
    await like.save();
    res.json({ msg: "Like Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Like Delete

app.delete("/like/:id", async (req, res) => {
  try {
    const likeId = req.params.id;
    const deletedLike = await Like.findByIdAndDelete(likeId);
    if (!deletedLike) {
      return res.status(404).json({ message: "No Like" });
    } else {
      res.json({ message: "Like deleted successfully", deletedLike });
    }
  } catch (err) {
    console.error("Error Deleting Like", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Report Schema

const reportSchemaStructure = new mongoose.Schema({
  reportTitle: {
    type: String,
    required: true,
  },
  reportDetails: {
    type: String,
    reuqired: true,
  },
  reportReply: {
    type: String,
    reuqired: true,
  },
  reportStatus: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Report = mongoose.model("reportSchema", reportSchemaStructure);

//reportUser

app.post("/addreport", async (req, res) => {
  try {
    const { reportTitle, reportDetails, reportReply, reportStatus, userId } =
      req.body;
    const report = new Report({
      reportTitle,
      reportDetails,
      reportReply,
      reportStatus,
      userId,
    });

    await report.save();
    res.json({ msg: "user Reported" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//report Find

app.get('/reports',async (req,res)=>{
  try{
    const reports= await Report.find();
    if(!reports){
      res.send("No Data")
     } else{
        res.send(reports).status(200)
      }
    
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
})

//report Find by Id

app.get('/reports/:id',async (req,res)=>{
  try{
    const reportId=req.params.id;
    const reports= await Report.findById(reportId);
    if(!reports){
      res.send("No Data with this ID")
     } else{
        res.send(reports).status(200)
      }
    
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
})


//report Delete

app.delete('/reports/:id',async (req,res)=>{
  try{
    const reportId=req.params.id;
    const deletedreport= await Report.findByIdAndDelete(reportId);
    if(!deletedreport){
      res.send("No Data with this ID")
     } else{
      res.json({ message: "Report deleted successfully", deletedreport });
      }
    
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
})



const feedbackSchemaStructure = new mongoose.Schema({
  feedbackTitle: {
    type: String,
    required: true,
  },
  feedbackDetails: {
    type: String,
    reuqired: true,
  },
  feedbackDateTime: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Feedback = mongoose.model("feedbackschema", feedbackSchemaStructure);

//add feedback

app.post("/addfeedback", async (req, res) => {
  try {
    const { feedbackTitle, feedbackDetails, userId } = req.body;
    const feedback = new Feedback({
      feedbackTitle,
      feedbackDetails,
      userId,
    });

    await feedback.save();
    res.json({ msg: "Thanks for the feedback" });
  } catch (err) {
    console.log('Error',err);
    res.status(500).json({ msg: "Server Error" });
  }
});


//feedback Find

app.get('/feedback',async (req,res)=>{
  try{
    const feedback=await Feedback.find();
    if(!feedback){
      res.send("No Data")
    }else{
      res.send(feedback).status(200)
    }
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
});

//feedback Find By Id

app.get('/feedback/:id',async (req,res)=>{
  try{
    const feedbackId=req.params.id;
    const feedback=await Feedback.findById(feedbackId);
    if(!feedback){
      res.send("No Data with this ID")
    }else{
      res.send(feedback).status(200)
    }
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
});

//feedback Delete

app.delete('/feedback/:id',async (req,res)=>{
  try{
    const feedbackId=req.params.id;
    const deletedfeedback=await Feedback.findByIdAndDelete(feedbackId);
    if(!deletedfeedback){
      res.send("No Data with this ID")
    }else{
      res.json({msg:"Deleted Succesfully",deletedfeedback})
    }
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
});


//chatSchema

const chatSchemaStructure = new mongoose.Schema({
  chatContent: {
    type: String,
    required: true,
  },
  chatFile: {
    type: String,
    reuqired: true,
  },
  chatDateTime: {
    type: Date,
    default: Date.now,
  },
  chatStatus: {
    type: String,
    required: true,
  },
  userIdFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userIdTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Chat = mongoose.model("chatschema", chatSchemaStructure);

app.post("/chat", async (req, res) => {
  try {
    const { chatContent, chatFile, chatStatus, userIdFrom, userIdTo } =
      req.body;
    const chat = new Chat({
      chatContent,
      chatFile,
      chatStatus,
      userIdFrom,
      userIdTo,
    });

    await chat.save();
    res.json({ msg: "Message Sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});


//chatFind

app.get('/chat',async (req,res)=>{
  try{
    const chat=await Chat.find();
    if(!chat){
      res.send("No Data")
    }else{
      res.send(chat).status(200)
    }
  }catch(err){
    console.error(err)
    res.status(500).json({msg:"Server Error"})
  }
})

//chatFind By Id

app.get('/chat/:id',async (req,res)=>{
  try{
    const chatId=req.params.id;
    const chat=await Chat.findById(chatId);
    if(!chat){
      res.send("No Data with this ID")
    }else{
      res.send(chat).status(200)
    }
  }catch(err){
    console.error(err)
    res.status(500).json({msg:"Server Error"})
  }
})

//Chat Delete

app.delete('/chat/:id',async (req,res)=>{
  try{
    const chatId=req.params.id;
    const deletedchat=await Chat.findByIdAndDelete(feedbackId);
    if(!deletedchat){
      res.send("No Data with this ID")
    }else{
      res.json({msg:"Deleted Succesfully",deletedchat})
    }
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
});


//hashtagSchema

const hashtagSchemaStructure = new mongoose.Schema({
  hashtagName: {
    type: String,
    required: true,
  },
});

const HashTag = mongoose.model("hashtagschema", hashtagSchemaStructure);

//addHashtag

app.post("/addhashtag", async (req, res) => {
  try {
    const { hashtagName } = req.body;
    const hashtag = new HashTag({
      hashtagName,
    });
    await hashtag.save();
    res.json({ msg: "HashTag Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//HashTag Find

app.get('/hashtag',async (req,res)=>{
  try{
    const hashtag=await HashTag.find();
    if(!hashtag){
      res.send("No Data")
    }else{
      res.send(hashtag).status(200)
    }
  }catch(err){
    console.error(err)
    res.status(500).json({msg:"Server Error"})
  }
})

//HashTag Find By Id

app.get('/hashtag',async (req,res)=>{
  try{
    const hashtagId=req.params.id;
    const hashtag=await HashTag.find(hashtagId);
    if(!hashtag){
      res.send("No Data with this ID")
    }else{
      res.send(hashtag).status(200)
    }
  }catch(err){
    console.error(err)
    res.status(500).json({msg:"Server Error"})
  }
})

//Hastag Delete

app.delete('/hashtag/:id',async (req,res)=>{
  try{
    const hashtagId=req.params.id;
    const deletedhashtag=await HashTag.findByIdAndDelete(hashtagId);
    if(!deletedhashtag){
      res.send("No Data with this ID")
    }else{
      res.json({msg:"Deleted Succesfully",deletedhashtag})
    }
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
});

//followlistSchema

const followlistSchemaStructure = new mongoose.Schema({
  followStatus: {
    type: String,
  },
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Followlist = mongoose.model(
  "followlistschema",
  followlistSchemaStructure
);

//add Follower

app.post("/followlist", async (req, res) => {
  try {
    const { userTo, userFrom, followStatus } = req.body;
    const followlist = new Followlist({
      userTo,
      userFrom,
      followStatus,
    });
    await followlist.save();
    res.json({ msg: "Started Following" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Follower Find

app.get('/follower',async (req,res)=>{
  try{
    const follower=await Followlist.find();
    if(!follower){
      res.send("No Data")
    }else{
      res.send(follower).status(200)
    }
  }catch(err){
    console.error(err)
    res.status(500).json({msg:"Server Error"})
  }
});

//Follower Find By Id

app.get('/follower/:id',async (req,res)=>{
  try{
    const followerId=req.params.id;
    const follower=await Followlist.findById(followerId);
    if(!follower){
      res.send("No Data with this ID")
    }else{
      res.send(follower).status(200)
    }
  }catch(err){
    console.error(err)
    res.status(500).json({msg:"Server Error"})
  }
});

//Follower Delete

app.delete('/follower/:id',async (req,res)=>{
  try{
    const followerId=req.params.id;
    const deletedfollower=await Followlist.findByIdAndDelete(followerId);
    if(!deletedfollower){
      res.send("No Data with this ID")
    }else{
      res.json({msg:"Deleted Succesfully",deletedfollower})
    }
  }catch(err){
    console.error('Error',err)
    res.status(500).json({msg:"Server Error"})
  }
});
