using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Manages Json Web Token.
    /// </summary>
    public class TokenJwtHelper: ITokenJwtHelper
    {
        #region Fields private

        /// <summary>
        /// Application Configuration
        /// </summary>
        private readonly IAppConfig _appConfig;
        /// <summary>
        /// A Microsoft.IdentityModel.Tokens.SecurityTokenHandler designed for creating and validating Json Web Tokens
        /// </summary>
        private readonly Func<JwtSecurityTokenHandler> _handler;

        #endregion

        #region Consctructors

        /// <summary>
        /// Initializes a new instance of the Salep.Domain.Infra.Helpers.TokenJwtHelper class.
        /// </summary>
        /// <param name="appConfig">Application Configuration</param>
        public TokenJwtHelper(IAppConfig appConfig)
        {
            _appConfig = appConfig;
            _handler = () => new JwtSecurityTokenHandler();
        }

        /// <summary>
        /// Initializes a new instance of the Salep.Domain.Infra.Helpers.TokenJwtHelper class.
        /// </summary>
        /// <param name="appConfig">Application Configuration</param>
        /// <param name="handler">A Microsoft.IdentityModel.Tokens.SecurityTokenHandler designed for creating and validating Json Web Tokens</param>
        public TokenJwtHelper(IAppConfig appConfig, JwtSecurityTokenHandler handler)
        {
            _appConfig = appConfig;
            _handler = () => handler;
        }

        #endregion

        #region Methods public

        /// <summary>
        /// Creates a Json Web Token (JWT).
        /// </summary>
        /// <param name="username">Username</param>
        /// <param name="role">Role</param>
        /// <returns>Contains information of the security token.</returns>
        public TokenJwtData CreateToken(string username, string role)
        {
            double expires = _appConfig.AuthTokenExpireSeconds;

            JwtSecurityTokenHandler tokenHandler = _handler();

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                    , new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddSeconds(expires),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(GetAuthTokenBytes()),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return new TokenJwtData { Token = tokenHandler.WriteToken(token), Expires = expires };
        }

        /// <summary>
        /// Encodes all the characters in the specified string into a sequence of bytes.
        /// </summary>
        /// <returns>A byte array containing the results of encoding the specified set of characters.</returns>
        public byte[] GetAuthTokenBytes()
        {
            return ConvertStringToBytes(_appConfig.AuthTokenSecrect);
        }

        #endregion

        #region Methods private

        /// <summary>
        /// Convert a string to a byte array containing the results of encoding the specified set of characters
        /// </summary>
        /// <param name="value">The string containing the characters to encode.</param>
        /// <returns>A byte array containing the results of encoding the specified set of characters</returns>
        private byte[] ConvertStringToBytes(string value)
        {
            return Encoding.ASCII.GetBytes(value);
        }

        #endregion
    }
}
