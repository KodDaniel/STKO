using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace STKO.TagHelpers
{
    /// <summary>
    /// A Tag Helper that, under the condition that a user exists, places a username in an HTML element
    /// </summary>
    [HtmlTargetElement("displayUsername")]
    public class DisplayUsernameTagHelper: TagHelper
    {
        [ViewContext]
        [HtmlAttributeNotBound]
        public ViewContext Context { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (Context.HttpContext.User.Identity?.Name != null)
            {
                output.Content.Append(Context.HttpContext.User.Identity.Name);
            }
        }
    }
}
