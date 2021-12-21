using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Application Configuration
    /// </summary>
    public interface IAppConfig
    {
        #region Properties

        /// <summary>
        /// Array of Allowed Origins
        /// </summary>
        string[] AllowedOrigins { get; }
        /// <summary>
        /// Array of Allowed Methods
        /// </summary>
        string[] AllowedMethods { get; }
        /// <summary>
        /// Array of Allowed Headers
        /// </summary>
        string[] AllowedHeaders { get; }
        /// <summary>
        /// Swagger Documents
        /// </summary>
        IReadOnlyList<IConfigurationOpenApiInfo> Documents { get; }
        /// <summary>
        /// A URL to the Terms of Service for the API. MUST be in the format of a URL.
        /// </summary>
        string TermsOfServiceOpenApi { get; }
        /// <summary>
        /// The identifying name of the contact person/organization.
        /// </summary>
        string NameOpenApiContact { get; }
        /// <summary>
        /// The URL pointing to the contact information. MUST be in the format of a URL.
        /// </summary>
        string UrlOpenApiContact { get; }
        /// <summary>
        /// The email address of the contact person/organization. MUST be in the format of an email address.
        /// </summary>
        string EmailOpenApiContact { get; }
        /// <summary>
        /// The license name used for the API.
        /// </summary>
        string NameOpenApiLicense { get; }
        /// <summary>
        /// The URL pointing to the contact information. MUST be in the format of a URL.
        /// </summary>
        string UrlOpenApiLicense { get; }
        /// <summary>
        /// Authentication token secrect.
        /// </summary>
        string AuthTokenSecrect { get; }
        /// <summary>
        /// Authentication Token expiration in seconds.
        /// </summary>
        double AuthTokenExpireSeconds { get; }
        /// <summary>
        /// Store Database
        /// </summary>
        StoreDatabase MeanStoreDatabase { get; }
        /// <summary>
        /// Authnetication token cache address.
        /// </summary>
        string CacheAddress { get; }
        /// <summary>
        /// Authnetication token cache instance.
        /// </summary>
        string CacheInstance { get; }

        #endregion
    }
}
