using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

namespace mean_signaIR.Domain
{
  /// <summary>
  /// Authenticate the user on the platform.
  /// </summary>
  [ApiController]
  [Produces("application/json")]
  [Route("users/authentications")]
  public sealed class AuthenticationsController : CustomControllerBase
  {
    #region Fields private

    /// <summary>
    /// Managing of the user account.
    /// </summary>
    private readonly IAccountManager _manager;

    #endregion

    #region Constructors

    /// <summary>
    /// Initializes a new instance of the Salep.Api.Controllers.Users.AuthenticationsController class.
    /// </summary>
    /// <param name="manager">Managing of the user account.</param>
    /// <param name="logger">Log</param>
    public AuthenticationsController(IAccountManager manager, ILogger<AuthenticationsController> logger) : base(logger)
    {
      _manager = manager;
    }

    #endregion

    #region Method public

    /// <summary>
    /// Login to the platform with credentials.
    /// </summary>
    /// <param name="request">Request data</param>
    /// <returns>SignInResponse</returns>
    [AllowAnonymous]
    [ApiExplorerSettings(GroupName = "Users")]
    [HttpPost()]
    [ApiVersion("1.0")]
    [Route("sign-in/{v:apiVersion}")]
    [ProducesResponseType(typeof(SignInResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [SwaggerOperation(
        Summary = "Sign In",
        Description = "Login to the platform with credentials."
    )]
    public async Task<IActionResult> SignInAsync(SignInRequest request)
    {
      return await TryActionResultAsync(async stopwatch =>
      {
        string methodName = nameof(SignInAsync);

        _Logger.LogInformation(GetMethodBeginMessage(methodName));

        SignInResponse response = await _manager.SignInAsync(request).ConfigureAwait(false);

        _Logger.LogInformation(GetMethodEndMessage(methodName, stopwatch.StopAndGetMilliseconds()));

        return Ok(response);
      }).ConfigureAwait(false);
    }

    /// <summary>
    /// Gets online Users.
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [ApiExplorerSettings(GroupName = "Users")]
    [HttpGet()]
    [ApiVersion("1.0")]
    [Route("users-online/{v:apiVersion}")]
    [ProducesResponseType(typeof(UsersOnlineResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [SwaggerOperation(
        Summary = "Online Users",
        Description = "Gets online Users."
    )]
    public async Task<IActionResult> GetUsersOnlineAsync()
    {
      return await TryActionResultAsync(async stopwatch =>
      {
        string methodName = nameof(GetUsersOnlineAsync);

        _Logger.LogInformation(GetMethodBeginMessage(methodName));

        UsersOnlineResponse response = await _manager.GetUsersOnlineAsync().ConfigureAwait(false);

        _Logger.LogInformation(GetMethodEndMessage(methodName, stopwatch.StopAndGetMilliseconds()));

        return Ok(response);
      }).ConfigureAwait(false);
    }

    #endregion
  }
}
