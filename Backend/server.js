require("dotenv").config();

const express = require("express");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connect = require("./DataBase/db");
const User = require("./models/userSchema");
const Blog = require("./models/blogSchema");
const bcrypt = require("bcrypt");

const app = express();
const cors = require("cors");


app.use(cors());

connect();

app.use(express.json());


// =========================
// HOME
// =========================

app.get("/", function (req, res) {
  res.json({
    name: "Home page"
  });
});


// =========================
// ABOUT
// =========================

app.get("/about", function (req, res) {
  res.json({
    name: "About page",
    address: "Dharan",
    age: "5"
  });
});


// =========================
// REGISTER USER
// =========================

app.post("/register", async function (req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registered successfully!",
      userId: user._id
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});


// =========================
// LOGIN
// =========================
app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Not Registered!!!"
      });
    }

    const isMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatched) {
      return res.status(401).json({
        message: "Incorrect password!!!"
      });
    }

    res.json({
      message: "You Logged In successfully!!!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});


// =========================
// CREATE BLOG
// =========================

app.post("/postBlog", async function (req, res) {
  try {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const description = req.body.description;
    const url = req.body.url;
    const author = req.body.author;
    const paragraph = req.body.paragraph;

    const blog = await Blog.create({
      title: title,
      subtitle: subtitle,
      description: description,
      url: url,
      author: author,
      paragraph: paragraph
    });

    res.status(201).json({
      message: "Blog created successfully!",
      blogId: blog._id
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Blog creation failed",
      error: error.message
    });
  }
});


// =========================
// FETCH ALL USERS
// =========================

app.get("/fetch-users", async function (req, res) {
  try {
    const data = await User.find();

    res.json({
      data: data
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });
  }
});


// =========================
// FETCH USER BY ID
// =========================

app.get("/fetch-users/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const data = await User.findById(id);

    if (!data) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      data: data
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message
    });
  }
});


// =========================
// FETCH ALL BLOGS
// =========================

app.get("/fetch-blogs", async function (req, res) {
  try {
    const data = await Blog.find();

    res.json({
      data: data
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message
    });
  }
});


// =========================
// FETCH BLOG BY ID
// =========================

app.get("/fetch-blogs/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const data = await Blog.findById(id);

    if (!data) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.json({
      data: data
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message
    });
  }
});


// =========================
// DELETE BLOG BY ID
// =========================

app.delete("/delete-blogs/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.json({
      message: "Blog deleted successfully!"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete blog",
      error: error.message
    });
  }
});


// =========================
// UPDATE USER
// =========================

app.put("/update-user", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await User.findOneAndUpdate(
      { email: email },
      {
        password: hashedPassword
      }
    );

    res.json({
      message: "Password updated successfully!"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Password update failed",
      error: error.message
    });
  }
});

// =========================
// EDIT BLOG
// =========================

app.put("/edit-blog/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const description = req.body.description;
    const url = req.body.url;
    const author = req.body.author;
    const paragraph = req.body.paragraph;


    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title,
        subtitle: subtitle,
        description: description,
        url: url,
        author: author,
        paragraph: paragraph

      },
      {
        new: true
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.json({
      message: "Blog edited successfully!",
      data: updatedBlog
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Blog update failed",
      error: error.message
    });
  }
});


// =========================
// START SERVER
// =========================

app.listen(3000, function () {
  console.log("Server has started at port 3000");
});