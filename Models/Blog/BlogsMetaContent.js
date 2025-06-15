// models/Post.js
const mongoose = require('mongoose');

const BlogMetaContent = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL of the image
        required: true,
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    // title: {
    //     type: String,
    //     required: true,
    // },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    // bannerimg: {
    //     type: String,
    //     required: true,
    // },
    blogContent: mongoose.Schema.Types.Mixed,
    ispublished: {
        type: String,
        enum: ["Published", "Unpublished"],
        required: true,
    },
    ismetapublished: {
        type: String,
        enum: ["meta", "notmeta"],
        required: true,
    },
    metatitle: {
        type: String,
        required: false,
    },
    metadescription: {
        type: String,
        required: false,
    },
    keywords: {
        type: String,
        required: false,
    },
    canonical: {
        type: String,
        required: false,
    },
    schema: {
        type: String,
        required: false,
    },
    ogtitle: {
        type: String,
        required: false,
    },
    ogdescription: {
        type: String,
        required: false,
    },
    ogurl: {
        type: String,
        required: false,
    },
    ogalt: {
        type: String,
        required: false,
    },
    ipAddress: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('blog_meta_content', BlogMetaContent);
