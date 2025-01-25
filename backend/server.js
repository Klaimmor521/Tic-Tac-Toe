const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });
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
    try {
      const data = JSON.parse(message);

      if (data.type === 'move' && typeof data.cellIndex === 'number' && ['X', 'O'].includes(data.symbol)) {
        console.log(`Ход игрока: ${data.symbol}, ячейка: ${data.cellIndex}`);
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ ...data, nextPlayer: data.symbol === 'X' ? 'O' : 'X' }));
          }
        });
      } else {
        console.log('Получены некорректные данные:', data);
      }
    } catch (err) {
      console.error('Ошибка обработки сообщения:', err);
    }
  });

  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      console.log(`Игрок с ролью ${roles[index]} отключился.`);
      clients.splice(index, 1); // Удаляем клиента из списка
    }
    console.log('Текущие клиенты:', clients.length);
  });

  ws.on('error', (err) => {
    console.error('Ошибка на стороне WebSocket:', err);
  });
});

console.log(`WebSocket сервер запущен на порту ${PORT}`);