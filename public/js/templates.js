this["JST"] = this["JST"] || {};

this["JST"]["message"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="media">\n\t<div class="media-left">\n\t\t<img src="' +((__t = ( avatar )) == null ? '' : __t) +'" width="50px">\n\t</div>\n\t<div class="media-body">\n\t\t<h4 class="media-heading">' +((__t = ( nickname )) == null ? '' : __t) +'</h4> \n\t\t' +((__t = ( message )) == null ? '' : __t) +'\n\t</div>\n</div';}return __p};

this["JST"]["status"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="alert alert-' +((__t = ( status )) == null ? '' : __t) +'" role="alert">\n\t' +((__t = ( message )) == null ? '' : __t) +'\n</div>';}return __p};