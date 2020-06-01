using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace pizza_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorController : ControllerBase
    {
        private readonly ILogger<ErrorController> _logger;

        public ErrorController(ILogger<ErrorController> logger)
        {
            this._logger = logger;
        }

        [Route("/development")]
        public IActionResult ErrorDevelopment()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            this._logger.LogError(context.Error, "Development Error");
            return Problem();
        }

        [Route("/detail")]
        public IActionResult Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            this._logger.LogError(context.Error, "Unhandled Error");
            return Problem();
        }
    }
}
