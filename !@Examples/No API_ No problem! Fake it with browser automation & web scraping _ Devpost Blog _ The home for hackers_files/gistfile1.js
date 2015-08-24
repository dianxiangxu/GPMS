// REQUIRES:
//   http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
//   http://static.tumblr.com/fpifyru/VCxlv9xwi/writecapture.js
// Based on: https://gist.github.com/1395926
$(document).ready(function() {
    $('.gist').each(function(i) {
        var file_separator = $(this).text().indexOf('#');
        if (file_separator != -1) {
            var gist_url        = $(this).text().slice(0, file_separator);
            var gist_file       = $(this).text().slice(file_separator).replace("#file_", "?file=");
            var gist_script_src = gist_url + '.js' + gist_file;
            writeCapture.html(this, '<script src="'+gist_script_src+'"></script>');
        } else {
            writeCapture.html(this, '<script src="'+$(this).text()+'.js"></script>');
        }
    });
});