namespace mean_signaIR.Domain
{
    /// <summary>
    ///  Manages Json Web Token.
    /// </summary>
    public interface ITokenJwtHelper
    {
        #region Methods

        /// <summary>
        /// Creates a Json Web Token (JWT).
        /// </summary>
        /// <param name="username">Username</param>
        /// <param name="role">Role</param>
        /// <returns>Contains information of the security token.</returns>
        TokenJwtData CreateToken(string username, string role);
        /// <summary>
        /// Encodes all the characters in the specified string into a sequence of bytes.
        /// </summary>
        /// <returns>A byte array containing the results of encoding the specified set of characters.</returns>
        byte[] GetAuthTokenBytes();

        #endregion
    }
}
