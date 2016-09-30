# iPresent, mobile mockup presenter

## Description

Show what your next mobile application or website will feels likes on iPad and Iphone with real transition between your interfaces. Keynotes are great, but there is no better way to show your iPhone/iPad ideas by presentating your designs on it!

Check the video below to see an example!
[![ScreenShot](https://secure-b.vimeocdn.com/ts/434/865/434865780_640.jpg)](https://vimeo.com/14049400)

## Getting started.

Embed jQuery, jQtouch & iPresent to your page, you can instantiate the plugin like below:

        <script>
            jQuery(document).ready(function($) {
                $(document).ipresent({
                    xml : "yourPresentation.xml"
                });
            });
        </script>

### The XML

The presentation is drived by an xml file, for each page and links you add an xml element:

		<!--This is how you include a mockup -->
		<interface id="main" src="cherry/Login.png" horizontal="cherry/Login.png">
			<!--This is how you include links -->
			<links href="reports" animation="slide" style="top: 387px; left:10px; width: 300px; height: 50px;"></links>
		</interface>

## Options

### width

You can change the width of the app using the following xml element, the width must match the width of your images for a better experience.

	<size width="320px"></size>	

Be sure to have your images following that format

### Dock icon & startup screen

	<!-- Your dock icon on the iphone -->
	<dockIcon src="jqtouch.png"></dockIcon>	
	<!-- Your Startup Screen when your presentation is loading -->
	<startupScreen src="loader.jpg"></startupScreen>	

### Orientation changes
If you have mockups for both screen orientation you can add this option to enable oriantation change mode. 
	<!--Do you have images for the horizontal mode? -->
	<screenOrientationChange mode="false"></screenOrientationChange>

## Limitation

This project was created a couple of years ago and while I refreshed it a bit, it only support an old version of jQtouch and jQuery, be advise.

Mobile Support
Iphone ios4+
Android 4+


## License (MIT)

Copyright 2013 Cedric Dugas
http://me.position-absolute.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
