using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mean_signaIR.Domain
{
  /// <summary>
  /// Managing of the user account.
  /// </summary>
  public sealed class AccountManager : IAccountManager
  {
    private const string cacheKey = "UsersOnlineMessages";

    #region Fields private

    /// <summary>
    /// Represents a distributed cache of serialized values.
    /// </summary>
    private readonly IDistributedCache _distributedCache;
    /// <summary>
    /// Users collection.
    /// </summary>
    private readonly IMongoCollection<User> _usersCollection;
    /// <summary>
    /// Manages Json Web Token.
    /// </summary>
    private readonly ITokenJwtHelper _tokenJwtHelper;
    /// <summary>
    /// Application Configuration
    /// </summary>
    private readonly IAppConfig _appConfig;
    /// <summary>
    /// Log
    /// </summary>
    private readonly ILogger<AccountManager> _logger;

    #endregion

    #region Constructors

    /// <summary>
    /// Initializes a new instance of the mean_signaIR.Domain.AccountManager class.
    /// </summary>
    /// <param name="distributedCache">Represents a distributed cache of serialized values.</param>
    /// <param name="tokenJwtHelper">Manages Json Web Token.</param>
    /// <param name="appConfig">Application Configuration</param>
    /// <param name="logger">Log</param>
    public AccountManager(
      IDistributedCache distributedCache,
      ITokenJwtHelper tokenJwtHelper,
      IAppConfig appConfig,
      ILogger<AccountManager> logger)
    {
      _distributedCache = distributedCache;
      _tokenJwtHelper = tokenJwtHelper;
      _appConfig = appConfig;
      _logger = logger;

      MongoClient mongoClient = new MongoClient(_appConfig.MeanStoreDatabase.ConnectionString);

      IMongoDatabase mongoDatabase = mongoClient.GetDatabase(_appConfig.MeanStoreDatabase.DatabaseName);

      _usersCollection = mongoDatabase.GetCollection<User>(_appConfig.MeanStoreDatabase.UsersCollectionName);
    }

    #endregion

    #region Methods public

    /// <summary>
    /// Login to the platform with credentials and asynchronously using Task.
    /// </summary>
    /// <param name="request">Request data</param>
    /// <returns>Response Data</returns>
    public async Task<SignInResponse> SignInAsync(SignInRequest request)
    {
      string methodName = nameof(SignInAsync);

      _logger.LogInformation($"Begin: {methodName}");

      User user = await _usersCollection.Find(x =>
          x.Email == request.UserNameOrEmail &&
          x.Password == request.Password
      ).FirstOrDefaultAsync().ConfigureAwait(false);

      SignInResponse response = new SignInResponse { WasAuthorized = false };

      if (user != null)
      {
        string name = user.Name ?? user.Email.Replace("@", "-");

        await SetUsersOnlineAsync(name).ConfigureAwait(false);

        TokenJwtData data = _tokenJwtHelper.CreateToken(name, "User");

        response.Token = data.Token;
        response.Expires = data.Expires;
        response.WasAuthorized = true;
      }

      _logger.LogInformation($"End: {methodName}");

      return response;
    }

    /// <summary>
    /// Removes online Users.
    /// </summary>
    public async Task RemoveUsersOnlineAsync(string username)
    {
      string methodName = nameof(RemoveUsersOnlineAsync);

      _logger.LogInformation($"Begin: {methodName}");

      List<UserOnline> users = new List<UserOnline>();

      byte[] bytes = await _distributedCache.GetAsync(cacheKey).ConfigureAwait(false);

      if (bytes?.Length > 0)
      {
        users = JsonConvert.DeserializeObject<List<UserOnline>>(Encoding.ASCII.GetString(bytes));
      }

      users.RemoveAll(item => item.Username == username);

      await _distributedCache.SetAsync(cacheKey, Encoding.ASCII.GetBytes(JsonConvert.SerializeObject(users))).ConfigureAwait(false);

      _logger.LogInformation($"End: {methodName}");
    }

    /// <summary>
    ///  Sets online Users.
    /// </summary>
    public async Task SetUsersOnlineAsync(string username)
    {
      string methodName = nameof(SetUsersOnlineAsync);

      _logger.LogInformation($"Begin: {methodName}");

      List<UserOnline> users = new List<UserOnline>();

      byte[] bytes = await _distributedCache.GetAsync(cacheKey).ConfigureAwait(false);

      if (bytes?.Length > 0)
      {
        users = JsonConvert.DeserializeObject<List<UserOnline>>(Encoding.ASCII.GetString(bytes));
      }

      users.RemoveAll(item => item.Username == username);

      users.Add(new UserOnline { Username = username, Online = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss") });

      await _distributedCache.SetAsync(cacheKey, Encoding.ASCII.GetBytes(JsonConvert.SerializeObject(users))).ConfigureAwait(false);

      _logger.LogInformation($"End: {methodName}");
    }

    /// <summary>
    /// Gets online Users.
    /// </summary>
    /// <returns>UsersOnlineResponse</returns>
    public async Task<UsersOnlineResponse> GetUsersOnlineAsync()
    {
      string methodName = nameof(GetUsersOnlineAsync);

      _logger.LogInformation($"Begin: {methodName}");

      UsersOnlineResponse response = new UsersOnlineResponse
      {
        Users = new List<UserOnline>()
      };

      byte[] bytes = await _distributedCache.GetAsync(cacheKey).ConfigureAwait(false);

      if(bytes?.Length > 0)
      {
        response.Users = JsonConvert.DeserializeObject<List<UserOnline>>(Encoding.ASCII.GetString(bytes));
      }

      _logger.LogInformation($"End: {methodName}");

      return response;
    }

    #endregion
  }
}
