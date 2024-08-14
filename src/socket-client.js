const io = require('socket.io-client');
const socket = io('http://localhost:8000');

socket.on('connect', () => {
     console.log('Connected to server');
});

socket.on('overdueBooks', (data) => {
     console.log('Received notification:', data.message);
});

socket.on('disconnect', () => {
     console.log('Disconnected from server');
});
