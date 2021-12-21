using System.Threading.Tasks;

namespace mean_signaIR.Domain
{
  /// <summary>
  /// Managing of the user account.
  /// </summary>
  public interface IAccountManager
  {
    #region Methods

    /// <summary>
    /// Login to plataform with credentials and asynchronously using Task.
    /// </summary>
    /// <param name="request">Request data</param>
    /// <returns>Response Data</returns>
    Task<SignInResponse> SignInAsync(SignInRequest request);
    /// <summary>
    /// Removes online Users.
    /// </summary>
    Task RemoveUsersOnlineAsync(string username);
    /// <summary>
    ///  Sets online Users.
    /// </summary>
    Task SetUsersOnlineAsync(string username);
    /// <summary>
    /// Gets online Users.
    /// </summary>
    /// <returns>UsersOnlineResponse</returns>
    Task<UsersOnlineResponse> GetUsersOnlineAsync();

    #endregion
  }
}
