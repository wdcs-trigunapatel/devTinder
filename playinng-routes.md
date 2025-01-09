//advance optional routes
//it's work /abc, /ac
// app.get("/ab?c", (req, res) => {
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// it will work /abc, /abbbbbbbbc
// app.get("/ab+c", (req, res) => {
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// it will work /abcd, /ab jhsgjdhfjsd cd
// app.get("/ab\*cd", (req, res) => {
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// it will work /abcd, /ad
// app.get("/a(bc)?d", (req, res) => {
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// it will work /a or that url which have a string
// app.get("/a", (req, res) => {
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// it will work /a or that url which have a string
// app.get("/a", (req, res) => {
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// it will work / or / anythig wich have match fly word like butterfly
// app.get("/.\*fly$/", (req, res) => {
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// query param we can add user?userId=101
// query param we can add user?userId=101&password=test
// app.get("/user", (req, res) => {
// console.log("user b1 successfully", req.query);
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

// routes dynamic param we can add user?userId=101
// it will match/user/101
// : means it's a dynamic routes
// app.get("/user/:userId", (req, res) => {
// console.log("user b1 successfully", req.params);
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });
// app.get("/:b1", (req, res) => {
// console.log("user b1 successfully", req.params);
// res.send({ firstName: "Trigunadgdg", lastName: "Pateldfgdf" });
// });
// app.get("/user/:b1", (req, res) => {
// console.log("user b1 successfully", req.params);
// res.send({ firstName: "Triguna1", lastName: "Patel1" });
// });
// app.get("/user/:a1/:a2", (req, res) => {
// console.log("user a1 successfully", req.params);
// res.send({ firstName: "Triguna", lastName: "Patel" });
// });

//this will match all the HTTP method API call to test
// app.use("/api", (req, res) => {
// res.send("Hello I am in the project");
// });

//this will only handle GET call to /user
app.get("/user", (req, res) => {
console.log("user b1 successfully", req.query);
res.send({ firstName: "Triguna", lastName: "Patel" });
});

//next funstion
do not make url like this
app.use(
"/user",
(req, res, next) => {
//Route Handler
console.log("user found");
res.send("Response");
next();
},
(req, res) => {
console.log("user found 2");
res.send("Response2");
}
);

app.post("/user", (req, res) => {
res.send("Successfully Added Data");
});

app.delete("/user", (req, res) => {
res.send("Successfully Deleted Data");
});
app.get("/user", (req, res) => {
res.send("User Data here");
});

app.get("/admin/getData", (req, res) => {
res.send("All Data here");
});

const { adminAuth } = require("./middlewares/auth");

//Handler middleware for all request for all GET, POST, DELETE
app.use("/admin", adminAuth);

app.get("/getAllUserData", (req, res) => {
try {
console.log("tes");
res.send("User Data list");
} catch (err) {
res.status(500).send("something went wrong Data");
}
});

app.use("/", (err, req, res, next) => {
if (err) {
res.status(500).send("something went wrong");
}
});

//find give all matched data
// app.get("/user", async (req, res) => {
// const usersEmail = req.body.emailId;
// try {
// const users = await User.find({ emailId: usersEmail });
// if (users.length === 0) {
// res.status(401).send("user not found");
// } else {
// res.send(users);
// }
// } catch (err) {
// res.status(400).send("something went wrong");
// }
// });

//findOne query function method find oldest one data
app.get("/user", async (req, res) => {
const usersEmail = req.body.emailId;
try {
const users = await User.findOne({ emailId: usersEmail });
if (!users) {
res.status(401).send("user not found");
} else {
res.send(users);
}
} catch (err) {
res.status(400).send("something went wrong");
}
});

//feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
try {
const users = await User.find({});
res.send(users);
} catch (err) {
res.status(400).send("something went wrong");
}
});

app.delete("/user", async (req, res) => {
const userId = req.body.userId;
try {
const user = await User.findByIdAndDelete(userId);
res.send("user deleted successfully");
} catch (err) {
res.status(400).send("something went wrong");
}
});

app.patch("/user/:userId", async (req, res) => {
const userId = req.params?.userId;
const data = req.body;
// const emailId = req.body.emailId;
try {
const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
const isUpdatedAllowd = Object.keys(data).every((k) =>
ALLOWED_UPDATES.includes(k)
);
if (!isUpdatedAllowd) {
throw new Error("Updtae Not Allowed");
}
// if (data?.skills.length > 10) {
// throw new Error("Skills cannot be more than 10");
// }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // await User.findByIdAndUpdate({userId }, data, {returnDocument: "after"});
    //await User.findOneAndUpdate({ emailId }, data);
    res.send("User Update successfully");

} catch (err) {
res.status(400).send(`User  ${err.message}`);
}
});
