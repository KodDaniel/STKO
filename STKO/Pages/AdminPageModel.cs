using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;

namespace STKO.Pages
{

    /// <summary>
    /// An abstract class that holds logic that specifically belongs to an admin
    /// </summary>
    // Notera Authorize-attributet; alla klasser som ärver av denna klass får därmed detta attribut "gratis"
    [Authorize(Roles = "Admin")]
    public abstract class AdminPageModel : PageModel { }
}
