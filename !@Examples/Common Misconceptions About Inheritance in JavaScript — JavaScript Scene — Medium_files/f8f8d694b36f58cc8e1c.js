document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist/embed-96b381ce99ea3f3992dd62a82c473dee1b60584214ce1e82543f5cbbe4c56b94.css">')
document.write('<div id=\"gist21492885\" class=\"gist\">\n        <div class=\"gist-file\">\n          <div class=\"gist-data\">\n            <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-super-ninjamouse-js\" class=\"file\">\n    \n\n  <div class=\"blob-wrapper data type-javascript\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\">// I&#39;m not sure Object.assign() is available (ES6)<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC2\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\">// so this time I&#39;ll use Lodash. It&#39;s like Underscore,<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC3\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\">// with 200% more awesome. You could also use<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC4\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\">// jQuery.extend() or Underscore&#39;s _.extend()<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC5\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">var<\/span> assign <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">require<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>lodash/object/assign<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC6\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC7\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">var<\/span> skydiving <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">require<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>skydiving<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC8\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">var<\/span> ninja <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">require<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>ninja<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC9\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">var<\/span> mouse <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">require<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>mouse<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC10\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">var<\/span> wingsuit <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">require<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>wingsuit<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC11\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC12\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\">// The amount of awesome in this next bit might be too much<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC13\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\">// for seniors with heart conditions or young children.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC14\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">var<\/span> skydivingNinjaMouseWithWingsuit <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">assign<\/span>({}, <span class=\"pl-c\">// create a new object<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-super-ninjamouse-js-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-super-ninjamouse-js-LC15\" class=\"blob-code blob-code-inner js-file-line\">  skydiving, ninja, mouse, wingsuit); <span class=\"pl-c\">// copy all the awesome to it.<\/span><\/td>\n      <\/tr>\n<\/table>\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n          <\/div>\n          <div class=\"gist-meta\">\n            <a href=\"https://gist.github.com/ericelliott/f8f8d694b36f58cc8e1c/raw/de4b38241c1ec8ee59071ed80d761ae97155960d/super-ninjamouse.js\" style=\"float:right\">view raw<\/a>\n            <a href=\"https://gist.github.com/ericelliott/f8f8d694b36f58cc8e1c#file-super-ninjamouse-js\">super-ninjamouse.js<\/a>\n            hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n          <\/div>\n        <\/div>\n<\/div>\n')
