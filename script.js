$(function() {

    var continueKey = 'Tap on screen';
    var isPrinting;
    var c = 0;
    var lineCharsNum = 0;

    if (!isMobile()) {
        continueKey = 'Press Enter';
    }
    //var allText = [`Wellcome to Evgeni's profile. \n ${continueKey} to continue.`];
    var allText = [`1 Lorem ipsum dolor \n sed do eiusmod tempor`,
        `2 Lorem ipsum dolor \n sed do eiusmod tempor`,
        `3 Lorem ipsum dolor \n sed do eiusmod tempor`,
        `4 Lorem ipsum dolor \n sed do eiusmod tempor`
    ];
    allText = allText.reverse();

    var nLineElem = document.createElement('span');
    nLineElem.innerHTML = '_';
    $(nLineElem).addClass('blinking');
    $('body').prepend(nLineElem);

    $(document).keypress(function(e) {
        if (isPrinting) {
            return;
        }
        if (e.which === 13) {
            printNextLine(allText.pop());
        }
    });

    printNextLine(`Wellcome to Evgeni's profile. \n ${continueKey} to continue.`);

    function printNextLine(currText) {
        console.log('print next line');

        isPrinting = true;
        c = lineCharsNum = 0;

        if (currText) {
            var lines = currText.split('\n');

            lines.forEach(function(line) {
                lineCharsNum = lineCharsNum + line.length;
            });

            lines.forEach(function(line) {
                printLine(line);
            });
        }
    }

    function printLine(line) {
        var nLineElem = document.createElement('h2');
        $('body').last().before(nLineElem);

        for (var i = 0; i < line.length; i++) {
            (function(i) {
                setTimeout(function() {
                    nLineElem.innerHTML = nLineElem.innerHTML + line[i];

                    lineCharsNum--;

                    if (lineCharsNum === 0) {
                        isPrinting = false;
                    }
                }, c++ * 100);
            })(i);
        }
        //setTimeout(function() {
        //    if (c === lineCharsNum) {
        //        isPrinting = false;
        //    }
        //}, c++ * 100);
    }
});

function isMobile() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

/**
var logStyle = {
    h1: 'color: red; font-size: 22px;',
    h3: 'color: red; font-size: 18px;',
    p: 'color: blue; font-size: 14px;',
};

console.log('%c Hi! My name is Evgeni and this is my profile.',
    logStyle.h1);
console.log('%c Type "Help" for instructions.', logStyle.h3);


window.help = window.Help =
    'For more information about me type "Profile"'
window.Profile = window.profile =
    'Front End Developer - Video Units team \n' +
    '- Executed and contributed to client side of the Video ads, with an emphasis on front end features, browser manipulation, and cross-browser compatibility. \n' +
    '- Maintaining and adding features to the Taboola Video Ads Studio. \n' +
    '- Developed and design internal tools for the Video group at Taboola. \n' +
    '- Developed and contributed to the E2E automation infrastructure of the Video ads. \n' +
    '- Workflow tools included: JS(+ES6), HTML, CSS, SASS, Bootstrap, jQuery, Backbone, Angular 1.x, NightwatchJS, Grunt and Git. \n' +
    '- Constant communication with other teams such as Backend, Product and Support. \n';


    */
