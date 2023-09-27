require('dotenv').config(); 
const express = require('express');
const db = require('./config/db-express'); // Import the MongoDB connection from your MongoDB file
const app = express();
const axios = require('axios'); 
const User = require("./models/User");
const Post = require("./models/Post");

const base_url = "https://dummyapi.io/data/v1" || process.env.BASE_URL;

app.get("/fetch-user", async (req, res) => {
    const addedUserIds = [];
    try {
        // Fetch user data from the API
        const headers = {
            'app-id': process.env.APP_ID,
        };

        const response = await axios.get(base_url+"/user", { headers });
        const userData = response.data; // Assuming the API returns an array of user data
        console.log(userData)
        // Iterate through the user data and save each user to MongoDB
        for (const user of userData.data) {
            const newUser = new User({
                id: user.id,
                title: user.title,
                firstName: user.firstName,
                lastName: user.lastName,
                picture: user.picture,
            });

            await newUser.save();
            addedUserIds.push(user.id);
            console.log(`User ${user.id} saved to the database`);
        }

        res.status(200).json({ message: 'Users fetched and saved successfully' }, addedUserIds);
    } catch (error) {
        console.error('Error fetching and saving users:', error);
        res.status(500).json({ message: 'Error fetching and saving users' });
    }
});

//Fetch post and save it

app.get('/fetch-posts/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch user posts from the API for the specified user ID
        const response = await axios.get(`${base_url}/user/${userId}/post`, {
            headers: { 'app-id': process.env.APP_ID },
        });
        const userPosts = response.data.data;


        // Iterate through the user posts and save each post to MongoDB
        for (const post of userPosts) {
            const newPost = new Post({
                id: post.id,
                image: post.image,
                likes: post.likes,
                tags: post.tags,
                text: post.text,
                publishDate: post.publishDate,
                owner: userId,
            });

            await newPost.save();
            console.log(`Post ${post.id} saved to the database`);
        }

        res.status(200).json({ message: 'User posts fetched and saved successfully' }, );
    } catch (error) {
        console.error('Error fetching and saving user posts:', error);
        res.status(500).json({ message: 'Error fetching and saving user posts' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});