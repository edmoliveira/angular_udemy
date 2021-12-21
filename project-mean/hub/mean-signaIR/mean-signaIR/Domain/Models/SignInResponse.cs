
namespace mean_signaIR.Domain
{
    /// <summary>
    /// Response of the method
    /// </summary>
    public sealed class SignInResponse
    {
        #region Properties

        /// <summary>
        /// Indicates whether or not the user has been authorized.
        /// </summary>
        public bool WasAuthorized { get; set; }
        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// Token expiration minutes.
        /// </summary>
        public double Expires { get; set; }

        #endregion
    }
}
