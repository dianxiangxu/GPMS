


function getData2()
{
	return sitid_sessionid;
}





function updateAjaxTokenIndicator(avAjaxParams)
		{
			   var ajaxReqIndicator="GENERATE_TOKEN=N";
			   
			     if(avAjaxParams != null && avAjaxParams != "") 
			     {
                     avAjaxParams += "&";
                 }
                 else
                 {
                     avAjaxParams = "";
                 }
                 avAjaxParams += ajaxReqIndicator;
			   //checking if token present or not 
			   if(avAjaxParams.indexOf(tokenName)==-1)
			   {
				   avAjaxParams =avAjaxParams + "&" + msTokenNameValue;
			   }
			   return avAjaxParams;
		 }
		function updateTokenIDForAnchorTags()
		{
			var frmAnc =document.getElementsByTagName("a");
			//var msTokenNameValue=tokenName+"="+tokenValue //dynamic
			try
			{
					for(var i=0; i<frmAnc.length;i++)
					{
						if(frmAnc[i].href!="#")
						{
							frmAnc[i].href=updateURLWithToken(frmAnc[i].href)
						}
					}
			}
			catch(err)
			{
				alert("Error while updating the Token ID field in the Anchor tags. Err=\n"+err.description)
			}
		}
		
			function updateURLWithToken(asActionURL)
		{
			var updatedActionURL=asActionURL;	
		     if(asActionURL.charAt(asActionURL.length-1)!='/')
				{
						if(asActionURL.indexOf("?")!=-1)
						{
							updatedActionURL+="&"+msTokenNameValue;
						}
						else
						{
							updatedActionURL+="?"+msTokenNameValue;
						}
				}
				return updatedActionURL;
		}


	function updateTokenIDInForms()
	{
	   var mrForms=document.forms;
	   var i=0;
		try
		{
			  for(i=0;i<mrForms.length;i++)
			  {
					//creating an element type input
				 var currentTokenElement = document.createElement("input");
					currentTokenElement.setAttribute("type", "hidden");
					currentTokenElement.setAttribute("name",tokenName); //dynamic
					currentTokenElement.setAttribute("id", "token");
				    currentTokenElement.setAttribute("value", tokenValue);  //dynamic
				
					//adding it to the current Form
				    mrForms[i].appendChild(currentTokenElement)
					//alert("updated form "+mrForms[i].name+ "with tokenValue  ="+tokenValue)
					//May not be required.
					/*if(mrForms[i].method=="get")
				    {
						mrForms[i].action=updateURLWithToken(mrForms[i].action)
				    }*/
			  }
		}
		catch(err)
		{
			alert("Error while updating the Token ID hidden field in the FormData Err=\n"+err.description)
		}
	}
	
 var _cbolUrl="";
 function callHelpCenter(w,u,b,l,id,type,siteId) {

  _cbolUrl=document.getElementById('cbolUrl').value;
  if(l =="ESP" || l == "es_US") { l = "ES&locale=es_US"; }

          if(w == 0){
                window.location = _cbolUrl+"/US/JRS/helpcenter/getHelpContent.do?dispFormat=main&contentId="+id+"&contentType="+type+"&u="+u+"&b="+b+"&l="+l+"&siteId="+siteId; 
        } else {
        window.open(_cbolUrl+"/US/JRS/helpcenter/getHelpContent.do?dispFormat=popup&contentId="+id+"&contentType="+type+"&u="+u+"&b="+b+"&l="+l+"&siteId="+siteId,"","resizable,location,width=911,height=610");
        }
}