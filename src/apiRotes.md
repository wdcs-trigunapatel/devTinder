app.post("/signUp", async (req, res) => {
//creating a new instancs of the User Moddel
const user = new User({
firstName: "Neel",
lastName: "Patel",
age: "25",
});

try {
await user.save();
res.send("User Added Successfully");
} catch (error) {
res.status(400).send("Error saving the usser:" + error.message);
}
});
