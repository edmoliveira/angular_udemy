namespace mean_signaIR.Domain
{
    /// <summary>
    /// Provides the metadata about the Open API.
    /// </summary>
    public interface IConfigurationOpenApiInfo
    {
        #region Properties

        /// <summary>
        /// A URI-friendly name that uniquely identifies the document
        /// </summary>
        string DocumentName { get; }
        /// <summary>
        /// The title of the application.
        /// </summary>
        string Title { get; }
        /// <summary>
        /// A short description of the application.
        /// </summary>
        string Description { get; }

        #endregion
    }
}
