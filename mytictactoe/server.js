const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = [];
const roles = ['X', 'O'];

server.on('connection', (ws) => {
  const role = clients.length < 2 ? roles[clients.length] : null;

  if (role) {
    ws.send(JSON.stringify({ type: 'role', role }));
    clients.push(ws);
    console.log(`Игрок с ролью ${role} подключился.`);
  } else {
    ws.send(JSON.stringify({ type: 'error', message: 'Игра уже занята двумя игроками' }));
    ws.close();
  }

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    // Если это ход, добавляем информацию о следующем игроке
    if (data.type === 'move') {
      const nextPlayer = data.symbol === 'X' ? 'O' : 'X';
      data.nextPlayer = nextPlayer;

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });

  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      console.log(`Игрок с ролью ${roles[index]} отключился.`);
      clients.splice(index, 1);
    }
  });
});

console.log('WebSocket сервер запущен на порту 8080');