#!/usr/bin/env node

const axios = require('axios');
const mongoose = require('mongoose');
const { program } = require('commander');
const User = require('./models/User');
const Post = require('./models/Post');
const db = require('./config/db-cli')

// Load environment variables if needed
require('dotenv').config();
const base_url = "https://dummyapi.io/data/v1" || process.env.BASE_URL;


db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB successfully!');

    program
        .version('1.0.0')
        .description('CLI for fetching and storing user data and posts');

    program
        .command('fetch-users')
        .description('Fetch and store user data')
        .action(async () => {
            try {
                // Fetch user data from the API
                const headers = {
                    'app-id': process.env.APP_ID,
                };
        
                const response = await axios.get(base_url+"/user", { headers });
                const userData = response.data; // Assuming the API returns an array of user data
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
                    console.log(`User ${user.id} saved to the database`);
                }
                process.exit(0);
        
            } catch (error) {
                console.error('Error fetching and saving users:', error);
                process.exit(1);
            }
        });

    program
        .command('fetch-posts <userId>')
        .description('Fetch and store user posts by ID')
        .action(async (userId) => {
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
        
                process.exit(0);
            } catch (error) {
                console.error('Error fetching and saving user posts:', error);        
                process.exit(1);
                
            }
        });

    program.parse(process.argv);
});
