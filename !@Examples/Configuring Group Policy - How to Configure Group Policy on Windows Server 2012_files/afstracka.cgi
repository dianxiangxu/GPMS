var T=Math.random();
var AFS_Protocol="http:";
if (document.location.protocol == "https:") AFS_Protocol="https:";
var Ref=document.referrer;
if (String.prototype.trim) AFS_Account=AFS_Account.trim();
var S="usr="+AFS_Account+"P"+AFS_Tracker+"&js=1";
if (typeof AFS_Page == "undefined") var AFS_Page="unknown";
if (typeof AFS_Url == "undefined") var AFS_Url="unknown";
if (AFS_Page=="DetectName") {AFS_Page=document.title;}
if (AFS_Url=="DetectUrl") {AFS_Url=window.document.URL;
var iframe = (parent !== window);
if(iframe){if (document.referrer)
{
AFS_Url=document.referrer;
}
}
}
if (String.prototype.trim) AFS_Page=AFS_Page.trim();
S+="&title="+encodeURIComponent(AFS_Page);
S+="&url="+encodeURIComponent(AFS_Url);
S+="&refer="+encodeURIComponent(Ref);
S+="&rua=0";
if(typeof(screen)=="object")
{
S+="&resolution="+screen.width+"x"+screen.height;
S+="&color="+screen.colorDepth;
}
S+="&Tips="+T;
var codeAFS="<a href=\"http://new.afsanalytics.com/?usr="+AFS_Account+"\" rel=\"nofollow\" target='_new'>";
codeAFS+="<img border=\"0\" src=\""+AFS_Protocol+"//"+AFS_Server+".afsanalytics.com/cgi-bin/connect.cgi?";
codeAFS+=S;
codeAFS+="\"  alt=\"AFS Analytics\"></a>";
statdivafs =document.getElementById("addfreestats");
if (statdivafs==null) { 
var defafs=document.getElementsByTagName('script')[0];
var codeins= document.createElement('div');
codeins.innerHTML = codeAFS;
defafs.parentNode.insertBefore(codeins,defafs);}
else {
statdivafs.style.visibility='visible';
statdivafs.innerHTML = codeAFS;
}
