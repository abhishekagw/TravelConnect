const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;
const multer = require("multer");
const { ObjectId } = require("mongoose").Types;
const { createServer } = require("http");
const { Server } = require("socket.io");

const PATH = "./public/images";
const upload = multer({
  storage: multer.diskStorage({
    destination: PATH,
    filename: function (req, file, cb) {
      let origialname = file.originalname;
      let ext = origialname.split(".").pop();
      let filename = origialname.split(".").slice(0, -1).join(".");
      cb(null, filename + "." + ext);
    },
  }),
});

//use express static folder
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

httpServer.listen(port, () => {
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
      return res.json({ errors: [{ msg: "District already exists" }] });
    }

    district = new District({
      distName,
    });
    await district.save();
    res.json({ message: "District Added successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ msg: "Server error" });
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "districtSchema",
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
    const place = await Place.find().populate("placeDistName");
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
  userFullName: {
    type: String,
    required: true,
  },
  userContact: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "placeSchema",
  },
  userPhoto: {
    type: String,
  },
  userType: {
    type: String,
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
    const { userName, userFullName, userEmail, userPassword } = req.body;
    let user = await User.findOne({ $or: [{ userName }, { userEmail }] });
    if (user) {
      return res
        .status(400)
        .json({ msg: " There is already an Account With These credentials" });
    }
    user = new User({
      userName,
      userFullName,
      userEmail,
      userPassword,
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

//user total post BY Id

app.get("/user/totalposts/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const totalPosts = await PostHead.countDocuments({ userId });

    res.send({ totalPosts }).status(200);
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

//User Update

app.put("/User/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { userName, userFullName, userContact, userGender } = req.body;
    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      { userName, userFullName, userContact, userGender },
      { new: true }
    );
    res.json(updatedAdmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//User Change Password

app.put("/changepassword/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { userPassword, userNewPassword } = req.body;
    const user = await User.findById(id);
    if (user) {
      const oldPass = user.userPassword;
      if (oldPass == userPassword) {
        const updatedPass = await User.findByIdAndUpdate(
          id,
          { userPassword: userNewPassword },
          { new: true }
        );
        res.send({ msg: "Password Changed", updatedPass });
      } else {
        res.send("Old Password is Not Matching");
      }
    } else {
      res.send("User Not Found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//PostsSchema

const postSchemaStructure = new mongoose.Schema({
  postFile: {
    type: String,
    required: true,
  },
  postHeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postHeadschema",
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("postschema", postSchemaStructure);

const postHeadSchemaStructure = new mongoose.Schema({
  postCaption: {
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

const PostHead = mongoose.model("postHeadschema", postHeadSchemaStructure);

//Add Image Post

app.post(
  "/addpost",
  upload.fields([{ name: "postFile", maxCount: 10 }]), // Adjust maxCount for multiple files

  async (req, res) => {
    try {
      const { postCaption, userId, hashtagName } = req.body;
      const postHead = new PostHead({
        postCaption,
        userId,
      });

      const allHashtag = await HashTag.findOne({ hashtagName });
      if (!allHashtag) {
        const hashtag = new HashTag({
          hashtagName,
        });
        await hashtag.save();
      }
      const postHeadCollection = await postHead.save();

      const files = req.files["postFile"]; // Get the array of files

      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isImage = file.mimetype.startsWith("image");
        const isVideo = file.mimetype.startsWith("video");

        // Determine the type of file
        let postType = "other";
        if (isImage) {
          postType = "image";
        } else if (isVideo) {
          postType = "video";
        }

        const fileUrl = `http://127.0.0.1:${port}/images/${file.filename}`;

        // Save each post individually
        const post = new Post({
          postHeadId: postHeadCollection._id,
          postFile: fileUrl,
          postType, // Save post type along with the file
        });
        await post.save();
      }

      res.json({ msg: "Inserted " }); // Return saved posts
    } catch (err) {
      console.log(err.msg);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//Add Video

app.post(
  "/addp",
  upload.fields([{ name: "postFile", maxCount: 1 }]),

  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var postFile = `http://127.0.0.1:${port}/images/${fileValue.postFile[0].filename}`;

      const { postCaption, userId } = req.body;
      console.log(req.body);
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
  }
);

//Post Find
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "postheadschemas", // Collection name of PostHead model
          localField: "postHeadId",
          foreignField: "_id",
          as: "postHead",
        },
      },
      {
        $unwind: "$postHead", // Deconstructs the postHead array created by $lookup
      },
      {
        $lookup: {
          from: "users", // Collection name of User model
          localField: "postHead.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Deconstructs the user array created by $lookup
      },
      {
        $group: {
          _id: "$postHeadId", // Group posts by postHeadId
          postHead: { $first: "$postHead" }, // Take the first postHead object in each group
          user: { $first: "$user" }, // Take the first user object in each group
          posts: { $push: "$$ROOT" }, // Push all posts in the group into an array
        },
      },
      {
        $project: {
          // Select fields to include in the final output
          _id: "$postHead._id",
          postCaption: "$postHead.postCaption",
          postDateTime: "$postHead.postDateTime",
          userId: "$postHead.userId",
          user: {
            _id: "$user._id",
            userName: "$user.userName",
            userFullName: "$user.userFullName",
            userContact: "$user.userContact",
            userEmail: "$user.userEmail",
            userPassword: "$user.userPassword",
            placeId: "$user.placeId",
            userPhoto: "$user.userPhoto",
            userType: "$user.userType",
            userGender: "$user.userGender",
            userStatus: "$user.userStatus",
          },
          posts: {
            $map: {
              // Map posts array to include only necessary fields
              input: "$posts",
              as: "post",
              in: {
                _id: "$$post._id",
                postFile: "$$post.postFile",
                postType: "$$post.postType",
              },
            },
          },
        },
      },
      {
        $sort: { postDateTime: -1 }, // Sort posts by postDateTime in descending order
      },
    ]);

    console.log(posts);

    if (!posts || posts.length === 0) {
      return res.json([]);
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

app.get("/postsSingleUser/:id", async (req, res) => {
  try {
    let id = req.params.id;
    id = new ObjectId(id);

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "postheadschemas", // Collection name of PostHead model
          localField: "postHeadId",
          foreignField: "_id",
          as: "postHead",
        },
      },
      {
        $match: { "postHead.userId": id }, // Filter posts by userId
      },
      {
        $unwind: "$postHead", // Deconstructs the postHead array created by $lookup
      },
      {
        $lookup: {
          from: "users", // Collection name of User model
          localField: "postHead.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Deconstructs the user array created by $lookup
      },
      {
        $group: {
          _id: "$postHeadId", // Group posts by postHeadId
          postHead: { $first: "$postHead" }, // Take the first postHead object in each group
          user: { $first: "$user" }, // Take the first user object in each group
          posts: { $push: "$$ROOT" }, // Push all posts in the group into an array
        },
      },
      {
        $project: {
          // Select fields to include in the final output
          _id: "$postHead._id",
          postCaption: "$postHead.postCaption",
          postDateTime: "$postHead.postDateTime",
          userId: "$postHead.userId",
          user: {
            _id: "$user._id",
            userName: "$user.userName",
            userFullName: "$user.userFullName",
            userContact: "$user.userContact",
            userEmail: "$user.userEmail",
            userPassword: "$user.userPassword",
            placeId: "$user.placeId",
            userPhoto: "$user.userPhoto",
            userType: "$user.userType",
            userGender: "$user.userGender",
            userStatus: "$user.userStatus",
          },
          posts: {
            $map: {
              // Map posts array to include only necessary fields
              input: "$posts",
              as: "post",
              in: {
                _id: "$$post._id",
                postFile: "$$post.postFile",
                postType: "$$post.postType",
              },
            },
          },
        },
      },
      {
        $sort: { postDateTime: -1 }, // Sort posts by postDateTime in descending order
      },
    ]);

    console.log(posts);

    if (!posts || posts.length === 0) {
      return res.json([]);
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// //Post Find By Id

// app.get("/posts/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const posts = await Post.findById(postId);
//     if (!posts) {
//       res.send({ msg: "No Data with this ID" });
//     } else {
//       res.send(posts).status(200);
//     }
//   } catch (err) {
//     console.error("Error", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// //Post Delete

// app.delete("/posts/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const deletedPost = await Post.findByIdAndDelete(postId);
//     await Comment.deleteMany({ postId });
//     if (!deletedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     } else {
//       res.json({ message: "Post deleted successfully", deletedPost });
//     }
//   } catch (err) {
//     console.error("Error Deleting Post", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

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
    ref: "postHeadschema",
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
    console.log(comments);
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

// app.get("/comments/:id", async (req, res) => {
//   try {
//     const commentId = req.params.id;
//     const comments = await Comment.findById(commentId);
//     if (!comments) {
//       res.send({ msg: "no data with this ID" });
//     } else {
//       res.send(comments).status(200);
//     }
//   } catch (err) {
//     console.error("Error", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

//commentFind by Post ID

app.get("/comments/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId }).populate("userId");
    if (!comments) {
      res.send({ msg: "no Comment for this Post" });
    } else {
      res.send({ comments }).status(200);
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

//Comment Count

app.get("/commentcount/:pid", async (req, res) => {
  try {
    const postId = req.params.pid;
    const commentCount = await Comment.countDocuments({ postId });
    res.send({ commentCount });
  } catch (err) {
    console.error("Error", err);
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
    ref: "postHeadschema",
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

app.delete("/like/:id/:postid", async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postid;
    const deletedLike = await Like.deleteOne({
      userId: userId,
      postId: postId,
    });
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

//Like Status

app.get("/LikeStatus/:uid/:pid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const postId = req.params.pid;
    const likeStatus = (await Like.findOne({ userId, postId })) ? true : false;
    res.json(likeStatus);
  } catch (err) {
    console.error("Error", err);
  }
});

//Like Count

app.get("/likecount/:pid", async (req, res) => {
  try {
    const postId = req.params.pid;
    const likeCount = await Like.countDocuments({ postId });
    res.send({ likeCount });
  } catch (err) {}
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
  },
  reportStatus: {
    type: String,
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
    const { reportTitle, reportDetails, userId } = req.body;
    const report = new Report({
      reportTitle,
      reportDetails,
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

app.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    if (!reports) {
      res.send("No Data");
    } else {
      res.send(reports).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//report Find by Id

app.get("/reports/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const reports = await Report.findById(reportId);
    if (!reports) {
      res.send("No Data with this ID");
    } else {
      res.send(reports).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//report Delete

app.delete("/reports/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const deletedreport = await Report.findByIdAndDelete(reportId);
    if (!deletedreport) {
      res.send("No Data with this ID");
    } else {
      res.json({ message: "Report deleted successfully", deletedreport });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

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
    console.log("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//feedback Find

app.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    if (!feedback) {
      res.send("No Data");
    } else {
      res.send(feedback).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//feedback Find By Id

app.get("/feedback/:id", async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      res.send("No Data with this ID");
    } else {
      res.send(feedback).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//feedback Delete

app.delete("/feedback/:id", async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const deletedfeedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!deletedfeedback) {
      res.send("No Data with this ID");
    } else {
      res.json({ msg: "Deleted Succesfully", deletedfeedback });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
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
  },
  chatListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "followlistschemas",
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

app.get("/chat", async (req, res) => {
  try {
    const chat = await Chat.find();
    if (!chat) {
      res.send("No Data");
    } else {
      res.send(chat).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//chatFind By Id

app.get("/Chat/:ChatlistId", async (req, res) => {
  try {
    const ChatListId = new mongoose.Types.ObjectId(req.params.ChatlistId)

    const chats = await Chat.aggregate([
      {
        $match: {
          chatListId: ChatListId
        }
      },

    ]);
    res.json({chats});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Chat Delete

app.delete("/chat/:id", async (req, res) => {
  try {
    const chatId = req.params.id;
    const deletedchat = await Chat.findByIdAndDelete(feedbackId);
    if (!deletedchat) {
      res.send("No Data with this ID");
    } else {
      res.json({ msg: "Deleted Succesfully", deletedchat });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
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

app.get("/hashtag", async (req, res) => {
  try {
    const hashtag = await HashTag.find();
    if (!hashtag) {
      res.send("No Data");
    } else {
      res.send({ hashtag }).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//HashTag Find By Id

app.get("/hashtag", async (req, res) => {
  try {
    const hashtagId = req.params.id;
    const hashtag = await HashTag.find(hashtagId);
    if (!hashtag) {
      res.send("No Data with this ID");
    } else {
      res.send(hashtag).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Hastag Delete

app.delete("/hashtag/:id", async (req, res) => {
  try {
    const hashtagId = req.params.id;
    const deletedhashtag = await HashTag.findByIdAndDelete(hashtagId);
    if (!deletedhashtag) {
      res.send("No Data with this ID");
    } else {
      res.json({ msg: "Deleted Succesfully", deletedhashtag });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//followlistSchema

const followlistSchemaStructure = new mongoose.Schema({
  followStatus: {
    type: String,
    default: 0,
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

app.post("/follow", async (req, res) => {
  try {
    const { userTo, userFrom } = req.body;
    const followlist = new Followlist({
      userTo,
      userFrom,
    });
    await followlist.save();
    res.json({ msg: "Started Following" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Follower List Find

app.get("/followlist/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const follower = await Followlist.findById(id);
    if (!follower) {
      res.send("No Data");
    } else {
      res.send(follower).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Follower List Find

app.get("/followlist/:Lid/:Uid", async (req, res) => {
  try {
    const { Lid, Uid } = req.params;

    const otherUser = await Followlist.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(Lid),
        },
      },
      {
        $project: {
          otherUser: {
            $cond: [
              { $eq: ["$userTo", new mongoose.Types.ObjectId(Uid)] },
              "$userFrom",
              "$userTo",
            ],
          },
          followListId: "$_id", // Project the ChatList ID
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "otherUser",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: "$userData", // Unwind the array
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$userData", { followListId: "$followListId" }], // Combine friend and chatListId into a single object
          },
        }, // Promote the unwound document to the root level
      },
    ]);

    if (otherUser.length === 0) {
      return res.json({ message: "Other user data not found" });
    } else {
      console.log(otherUser);
       res.json({otherUser:otherUser[0]});
    }
  } catch (error) {
    console.error("Error retrieving other user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Follower Find

app.get("/follower/:id", async (req, res) => {
  try {
    const userTo = req.params.id;
    const follower = await Followlist.find({ userTo }).populate("userFrom");
    if (!follower) {
      res.send("No Data");
    } else {
      res.send(follower).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Follow  Status

app.get("/FollowStatus/:uid/:id", async (req, res) => {
  try {
    const userFrom = req.params.uid;
    const userTo = req.params.id;
    const followStatus = await Followlist.findOne({
      $or: [
        { userFrom: userFrom, userTo: userTo },
        { userFrom: userTo, userTo: userFrom },
      ],
    });
    if (followStatus) {
      res.json({ followStatus });
    } else {
      res.json({ followStatus: false });
    }
  } catch (err) {
    console.error("Error", err);
  }
});
//Follow  Status Update

app.put("/FollowStatus/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const followStatus = await Followlist.findByIdAndUpdate(
      id,
      { followStatus: 1 },
      { new: true }
    );
    res.json(followStatus);
  } catch (err) {
    console.error("Error", err);
  }
});

//Follower Delete

app.delete("/follow/:id/:userid", async (req, res) => {
  try {
    const userFrom = req.params.id;
    const userTo = req.params.userid;
    const deletedfollower = await Followlist.deleteOne({ userFrom, userTo });
    if (!deletedfollower) {
      res.send("No Data with this ID");
    } else {
      res.json({ msg: "Deleted Succesfully", deletedfollower });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Follow Count

app.get("/followcount/:id", async (req, res) => {
  try {
    const userTo = req.params.id;
    const followcount = await Followlist.countDocuments({ userTo });
    res.send({ followcount });
  } catch (err) {
    console.error("Error", err);
  }
});

//login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      userEmail: email,
      userPassword: password,
    });
    const admin = await Admin.findOne({
      adminEmail: email,
      adminPassword: password,
    });
    if (user) {
      res.send({
        id: user._id,
        login: "User",
      });
    }
    if (admin) {
      res.send({
        id: admin._id,
        login: "Admin",
      });
    }
  } catch (err) {
    console.error("Error", err);
  }
});

//Socket IO Chat

io.on("connection", (socket) => {

  socket.on("createRoomFromClient", ({ id }) => {
    const roomKey = id
    socket.join(roomKey);
  })

  socket.on("typing-started", ({ id }) => {
    socket.broadcast.to(id).emit("typing-started-from-server")
  })

  socket.on("typing-stopped", ({ id }) => {
    socket.broadcast.to(id).emit("typing-stopped-from-server")
  })

  socket.on(
    "toServer-sendMessage",
    async ({ message, Id, Uid, ToId }, callback) => {
      try {
        const ChatSchemaData = new Chat({
          userIdFrom: Uid,
          userIdTo: ToId,
          chatListId: Id,
          chatContent: message,
          chatDateTime: moment().tz("Asia/Kolkata").format(),
        });
        const chatDoc = await ChatSchemaData.save();
        callback(chatDoc);
        socket.broadcast.to(Id).emit("toServer-sendMessage", chatDoc);
      } catch (err) {
        console.error(err.message);
       console.log("Server error");
      }
    }
  );
});
