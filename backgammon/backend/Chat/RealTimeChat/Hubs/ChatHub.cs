using MongoDB.Driver;
using Microsoft.AspNetCore.SignalR;
using RealTimeChat.Models;

namespace RealTimeChat.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(string userName, string message);
        Task ReceiveChatHistory(List<Message> chatHistory);
    }

    public class ChatHub : Hub<IChatClient>
    {
        private readonly IMongoCollection<UserConnection> _connections;
        private readonly IMongoCollection<Message> _messages;

        public ChatHub(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("LocalChat");
            _connections = database.GetCollection<UserConnection>("UserConnections");
            _messages = database.GetCollection<Message>("Messages");
        }

        public async Task JoinChat(UserConnection connection)
        {
            var existingUser = await _connections
                .Find(c => c.UserName == connection.UserName && c.ChatRoom == connection.ChatRoom)
                .FirstOrDefaultAsync();

            if (existingUser != null)
            {
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            connection.ConnectionId = Context.ConnectionId;
            await _connections.InsertOneAsync(connection);

            var chatHistory = await _messages
                .Find(m => m.ChatRoom == connection.ChatRoom)
                .SortBy(m => m.SentAt)
                .ToListAsync();


            await Clients.Caller.ReceiveChatHistory(chatHistory);

            await Clients
                .Group(connection.ChatRoom)
                .ReceiveMessage("Admin", $"{connection.UserName} joined the chat");
        }
        public async Task SendMessage(string message)
        {
            var connection = await _connections.Find(c => c.ConnectionId == Context.ConnectionId).FirstOrDefaultAsync();

            if (connection != null)
            {
                var newMessage = new Message
                {
                    UserName = connection.UserName,
                    Text = message,
                    ChatRoom = connection.ChatRoom,
                    SentAt = DateTime.UtcNow
                };

                await _messages.InsertOneAsync(newMessage);

                await Clients
                    .Group(connection.ChatRoom)
                    .ReceiveMessage(connection.UserName, message);
            }
        }  
        public async Task<string> CreateRoom()
        {
            var roomCode = GenerateRoomCode();
            var userName = Context.User?.Identity?.Name;

            if (userName == null)
            {
                throw new InvalidOperationException("User not authenticated.");
            }
            var existingRoom = await _connections
                .Find(c => c.ChatRoom == roomCode)
                .FirstOrDefaultAsync();
            if (existingRoom != null)
            {
                return await CreateRoom();
            }
            var connection = new UserConnection
            {
                UserName = userName,
                ChatRoom = roomCode,
                ConnectionId = Context.ConnectionId
            };
            await _connections.InsertOneAsync(connection);
            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
            return roomCode;
        }
        private string GenerateRoomCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var roomCode = new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            return roomCode;
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connection = await _connections.Find(c => c.ConnectionId == Context.ConnectionId).FirstOrDefaultAsync();

            if (connection != null)
            {
                await _connections.DeleteOneAsync(c => c.ConnectionId == Context.ConnectionId);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, connection.ChatRoom);

                await Clients
                    .Group(connection.ChatRoom)
                    .ReceiveMessage("Admin", $"{connection.UserName} left");
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
