using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DTCMCC_WebApp_Sam.Controllers
{
    public class AdminPanelController : Controller
    {
        public AdminPanelController()
        {

        }
        public IActionResult Index()
        {
            var role = HttpContext.Session.GetString("Role");
            if(role.Equals("Admin"))
                return View();
            return RedirectToAction("Unauthorized", "ErrorPage");
        }
    }
}
