using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Request of the method
    /// </summary>
    public sealed class SignInRequest
    {
        #region Properties

        /// <summary>
        /// user identification can be user name or email.
        /// </summary>
        [Required]
        public string UserNameOrEmail { get; set; }
        /// <summary>
        /// User password
        /// </summary>
        [Required]
        public string Password { get; set; }
        /// <summary>
        /// Place coordinates
        /// </summary>

        #endregion
    }
}
