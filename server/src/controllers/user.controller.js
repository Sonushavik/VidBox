const asyncHandler  = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError")
const User = require("../models/user.models")
const uploadOnCloudinary = require("../utils/cloudinary")
const ApiResponse = require("../utils/ApiResponse")

const registerUser = asyncHandler(async(req, res) => {
        const userDetails = req.body;
        const {fullName, email, username, password } = userDetails;

        if(
                [fullName, email, username, password ].some((field) => field?.trim()==="")
        ){
                throw new ApiError(400, "All fields are required")
        }

        const existedUser = await User.FindOne({
                $or: [{username}, {email        }]
        })

        if(existedUser){
                throw new ApiError(409, "User with email or username already exists")
        }

        const avatarLocalPath = req.files?.avatar[0]?.path;

        let coverImageLocalPath;
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
                coverImageLocalPath = req.files.coverImage[0].path
        }
        if(!avatarLocalPath){
                throw new ApiError(400, "Avatar file is required")
        }

        const avatar = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
                throw new ApiError(400, "Avatar file is required")
        }

        const user = await User.create({
                fullName,
                avatar: avatar.url,
                coverImage: coverImage?.url || "",
                email,
                password,
                username: username.toLowerCase()
        })

        const createdUser = await User.findById(user._id).select(
                "-password -refreshToken"
        )

        if(!createdUser){
                 throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(
                new ApiResponse(200, createdUser, "User registered Successfully")
        )

})

module.exports = registerUser;