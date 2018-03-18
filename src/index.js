"use strict";
var $ = require('jquery');


$(document).ready(function () {

    const initText = [`Hi, I'm Evgeni and I specialize in Frontend Development.`,
        `Besides having good ping pong and code-debugging skills\n
I follow popular frontend trends.\n
I’m proficient in browser manipulation,\n
cross-browser compatibility, responsive design and in my free time\n
I play with new web frameworks and tools.\n
Of course there’s more:\n`,
        `Core Skills: HTML, CSS, Javascript and JQuery.\n
CSS Tools: SASS, LESS and Bootstrap\n
Javascript: ES6 (2015/16/17), lodash\n
Frameworks: Backbone, Angular 1.6, React, Redux, SAPUI5\n
Automation: NightwatchJS, Karma, Mocha, Chai, QUnit\n
Build Tools: Grunt, Webpack, NPM\n
Currently exploring: Rx.js, Vue.js, Node and Express`,
        `Where I worked:\n
Taboola: Since 2016 Executed and contributed to client side of the Video ads as FE developer.\n
SAP: 2014-2016 Contributed to WYSIWYG tool which is part of WebIDE as FE developer.\n
Previous life: Developed for number of enterprises as SAP ABAP Developer`
    ];

    const PRINT_DELAY = 50;
    var continueKey = 'tap on screen';
    var isPrinting;
    var c = 0;
    var lineCharsNum = 0;
    var delayedPrint;
    var runText = [];

    if (!isMobile()) {
        continueKey = 'press Enter';
    }

    const wellcomeText = `Wellcome to my profile. \n To read more ${continueKey}.`;

    start(initText);

    function start(textData) {
        printWelcome();
        runText = prepareText(textData);
        setKeysListeners();
    }

    function printWelcome() {
        isPrinting = true;
        c = 0;
        var lines = wellcomeText.split('\n');

        lineCharsNum = countCharsInBlock(lines);

        lines.forEach(function (line) {
            var newDiv = createAndAppendNewLineElement();
            $(newDiv).addClass('welcome');

            var lineElem = document.createElement('span');
            $(lineElem).addClass('line');

            for (var i = 0; i < line.length; i++) {
                $(newDiv).append(lineElem);

                (function (i) {
                    delayedPrint = setTimeout(insertCharIntoLine.bind(this, lineElem, newDiv, line[i]),
                        c++ * PRINT_DELAY);
                })(i);
            }
        });
    }

    function prepareText(runText) {
        return runText.slice(0).reverse();
    }

    function setKeysListeners() {
        $(document).on('keypress', onKeyboardEventHandler);
        $(document).on('touchend', onKeyboardEventHandler);
        $('#skipButton').click(function () {
            skipAll();
        });
        $('#restartButton').click(function () {
            restart();
        });
    }

    function onKeyboardEventHandler(e) {
        if (isPrinting) {
            return;
        }
        if (e.which === 13 || e.type === 'touchend') {
            $('.welcome').remove();
            printNextLine(runText.pop());
        }
    }

    function printNextLine(currText) {
        isPrinting = true;
        c = 0;
        if (currText) {
            var lines = currText.split('\n');
            lines = clearEmptyLines(lines);
            lineCharsNum = countCharsInBlock(lines);

            lines.forEach(function (line) {
                printLine(line);
            });
            $('.container').append('<br>');
        }
    }

    function printLine(line) {
        var newDiv = createAndAppendNewLineElement();
        removeBlinker();

        var lineElem = document.createElement('span');
        $(lineElem).addClass('line');

        for (var i = 0; i < line.length; i++) {
            $(newDiv).append(lineElem);

            (function (i) {
                delayedPrint = setTimeout(insertCharIntoLine.bind(this, lineElem, newDiv, line[i]),
                    c++ * PRINT_DELAY);
            })(i);
        }
    }

    function insertCharIntoLine(lineElem, newDiv, char) {
        lineElem.innerHTML = lineElem.innerHTML + char;
        lineCharsNum--;
        if (lineCharsNum === 0) {
            isPrinting = false;
            addBlinker(newDiv);
            scrollToBottom();
        }
    }

    function createAndAppendNewLineElement() {
        var newDiv = document.createElement('DIV');
        $(newDiv).addClass('newLine');
        $('.container').append(newDiv);
        return newDiv;
    }

    function addBlinker(newDiv) {
        var blinkElem = document.createElement('span');
        $(blinkElem).addClass('blinking');
        blinkElem.innerHTML = '_';
        $(newDiv).append(blinkElem);
    }

    function removeBlinker() {
        $('.blinking').remove();
    }

    function skipAll() {
        console.log('skipp all');
        let fullText = initText.slice(0);
        clearTimeout(delayedPrint);
        $('.container').empty();

        fullText.forEach(function (lineStr) {
            printLineNormal(lineStr);
        });
        addBlinker($('line').last());
        removeListeners();
        scrollToBottom();
    }

    function restart() {
        console.log('restart');
        clearTimeout(delayedPrint);
        $('.container').empty();
        start(initText);
    }

    function countCharsInBlock(lines) {
        let lineCharsNum = 0;
        lines.forEach(function (line) {
            lineCharsNum = lineCharsNum + line.length;
        });
        return lineCharsNum;
    }

    function clearEmptyLines(lines) {
        return lines.filter(function (val) {
            if (val.trim()) return val;
        });
    }

    function printLineNormal(allLine) {
        removeBlinker();

        let lines = allLine.split('\n');
        lines = clearEmptyLines(lines);
        var lineCharsNum = countCharsInBlock(lines);

        lines.forEach(function (line) {
            let newDiv = createAndAppendNewLineElement();
            let lineElem = document.createElement('span');
            $(lineElem).addClass('line');

            for (let i = 0; i < line.length; i++) {
                $(newDiv).append(lineElem);
                insertCharIntoLine(lineElem, newDiv, line[i]);
            }
        });
        $('.container').append('<br>');
    }

    function removeListeners() {
        $(document).off('keypress', onKeyboardEventHandler);
        $(document).off('touchend', onKeyboardEventHandler);
    }

    function scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    function isMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
});