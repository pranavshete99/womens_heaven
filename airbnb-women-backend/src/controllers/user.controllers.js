import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
    // collect the info
    const {name, email, password} = req.body;

    // verify that it is empty or not 
    if([name, email, password].some((field) => field.trim() === '')){
        throw new ApiError(400, "All fields are required!");
    }

    // check if the User exists
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new ApiError(409, "User already exists!");
    }

    //  create User 
    const createdUser = await User.create({
        name,
        email,
        password
    });

    // disselect the password
    const user = await User.findById(createdUser._id).select(
        '-password'
    );


    if(!user){
        throw new ApiError(500, 'Something went wrong while createing the user!');
    }

    return res
    .status(200)
    .json(new ApiResponse(200, user, 'User created successfully!'));

});

const generateAccessAndRefreshTokens = async (userId) => {
    try{
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();

        await user.save({ validateBeforeSave: false });

        return accessToken;
    }
    catch(error){
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh tokens"
          );
    }
} 

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if([email, password].some((field) => field.trim() === '')){
        throw new ApiError(400, "Enter all fields");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400, 'User not found');
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, 'Invalid user credentials!');
    }

    console.log(user);
    const accessToken = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id)
    .select('-password');

    return res.status(200)
    .cookie('token', accessToken)
    .json(new ApiResponse(200, {
        user: loggedInUser,
        accessToken
    }, 
    "Hi "+loggedInUser.name+"! You are successfully logged in!"));
});


const logoutUser = asyncHandler((req, res) => {
    const user = req.user;

    console.log(user);
    return res.status(200)
    .json(new ApiResponse(200, {}, "User logged out Successfully!"));
});

const userProfile = asyncHandler((req, res) => {
    const user = req.user;

    console.log(user);
    return res.status(200)
    .json(new ApiResponse(200, {user}, `${user.name}'s Profile`));
})

export {createUser, loginUser, logoutUser, userProfile};
