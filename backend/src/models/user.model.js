import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        fullname:{
            type: String,
            required: true,
        },
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required: [true,"Password is required"],
        },
        lastLogin:{
            type:Date,
            default:Date.now
        },
        isVerified:{
            type:Boolean,
            default: false
        },
        resetPasswordToken:String,
        resetPasswordExpiresAt:Date,
        verificationToken:String,
        verificationTokenExpiresAt: Date,
    },
    {
        timestamps:true
    }
)

// Before saving data to DB this function hash password
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,12);
    next();
})

// check password when user login
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User",userSchema);