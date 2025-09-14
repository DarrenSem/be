/*jshint node:false, jquery:true, strict:false */
$(function() {

  read_settings_from_cookie();
  (!!"DEBUG_SKIP_PACKAGE_JSON package.json") ? ( function(data) {
    $('#version-number').text('(v' + data.version + ')');
  } )(
{
  "name": "js-beautify",
  "version": "1.15.4",
  "description": "beautifier.io for node",
  "main": "js/index.js",
  "bin": {
    "css-beautify": "./js/bin/css-beautify.js",
    "html-beautify": "./js/bin/html-beautify.js",
    "js-beautify": "./js/bin/js-beautify.js"
  },
  "directories": {
    "lib": "js/lib",
    "test": "js/test"
  },
  "files": [
    "js/bin/",
    "js/lib/*.js",
    "js/lib/unpackers/",
    "js/index.js",
    "js/src/"
  ],
  "scripts": {},
  "bugs": "https://github.com/beautifier/js-beautify/issues",
  "homepage": "https://beautifier.io/",
  "repository": {
    "type": "git",
    "url": "git://github.com/beautifier/js-beautify.git"
  },
  "keywords": [
    "beautify",
    "beautifier",
    "code-quality"
  ],
  "author": "Einar Lielmanis <einar@beautifier.io>",
  "contributors": [
    "Vital Batmanov <vital76@gmail.com>",
    "Chris J. Shull <chrisjshull@gmail.com>",
    "Gian Marco Gherardi <gianmarco.gherardi@gmail.com>",
    "Stan <stasson@orc.ru>",
    "Vittorio Gambaletta <VittGam@vittgam.net>",
    "Daniel Stockman <daniel.stockman@gmail.com>",
    "Harutyun Amirjanyan <amirjanyan@gmail.com>",
    "Nochum Sossonko <nsossonko@hotmail.com>",
    "Liam Newman <bitwiseman@beautifier.io>"
  ],
  "license": "MIT",
  "engines": {
    "node": ">=14"
  },
  "browserslist": "ie 11",
  "dependencies": {
    "config-chain": "^1.1.13",
    "editorconfig": "^1.0.4",
    "glob": "^10.4.2",
    "js-cookie": "^3.0.5",
    "nopt": "^7.2.1"
  },
  "devDependencies": {
    "ansi-regex": "^6.0.1",
    "benchmark": "^2.1.4",
    "codemirror": "^5.65.16",
    "jquery": "^3.6.4",
    "jshint": "^2.13.6",
    "minimist": "^1.2.8",
    "mocha": "^11.0.1",
    "mustache": "^4.2.0",
    "requirejs": "^2.3.6",
    "serve": "^14.2.0",
    "strip-ansi": "^7.0.1",
    "webpack": "^5.81.0",
    "webpack-cli": "^6.0.1"
  }
}
  ) :
  $.getJSON("./package.json", function(data) {
    $('#version-number').text('(v' + data.version + ')');
  });

  var default_text =
    "// This is just a sample script. Paste your real code (javascript or HTML) here.\n\nif ('this_is'==/an_example/){of_beautifier();}else{var a=b?(c%d):e[f];}";
  var textArea = $('#source')[0];
  $('#source').val(default_text);

  if (the.use_codemirror && typeof CodeMirror !== 'undefined') {

    the.editor = CodeMirror.fromTextArea(textArea, {
      lineNumbers: true
    });

    set_editor_mode();
    the.editor.focus();

    $('.CodeMirror').click(function() {
      if (the.editor.getValue() === default_text) {
        the.editor.setValue('');
      }
    });
  } else {
    $('#source').bind('click focus', function() {
      if ($(this).val() === default_text) {
        $(this).val('');
      }
    }).bind('blur', function() {
      if (!$(this).val()) {
        $(this).val(default_text);
      }
    });
  }

  setPreferredColorScheme();

  $(window).bind('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
      beautify();
    }
  });

  if (typeof window.navigator !== "undefined" && typeof window.navigator.platform === "string" && window.navigator.platform.includes("Mac")) {
    $(".submit em").text("(cmd-enter)");
  }

  $('.submit').click(beautify);
  $('select').change(beautify);
  $(':checkbox').change(beautify);
  $('#additional-options').change(beautify);




});
