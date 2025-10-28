using System;

namespace backend_dotnet.Models
{

    public class DataRecord
    {
	    public DataRecord() { }

        public int Id { get; set; }
        public string Category { get; set; } = "";
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

