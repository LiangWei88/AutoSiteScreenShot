// Render Multiple URLs in Multiple Resolution screen to files
// from exemple of phantomjs
// rewrite and add diffent resolution screen shot by LiangWei
// @todo verify the page title as file name not contain invalide character

// variable to customize
var arrayOfUrls = [
    "google.com",
    "bing.com",
    "guang.fr"
];
var arrayOfsize = [
    [1280, 1024],
    [1024, 768],
    [320,568]
];
// end of variable to customize

//main function for screenshot
//don't change it unless you understand what it does.
RenderUrlsToFile = function(urls, screenSize, callbackPerUrl, callbackFinal) {
    var getFilename, next, page, retrieve, webpage;
    webpage = require("webpage");
    page = null;
    getFilename = function(title) {
        var shortTitle = title.substr(0, 16);
        var file_name = file_location +
                        shortTitle + "-" +
                        screenSize[0] + "-" +
                        date_in_filename +
                        ".jpg";

        return file_name;
    };
    next = function(status, url, file) {
        page.close();
        callbackPerUrl(status, url, file);
        return retrieve();
    };
    retrieve = function() {
        var url;
        if (urls.length > 0) {
            url = urls.shift();
            page = webpage.create();
            page.viewportSize = {
                width: screenSize[0],
                height: screenSize[1]
            };
            page.settings.userAgent = "Phantom.js bot";
            return page.open("http://" + url, function(status) {
                var file;
                var title = page.evaluate(function() {
                    return document.title;
                });
                file = getFilename(title);
                if (status === "success") {
                    return window.setTimeout((function() {
                        page.render(file);
                        return next(status, url, file);
                    }), 200);
                } else {
                    return next(status, url, file);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};

function beginShotEachSize() {
    var screen_size = arrayOfsize.shift();
    var urls= arrayOfUrls.slice();

    RenderUrlsToFile(urls, screen_size,
        function(status, url, file) {
            if (status !== "success") {
                return console.log("Unable to render '" + url + "'");
            } else {
                return console.log("Rendered '" + url + "' at '" + file + "'");
            }
        },
        function() {
            if (arrayOfsize.length > 0) {
                beginShotEachSize();
            }else{
                console.log('End Screenshot');
                return phantom.exit();
            }
        }
    );
}

var date = new Date();
var monthCurrent = date.getMonth()+1;
var date_in_filename = date.getDate() + '-' + monthCurrent;
var file_location = 'image_result/';
console.log('Begin Screenshot...');
beginShotEachSize();
