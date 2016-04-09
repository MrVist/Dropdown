(function() {
        function delegate(fn, params, obj, event) {
            return function(event) {
                var event = event || window.event;
                fn.call(obj || window, params, event);
            }
        }
        var drop_btns = document.querySelectorAll('.my-dropdown');
        for (var d = 0; d < drop_btns.length; d++) {
            var toggle = drop_btns[d].querySelector('button');
            var ul = drop_btns[d].querySelector('ul');

            function click(ul, event) {
                event.stopPropagation();
                var lis = ul.querySelectorAll('li');
                if (ul.style.display == 'none') {
                    ul.style.display = 'block';
                    if (window.addEventListener) {
                        document.addEventListener('click', function() {
                            if (ul.style.display == 'block')
                                ul.style.display = 'none';
                        });
                    } else
                        document.attachEvent('onclick', function() {
                            console.log(ul);
                            if (ul.style.display == 'block')
                                ul.style.display = 'none';
                        });
                } else {
                    ul.style.display = 'none';
                    return;
                }
                var left = -100;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].style.left = left + '%';
                }
                var index = 0;
                var interval = setInterval(function() {
                    var li = lis[index];
                    li.style.left = left + '%';
                    if (li.style.left == '0%') {
                        index++;
                        left = -102;
                    }
                    if (lis[lis.length - 1].style.left == '0%')
                        clearInterval(interval);
                    left += 2;
                }, 1);

            };
            toggle.onclick = delegate(click, ul, toggle);
        }
    })();