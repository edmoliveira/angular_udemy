using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Represents errors that occur during application execution (Request Data).
    /// </summary>
    public class RequestException : Exception
    {
        #region Properties public

        /// <summary>
        /// Contains the values of status codes defined for HTTP
        /// </summary>
        public HttpStatusCode StatusCode { get; }

        #endregion

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the Salep.Domain.Infra.Exceptions.BadRequestException class with a specific messages that describes the current exception.
        /// </summary>
        /// <param name="statusCode">Contains the values of status codes defined for HTTP</param>
        /// <param name="messageList">Message collection.</param>
        public RequestException(HttpStatusCode statusCode, List<string> messageList) : base(TransformMessageListToMessage(messageList))
        {
            StatusCode = statusCode;
        }

        /// <summary>
        /// Initializes a new instance of the QuixaPartners.Entities.Exceptions.BadRequestException class with a specific messages that describes the current exception and an inner exception.
        /// </summary>
        /// <param name="statusCode">Contains the values of status codes defined for HTTP</param>
        /// <param name="messageList">Message collection.</param>
        /// <param name="inner">The inner exception.</param>
        public RequestException(HttpStatusCode statusCode, List<string> messageList, Exception inner) : base(TransformMessageListToMessage(messageList), inner)
        {
            StatusCode = statusCode;
        }

        #endregion

        #region Methods private

        /// <summary>
        /// Transforms exception messages to into a single string
        /// </summary>
        /// <param name="messageList">A list of exception messages.</param>
        /// <returns>Exception messages concatenated into a single string</returns>
        private static string TransformMessageListToMessage(List<string> messageList)
        {
            return messageList.Aggregate((current, value) => $"{current}\r\n{value}");
        }

        #endregion
    }
}
