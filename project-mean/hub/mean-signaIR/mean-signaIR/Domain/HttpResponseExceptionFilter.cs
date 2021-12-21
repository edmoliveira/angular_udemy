using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Exception to modify the response.
    /// </summary>
    public sealed class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
    {
        #region Fields private

        /// <summary>
        /// Log
        /// </summary>
        private readonly ILogger<HttpResponseExceptionFilter> _logger;

        #endregion

        #region Properties

        /// <summary>
        /// Gets the order value for determining the order of execution of filters. Filters
        /// execute in ascending numeric value of the Microsoft.AspNetCore.Mvc.Filters.IOrderedFilter.Order
        /// </summary>
        public int Order { get; set; } = int.MaxValue - 10;

        #endregion

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the Salep.Domain.Infra.Helpers.Filters.HttpResponseExceptionFilter class.
        /// </summary>
        /// <param name="logger">Log</param>
        public HttpResponseExceptionFilter(ILogger<HttpResponseExceptionFilter> logger)
        {
            _logger = logger;
        }

        #endregion

        #region Methods public

        /// <summary>
        /// Called after the action executes, before the action result.
        /// </summary>
        /// <param name="context">The Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext.</param>
        public void OnActionExecuting(ActionExecutingContext context) { }

        /// <summary>
        /// Called before the action executes, after model binding is complete.
        /// </summary>
        /// <param name="context"> The Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext.</param>
        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                _logger.LogError(context.Exception, context.Exception.Message);

                context.Result = new InternalServerErrorResult();
                context.ExceptionHandled = true;
            }
        }

        #endregion
    }
}
