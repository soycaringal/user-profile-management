import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const UserProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  tags: {
    type: [String],
    default: [],
  },
});

interface IUserProfile extends Document {
  name: string;
  email: string;
  age?: number;
  tags?: string[];
}

const UserProfile = mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);

const router = express.Router();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/userProfileDB");
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const getAllProfiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles = await UserProfile.find();
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await UserProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProfile = new UserProfile(req.body);
    const profile = await newProfile.save();
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await UserProfile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.json({ msg: "Profile removed" });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

const app = express();
const PORT = process.env.PORT || 3000;

// Essential Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/api/users", router);

// Basic error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { UserProfile, IUserProfile };
