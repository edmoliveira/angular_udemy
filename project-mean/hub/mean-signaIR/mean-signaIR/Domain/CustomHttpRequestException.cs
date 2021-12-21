using System;
using System.Net;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Represents errors that occur during application execution (HttpRequest).
    /// </summary>
    public class CustomHttpRequestException : Exception
    {
        #region Properties public

        /// <summary>
        /// The Uri the request is sent to.
        /// </summary>
        public string RequestUri { get; }
        /// <summary>
        /// The status code of the HTTP response.
        /// </summary>
        public HttpStatusCode StatusCode { get; }
        /// <summary>
        /// string containing the server response in JSON format
        /// </summary>
        public string ServerResponse { get; set; }

        #endregion

        #region Conctructors

        /// <summary>
        /// Initializes a new instance of the QuixaPartners.Entities.Exceptions.CustomHttpRequestException class.
        /// </summary>
        /// <param name="requestUri">The Uri the request is sent to.</param>
        /// <param name="statusCode">The status code of the HTTP response.</param>
        public CustomHttpRequestException(string requestUri, HttpStatusCode statusCode)
        {
            RequestUri = requestUri;
            StatusCode = statusCode;
        }

        /// <summary>
        /// Initializes a new instance of the QuixaPartners.Entities.Exceptions.CustomHttpRequestException class with a specific message that describes the current exception.
        /// </summary>
        /// <param name="requestUri">The Uri the request is sent to.</param>
        /// <<param name="statusCode">The status code of the HTTP response.</param>
        /// <param name="message">A message that describes the current exception.</param>
        public CustomHttpRequestException(string requestUri, HttpStatusCode statusCode, string message) : base(message)
        {
            RequestUri = requestUri;
            StatusCode = statusCode;
        }

        /// <summary>
        /// Initializes a new instance of the QuixaPartners.Entities.Exceptions.CustomHttpRequestException class with a specific message that describes the current exception and an inner exception.
        /// </summary>
        /// <param name="requestUri">The Uri the request is sent to.</param>
        /// <param name="statusCode">The status code of the HTTP response.</param>
        /// <param name="message">A message that describes the current exception.</param>
        /// <param name="inner">The inner exception.</param>
        public CustomHttpRequestException(string requestUri, HttpStatusCode statusCode, string message, Exception inner) : base(message, inner)
        {
            RequestUri = requestUri;
            StatusCode = statusCode;
        }

        /// <summary>
        /// Initializes a new instance of the QuixaPartners.Entities.Exceptions.CustomHttpRequestException class with a specific message that describes the current exception and an inner exception.
        /// </summary>
        /// <param name="requestUri">The Uri the request is sent to.</param>
        /// <param name="statusCode">The status code of the HTTP response.</param>
        /// <param name="serverResponse">string containing the server response in JSON format </param>
        /// <param name="message">A message that describes the current exception.</param>
        /// <param name="inner">The inner exception.</param>
        public CustomHttpRequestException(string requestUri, HttpStatusCode statusCode, string serverResponse, string message, Exception inner) : base(message, inner)
        {
            RequestUri = requestUri;
            StatusCode = statusCode;
            ServerResponse = serverResponse;
        }

        #endregion
    }
}
