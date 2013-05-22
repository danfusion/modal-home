jQuery ModalHome
=================

A simple, mobile-friendly jQuery plugin for modal display windows.

Getting Started
---------------

You're free to download and use the already minifed files under the build directory or you can see the [Build Guide](#buildGuide) for instructions on how to build the files for yourself.

### Page Setup ###

The plugin requires jQuery <code>1.8.3+</code> as well as a css file to function properly. For example code look at the [index.html](index.html) page. Basic steps are to:
  1. Include the required css file: <code>&lt;link rel="stylesheet" href="css/modalHome.css" /&gt;</code>
  2. Include jQuery and the ModalHome code: <br><code>&lt;script src="js/jquery-1.8.3.min.js"&gt;&lt;/script&gt;</code><br><code>&lt;script src="js/jquery.modalHome.js"&gt;&lt;/script&gt;</code>
  3. Call the ModalHome code through a page action:
<code>
// inside some action
$.fn.modalHome({content: 'You clicked on the body element!'});
</code>

### Plugin Usage ###

The ModalHome plugin has three main ways to be setup. The basic syntax is generally the same for each: <code>$().modalHome('method',{data});</code>

### Methods ###

__Content__ - By calling the plugin with no method (the method defaults to 'init') and an object that contains a "content" variable with a string the modal will immediately open with the included string. Example: <code>$().modalHome({content: 'Lorem Ipsum'};</code>

__Ajax__ - The ajax method expects a url to load (required) and two optional variables that should contain success and failure functions respectively. Example:

```javascript
$().modalHome('ajax', {
    url: 'some url',
    success: function (data) { console.log('success', data); }, 
    failure: function (data) { console.log('failure', data) } 
});
```

In each case the data returned to the success or failure functions is a [jqXHR object](http://api.jquery.com/jQuery.ajax/#jqXHR). You can specify an exact failure message to be displayed in the modal window if you wish by specifying the "ajaxFailureContent" string in the object you pass into the plugin.

__jQuery Element__ - Chaining in a jQuery element will cause the modalHome plugin to gather it's data from the inner html of the selected element: <code>$('.someClass').modalHome();</code>

### Settings Object ###

For each method, it's possible to pass in a JSON object that specifies a variety of settings for the plugin. Anything from the css classes the plugin will use and generate to the messages it will display.

<table>
<tr>
    <th>Setting</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
</tr>
<tr>
    <td>content</td>
    <td>String/HTML</td>
    <td>blank</td>
    <td>This is required by the first ("init") method. This is the string or HTML code to be displayed in the modal.</td>
</tr>
<tr>
    <td>modalTopPadding</td>
    <td>Integer</td>
    <td>75</td>
    <td>This is the top "offset" from the top of the window. Scroll position + modalTopPadding = the "top" css setting for the modal container div.</td>
</tr>
<tr>
    <td>modalHomeBg</td>
    <td>String</td>
    <td>jhm-modal-bg</td>
    <td>This is the class for the background div that covers all page content.</td>
</tr>
<tr>
    <td>modalHomeDiv</td>
    <td>String</td>
    <td>jhm-modal</td>
    <td>This is the class for the main modal container div. All modal window content is placed inside this.</td>
</tr>
<tr>
    <td>modalHomeClose</td>
    <td>String</td>
    <td>jhm-modal-close</td>
    <td>This is the class for the close div inside the modal content container.</td>
</tr>
<tr>
    <td>modalHomeLoader</td>
    <td>String</td>
    <td>jhm-modal-loading</td>
    <td>This is the class for the "loading" div that is displayed as Ajax requests are being loaded.</td>
</tr>
<tr>
    <td>modalHomeContent</td>
    <td>String</td>
    <td>jhm-modal-content</td>
    <td>This is the class for the content div that is displayed below the closing and loading divs.</td>
</tr>
<tr>
    <td>modalHomeOpenEvent</td>
    <td>String</td>
    <td>jhm.modal.open</td>
    <td>This is the name of the event that's tied to opening the modal. Fire events with <code>$().trigger('event name')</code></td>
</tr>
<tr>
    <td>modalHomeOpenEvent</td>
    <td>String</td>
    <td>jhm.modal.close</td>
    <td>This is the name of the event that's tied to closing the modal. Fire events with <code>$().trigger('event name')</code></td>
</tr>
</table>

__Ajax Specific Settings__
<table>
<tr>
    <th>Setting</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
</tr>
<tr>
    <td>ajaxFailureContent</td>
    <td>String</td>
    <td>Blank</td>
    <td>This is the content that is loaded when an Ajax request fails. This is separate from the failure function that can be passed in through the Ajax method.</td>
</tr>
<tr>
    <td>success</td>
    <td>function</td>
    <td>null</td>
    <td>This function will be called when there is a successful Ajax call (see [jQuery.ajax() done()](http://api.jquery.com/jQuery.ajax/).</td>
</tr>
<tr>
    <td>failure</td>
    <td>function</td>
    <td>null</td>
    <td>This function will be called when there is failed Ajax call (see [jQuery.ajax() fail()](http://api.jquery.com/jQuery.ajax/).</td>
</tr>
</table>

Build Guide
-----------

This plugin uses [QUnit](http://qunitjs.com/) to run unit tests as well as [Grunt](http://gruntjs.com/) to minify and deploy files.

### QUnit ###
[QUnit](http://qunitjs.com/) will run without installation. Simply visit the [test page](tests.html) to run and view the test results.

### Grunt ###
[Grunt](http://gruntjs.com/) is used as the project build tool. If you haven't used Grunt before, please checkout their [Getting Started](http://gruntjs.com/getting-started) guide first. It will walk you through installing the CLI and basic procedures with Grunt. Please note that you will also need to have Node.js installed to run everything. The main Grunt plugins used are stored in a local folder that is checked out with the project. You can view the plugins in the "node_modules" directory.

### Grunt Build Commands ###

**grunt** - This will run the default task which in turn runs the jshint, qunit, css minification and javascript minification tasks. Minifed files will be outputted to the build/ directory

**grunt test** - This runs the jshint and qunit tasks but does not build the minified css and javascript files.

**grunt dist** - Purely a convenience function for me to allow the minified files to be automatically copied to a different project folder. Destination folder is set by the "distPath" property in the package.json file.

License
-------

jQuery ModalHome is licensed under the terms of the [MIT License](LICENSE-MIT).