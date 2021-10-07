using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using STKO.Controllers;

namespace STKO.TagHelpers
{

    /// <summary>
    /// A Tag Helper that renders as a form element. Distinguishes between the creation of an Exam and the updating of an Exam
    /// </summary>
    [HtmlTargetElement("examform")]
    public class ExamFormTagHelper:TagHelper 
    {
        [ViewContext]
        [HtmlAttributeNotBound]
        public ViewContext Context { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            string id = (string) Context.RouteData.Values["action"] == nameof(ExamController.CreateExam) ? "CreateForm" : "UpdateForm";
           
            //Sätt HTML-element-typ
            output.TagName = "form";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Attributes.SetAttribute("id",id);

            //Logik för formulärknappen, skiljer sig åt beroende om vi skapar eller om vi uppdaterar ett prov
            TagBuilder div = new("div");
            div.Attributes.Add("class", "text-center");
            TagBuilder inputBtn = new("input");
            inputBtn.Attributes.Add("class","btn btn-primary");
            inputBtn.Attributes.Add("type","submit");
            string btnValue = (string)Context.RouteData.Values["action"] == nameof(ExamController.CreateExam) ? "Skapa prov" : "Uppdatera prov";
            inputBtn.Attributes.Add("value", btnValue);

            div.InnerHtml.AppendHtml(inputBtn);
            output.PostContent.AppendHtml(div);

        }
    }
}
