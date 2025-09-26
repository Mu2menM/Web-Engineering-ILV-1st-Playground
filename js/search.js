// search.js

document.querySelector('.search').addEventListener('submit', function (e) {
    e.preventDefault();

    // Remove old highlights
    document.querySelectorAll('.highlight').forEach(function (el) {
        var parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });

    var searchKey = this.q.value.trim();
    if (!searchKey) return;

    var regex = new RegExp(
        '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
        'gi'
    );

    function walk(node) {
        if (node.nodeType === 3) {
            var match = node.nodeValue.match(regex);
            if (match) {
                var span = document.createElement('span');
                span.innerHTML = node.nodeValue.replace(
                    regex,
                    '<mark class="highlight">$1</mark>'
                );
                node.replaceWith.apply(node, span.childNodes);
            }
        } else if (
            node.nodeType === 1 &&
            node.tagName !== 'SCRIPT' &&
            node.tagName !== 'STYLE' &&
            node.tagName !== 'FORM'
        ) {
            node.childNodes.forEach(walk);
        }
    }

    // ✅ Fix: only search inside article
    walk(document.querySelector('article'));
});
