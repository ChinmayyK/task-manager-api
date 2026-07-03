const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
});
app.use('/api', limiter);

// Logging
app.use(morgan('dev'));

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Import Routes
const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);
const taskRoutes = require('./src/routes/task.routes');
app.use('/api/tasks', taskRoutes);

// 404 Route
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
    });
});

// Global Error Handler
const errorHandler = require('./src/middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});