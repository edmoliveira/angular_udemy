using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Application Configuration
    /// </summary>
    public class AppConfig: IAppConfig
    {
        #region Properties

        /// <summary>
        /// Array of Allowed Origins
        /// </summary>
        public string[] AllowedOrigins { get; set; }
        /// <summary>
        /// Array of Allowed Methods
        /// </summary>
        public string[] AllowedMethods { get; set; }
        /// <summary>
        /// Array of Allowed Headers
        /// </summary>
        public string[] AllowedHeaders { get; set; }
        /// <summary>
        /// Swagger Documents
        /// </summary>
        public List<ConfigurationOpenApiInfo> Documents { get; set; }
        /// <summary>
        /// Swagger Documents
        /// </summary>
        IReadOnlyList<IConfigurationOpenApiInfo> IAppConfig.Documents { get { return Documents; } }
        /// <summary>
        /// A URL to the Terms of Service for the API. MUST be in the format of a URL.
        /// </summary>
        public string TermsOfServiceOpenApi { get; set; }
        /// <summary>
        /// The identifying name of the contact person/organization.
        /// </summary>
        public string NameOpenApiContact { get; set; }
        /// <summary>
        /// The URL pointing to the contact information. MUST be in the format of a URL.
        /// </summary>
        public string UrlOpenApiContact { get; set; }
        /// <summary>
        /// The email address of the contact person/organization. MUST be in the format of an email address.
        /// </summary>
        public string EmailOpenApiContact { get; set; }
        /// <summary>
        /// The license name used for the API.
        /// </summary>
        public string NameOpenApiLicense { get; set; }
        /// <summary>
        /// The URL pointing to the contact information. MUST be in the format of a URL.
        /// </summary>
        public string UrlOpenApiLicense { get; set; }
        /// <summary>
        /// Authentication token secrect.
        /// </summary>
        public string AuthTokenSecrect { get; set; }
        /// <summary>
        /// Authentication Token expiration in seconds.
        /// </summary>
        public double AuthTokenExpireSeconds { get; set; }
        /// <summary>
        /// Store Database
        /// </summary>
        public StoreDatabase MeanStoreDatabase { get; set; }
        /// <summary>
        /// Authnetication token cache address.
        /// </summary>
        public string CacheAddress { get; set; }
        /// <summary>
        /// Authnetication token cache instance.
        /// </summary>
        public string CacheInstance { get; set; }

        #endregion
    }
}
