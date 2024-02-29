
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import authRoutes from './routes/auth'; 
import salaryRoutes from './routes/salary';
import employeeRoutes from './routes/employee'
import advanceRoute from './routes/advance';
import multer from 'multer';
import expensesRoute from './routes/expenses';


const app = express();

var corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://expence-tracker-hackdspring.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://expence-tracker-hackdspring.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/salary', salaryRoutes);
app.use('/employees',employeeRoutes);
app.use('/advance',advanceRoute);
app.use("/expenses", expensesRoute);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    res.send('File uploaded successfully.');
});


app.listen(config.port, () => {
    console.log(`Server listening on ${config.port}`);
});










