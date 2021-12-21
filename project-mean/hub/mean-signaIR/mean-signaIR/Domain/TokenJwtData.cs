namespace mean_signaIR.Domain
{
    /// <summary>
    /// Contains information of the security token.
    /// </summary>
    public sealed class TokenJwtData
    {
        #region Properties

        /// <summary>
        /// Token in Compact Serialization Format
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// Token expiration.
        /// </summary>
        public double Expires { get; set; }

        #endregion
    }
}
