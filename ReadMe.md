# How it works?

- You give it a list of site, and a list of screen resolution.
- It will catch screenshot for each site under each resolution

# How to use?

- unzip all file in one place
- modify and save the autoSiteScreenShot.js:
- run the Start.bat
- all the images will place under image_result

## modify example:

check the variable to customize

line 7 in the file autoSiteScreenShot.js

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

# Thank you
Thanks for use, please let me know what do you think.

# License Information

AutoSiteScreenShot.js is written by LiangWei.
It is open source, and is distributed under the BSD license.
It is based on https://github.com/ariya/phantomjs and it contains third-party code, see the included LICENSE.BSD file and third-party.txt file for the license information.
