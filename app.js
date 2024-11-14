const express = require("express");
const mongoose = require("mongoose");
const candidateRoutes = require("./routes/candidateRoutes");
const cors = require('cors');
const app = express();


app.use(cors({
    origin: 'http://localhost:3000', // Allow your client URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you need to include credentials
}));
//MmIt8g13eD8fZYmE
mongoose.connect("mongodb+srv://kumaraniket3658:MmIt8g13eD8fZYmE@cluster0.8mgzw.mongodb.net/klimb?retryWrites=true&w=majority&appName=Cluster0"
);

app.use(express.json());
app.use("/api/candidates", candidateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
