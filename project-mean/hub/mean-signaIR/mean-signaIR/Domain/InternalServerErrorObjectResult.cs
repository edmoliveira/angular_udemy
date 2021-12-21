using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// An Microsoft.AspNetCore.Mvc.ObjectResult that when executed will produce a Internal Server Error (500) response.
    /// </summary>
    public class InternalServerErrorObjectResult : ObjectResult
    {
        #region Constructors

        /// <summary>
        /// Initializes a new instance of the  mean_signaIR.Domain.InternalServerErrorObjectResult class.
        /// </summary>
        /// <param name="value">The content to format into the entity body.</param>
        public InternalServerErrorObjectResult(object value) : base(value)
        {
            base.StatusCode = StatusCodes.Status500InternalServerError;
        }

        #endregion
    }
}
