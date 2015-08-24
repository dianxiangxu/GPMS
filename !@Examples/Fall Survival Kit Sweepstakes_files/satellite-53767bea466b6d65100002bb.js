_satellite.pushAsyncScript(function(event, target, $variables){
  try {
$('input').data('header','searchbox').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      _satellite.track('searchenterkey');
    }
});
}

catch(err) {
}
});
