using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RealTimeChat.Models
{
    public class UserConnection
    {
        [BsonId]
        public string ConnectionId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string ChatRoom { get; set; } = string.Empty;
    }
}
