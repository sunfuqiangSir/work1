var fs = require("fs");
var url = require("url");
var path = require("path");

var gulp = require("gulp");
var server = require("gulp-webserver");




gulp.task("server", function () {
    gulp.src('./')
        .pipe(server({
            port: 8080,
            livereload: true,
            directoryListing: {
                path: "./",
                enable: true
            },
            middleware: function (req, res, next) {
                var urlObj = url.parse(req.url);
                var mockDataFile = path.join(__dirname, urlObj.query + ".json");
                console.log(mockDataFile);
                fs.exists(mockDataFile, function (exist) {
                    if (!exist) {
                        var data = {
                            isScuccess: false,
                            errMsg: "",
                            errCode: 1,
                            data: null
                        };

                        res.writeHead(404, {
                            "Content-Type": "text/json;charset=UTF-8",
                            "Access-Control-Allow-Origin": "http://localhost:63342"
                        });
                        res.end(JSON.stringify(data));
                    } else {
                        fs.readFile(mockDataFile, function (error, result) {
                            if (error) return console.error(error);
                            var data = {
                                isScuccess: true,
                                errMsg: "",
                                errCode: 1,
                                data: result.toString()
                            };
                            res.writeHead(200, {
                                "Content-Type": "text/json;charset=UTF-8",
                                "Access-Control-Allow-Origin": "http://localhost:63342"
                            });
                            res.end(JSON.stringify(data));

                        });
                    }
                });
            }
        }));
});