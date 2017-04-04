const packager = require("electron-packager");

packager({
    dir: ".",
    platform: "win32",
    arch: "x64",
    overwrite: true,
    prune: true,
    ignore: "src",
    icon: "icon.ico",
    asar: true
}, function(error, appPaths) {
    if (error) {
        console.error(error);
    }
    else {
        console.log("Success");
    }

    console.log(appPaths);
});