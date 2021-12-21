namespace mean_signaIR.Domain
{
    /// <summary>
    /// Provides the metadata about the Open API.
    /// </summary>
    public class ConfigurationOpenApiInfo : IConfigurationOpenApiInfo
    {
        #region Properties

        /// <summary>
        /// A URI-friendly name that uniquely identifies the document
        /// </summary>
        public string DocumentName { get; set; }
        /// <summary>
        /// The title of the application.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// A short description of the application.
        /// </summary>
        public string Description { get; set; }

        #endregion
    }
}
