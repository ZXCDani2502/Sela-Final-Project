using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace RealTimeChat.Models
{
    public class Message
    {
        [BsonId]  // This will map the MongoDB '_id' field to this property
        public ObjectId Id { get; set; }

        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime SentAt { get; set; }
        public string ChatRoom { get; set; }
    }
}
