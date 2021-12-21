using mean_signaIR.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace mean_signaIR
{
  [Authorize]
  public class ServerHub: Hub
  {
    #region Fields private

    /// <summary>
    /// Managing of the user account.
    /// </summary>
    private readonly IAccountManager _accountManager;
    /// <summary>
    /// Log
    /// </summary>
    private readonly ILogger<ServerHub> _logger;

    #endregion

    /// <summary>
    /// 
    /// </summary>
    /// <param name="accountManager">Managing of the user account.</param>
    /// <param name="logger">Log</param>
    public ServerHub(IAccountManager accountManager, ILogger<ServerHub> logger)
    {
      _accountManager = accountManager;
      _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
      string methodName = nameof(OnConnectedAsync);

      _logger.LogInformation($"Begin: {methodName}");

      string username = GetUsername(Context.User);

      await _accountManager.SetUsersOnlineAsync(username).ConfigureAwait(false);
      await Clients.Others.SendAsync("UserIsOnline", username).ConfigureAwait(false);

      _logger.LogInformation($"End: {methodName}");
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
      string methodName = nameof(OnDisconnectedAsync);

      _logger.LogInformation($"Begin: {methodName}");

      string username = GetUsername(Context.User);

      await _accountManager.RemoveUsersOnlineAsync(username).ConfigureAwait(false);
      await Clients.Others.SendAsync("UserIsOffline", username).ConfigureAwait(false);

      await base.OnDisconnectedAsync(exception);

      _logger.LogInformation($"End: {methodName}");
    }

    private string GetUsername(ClaimsPrincipal claimsPrincipal)
    {
      return claimsPrincipal.Claims
        .Where(c => c.Type == ClaimTypes.Name)
        .Select(c => c.Value)
        .FirstOrDefault();
    }
  }
}
