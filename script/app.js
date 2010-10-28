(function($) {
    var decorateLinks = function() {
        var icons = {
            'github.com': 'git.png', 
            'news.ycombinator.com': 'hn.png',
            'ycombinator.com': 'hn.png',
            'en.wikipedia.org': 'wikipedia.png',
            'docs.google.com': 'google_docs.png',
            'spreadsheets.google.com': 'google_docs.png',
            'facebook.com': 'facebook.png',
            'twitter.com': 'twitter.png'
        };

        var getHostNoWWW = function(url) {
            var m = url && url.match(/^(https|http)\:\/\/([^\/]*)/);
            if (m) {
                if (m[2].indexOf("www.")===0) {
                    return m[2].substr("www.".length);
                } else {
                    return m[2];
                }
            }
        };
        $('a:not(.no-icon)').each(function(i, el) {
            
            var href = $(el).attr('href');
            var host = getHostNoWWW(href);
            var icon = icons[host];
            //console.info("href:"+href+" host:"+host+" icon:"+icon);
            if (icon) {
                icon = "/images/"+icon;
                $("<img src='"+icon+"' alt='"+host+"' class='site_icon' />").insertBefore(el);
            }
        });
    };

    var addSearchHandler = function() {
        $("#query").keypress(function(evt) {
            if (event.keyCode===13) {
                var val = encodeURIComponent($(evt.target).val());
                if ($("#search_google").attr("checked")) {
                    var url = "http://www.google.com/search?q=site:news.ycombinator.com+"+val;
                    window.open(url, "_blank");
                }
                if ($("#search_searchyc").attr("checked")) {
                    var url = "http://searchyc.com/"+val;
                    window.open(url, "_blank");
                }
                evt.preventDefault();
                return false;
            }
        });
    };

    $(document).ready(function() {
        decorateLinks();
        addSearchHandler();
    });

})(jQuery)
