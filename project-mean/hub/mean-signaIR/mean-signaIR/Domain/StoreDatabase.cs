namespace mean_signaIR.Domain
{
    public class StoreDatabase
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; } = null!;
        public string UsersCollectionName { get; set; }
    }
}
