using Microsoft.AspNetCore.Razor.TagHelpers;

namespace STKO.TagHelpers
{
    /// <summary>
    /// A Tag Helper that prevents the user from deleting the "Admin" role
    /// </summary>
    [HtmlTargetElement(Attributes = "role-delete-button" )]
    public class RoleDeleteButtonTagHelper:TagHelper 
    {
        [HtmlAttributeName("role-delete-button")]
        public string RoleName { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (RoleName == "Admin")
            {
                output.Attributes.SetAttribute(new TagHelperAttribute("disabled"));
            }
        }
    }
}
