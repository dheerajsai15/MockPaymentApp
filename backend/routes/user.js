const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Accounts } = require("../db");
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware")

const signUpObj = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

router.post("/signup", async (req,res) => {
    const result = signUpObj.safeParse(req.body);
    console.log(req.body)
    if(!result.success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    else{
        var username = result.data.username
        var password = result.data.password
        var firstName = result.data.firstName
        var lastName = result.data.lastName

        const existingUser = await User.findOne({
            username
        })

        if(existingUser){
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }

        const user = await User.insertOne({
            username,
            password,
            firstName,
            lastName
        })

        const userId = user._id;

        await Accounts.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        var token = jwt.sign({
            userId
        },process.env.JWT_SECRET)

        return res.json({
            message: "User Created Successfully!",
            token
        })
    }
})

const signInObj = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

router.post("/signin",async (req,res) => {
    const result = signInObj.safeParse(req.body);
    if(!result.success){
        return res.status(411).json({
            message: "Invalid Input"
        })
    }
    else{
        const username = result.data.username;
        const password = result.data.password;

        const user = await User.findOne({
            username,
            password
        })

        if(!user){
            return res.status(411).json({
                message: "User does not exist!"
            })
        }

        const userId = user._id;
        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET)

        return res.json({
            message: "Sign in Successful!",
            token
        })
    }
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/", authMiddleware, async (req,res)=>{
    const result = updateBody.safeParse(req.body);
    if(!result.success){
        return res.status(411).json({
            message: "Invalid Input"
        })
    }
    await User.updateOne({
        _id: req.userId
    }, result.data)

    res.json({
        message: "User Details Updated Successfully!"
    })
})

router.get("/bulk",authMiddleware,async (req,res) => {
    const filter = req.query.filter|| "";
    const users = await User.find({
        $or: [
            {'firstName': {
                "$regex": filter
            }},
            {'lastName': {
                "$regex": filter
            }}
        ]
    })
    
    return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;