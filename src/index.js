const express = require('express');
const app = express();
const cors = require('cors');
const socketIO = require('socket.io');
const { sequelize } = require('./models');
const borrowController = require('./controllers/borrowController');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(process.env.BASE_PATH, require('./routes/index'));
app.use('/students', require('./routes/studentRoutes'));
app.use('/books', require('./routes/bookRoutes'));
app.use('/borrows', require('./routes/borrowRoutes'));

const server = app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});

const io = socketIO(server);

setInterval(async () => {
     await borrowController.checkOverdueBooks();
     // Notify admin via Socket.IO or other methods
}, 86400000); // Check daily
