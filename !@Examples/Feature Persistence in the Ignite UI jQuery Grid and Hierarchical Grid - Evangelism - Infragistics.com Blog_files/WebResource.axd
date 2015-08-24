/* AddThis Vertical Infragistics Hover Menu */

.addthis_toolbox .custom_hover
{
    position: relative;
    background: url('/assets/images/share_button.png') no-repeat;    
    width: 67px;
    height:19px;
}

.addthis_toolbox .custom_hover.like
{
	background: url('/assets/images/like_button.png') no-repeat;    
}

.addthis_toolbox .custom_hover .custom_button
{
    width: 67px;
    height:19px;
    font-weight: bold;    
    color: #00bff3;
    cursor: pointer;
}

.addthis_toolbox .custom_hover .custom_button.active
{
    background: url('/assets/images/share_button_hover.png') no-repeat;
}

.addthis_toolbox .custom_hover.like .custom_button.active
{
	background: url('/assets/images/like_button_hover.png') no-repeat;    
}

.addthis_toolbox .hover_menu
{
    display: none;
    position: absolute;
    background-color: #000;
    /* background: url('images/share_menu_bg.png') repeat; */
    opacity: 0.88;
    filter: alpha(opacity=88) !important;
    z-index: 1;
}

.addthis_toolbox .hover_menu
{
    width: 136px;
    padding: 5px;
}

.addthis_toolbox .hover_menu a
{
    position: relative;
    display: block;
    width: 102px;
    padding: 4px 0 4px 34px;
    margin: 5px 0px;
    text-decoration: none;
    color: #fff;
}

.addthis_toolbox .hover_menu.like a
{
	padding-left: 10px;
}

.addthis_toolbox .hover_menu a:hover
{
    text-decoration: underline;
}

.addthis_toolbox .hover_menu span
{
    position: absolute;
    left: 14px;
    top: 4px;
}