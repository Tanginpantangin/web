angular.module('ngClipboard', [])

    .factory('ngClipboard', function($document) {
        // Plain-text copy: user input is never parsed as HTML and never compiled by Angular.
        function toPlainText(value) {
            if (value === undefined || value === null) {
                return '';
            }
            return Array.isArray(value) ? value.join('\n') : String(value);
        }

        return {
            toPlainText: toPlainText,
            toClipboard: function(element) {
                var doc = $document[0];
                var copyElement = doc.createElement('span');
                copyElement.id = 'ngClipboardCopyId';
                copyElement.style.whiteSpace = 'pre-wrap';
                copyElement.textContent = toPlainText(element);
                doc.body.appendChild(copyElement);

                var range = doc.createRange();
                range.selectNodeContents(copyElement);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);

                var successful = false;
                try {
                    successful = doc.execCommand('copy');
                } catch (e) {
                    successful = false;
                }
                window.getSelection().removeAllRanges();
                doc.body.removeChild(copyElement);
                return successful;
            }
        };
    })

    .directive('ngCopyable', function() {
        return {
            restrict: 'A',
            link:link
        };
        function link(scope, element, attrs) {
            element.bind('click',function(){

                var range = document.createRange();
                range.selectNode(element[0]);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                var successful = document.execCommand('copy');

                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                window.getSelection().removeAllRanges();
            });
        }

    });
