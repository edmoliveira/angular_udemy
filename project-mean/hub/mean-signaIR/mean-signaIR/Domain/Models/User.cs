using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace mean_signaIR.Domain
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("__v")]
        [JsonIgnore]
        public int Version { get; set; }    
    }
}
