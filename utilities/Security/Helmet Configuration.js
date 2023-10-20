// REQUIRING EXPRESS AND ROUTER INSTANCE
const express = require("express");
const router = express.Router();

// REQUIRING HELMET AND CLOUDINARY CLOUD NAME
const helmet = require("helmet");
const { CLOUDINARY_CLOUD_NAME } = process.env;

// ACCEPTED SCRIPT SOURCE URLS (USED FOR THIS PROJECT)
const scriptSrcUrls = [
    "https://api.mapbox.com",
    "https://cdn.jsdelivr.net",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://api.tiles.mapbox.com",
    "https://stackpath.bootstrapcdn.com"
];

// ACCEPTED STYLE SOURCE URLS (USED FOR THIS PROJECT)
const styleSrcUrls = [
    "https://api.mapbox.com",
    "https://cdn.jsdelivr.net",
    "https://use.fontawesome.com",
    "https://api.tiles.mapbox.com",
    "https://fonts.googleapis.com",
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
];

// ACCEPTED CONNECT SOURCE URLS (USED FOR THIS PROJECT)
const connectSrcUrls = [
    "https://api.mapbox.com",
    "https://events.mapbox.com",
    "https://*.tiles.mapbox.com"
];

// ACCEPTED FONT SOURCE URLS (USED FOR THIS PROJECT)
const fontSrcUrls = [
    "https://fonts.gstatic.com", // Google Fonts
    "https://unpkg.com/boxicons@2.1.4/fonts/", // Boxicons
];

// CONFIGURING CONTENT SECURITY POLICY OF HELMET
router.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        childSrc: ["blob:"],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/`,
            "https://images.unsplash.com",
        ],
        fontSrc: ["'self'", ...fontSrcUrls],
    },
}));

module.exports = router;