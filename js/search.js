console.log("Using named constants for clarity");

const NODE_TYPE = {
    ELEMENT: 1,
    TEXT: 3
};

export const initializeSearchHighlighter = () => {
    document.querySelector(".search").addEventListener("submit", (e) => {
        e.preventDefault();

        document.querySelectorAll(".highlight").forEach((el) => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });

        const searchKey = e.target.q.value.trim();
        if (!searchKey) return;

        const regex = new RegExp(
            "(" + searchKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")",
            "gi"
        );

        const walk = (node) => {
            if (node.nodeType === NODE_TYPE.TEXT) {
                if (regex.test(node.nodeValue)) {
                    const span = document.createElement("span");
                    span.innerHTML = node.nodeValue.replace(
                        regex,
                        '<mark class="highlight">$1</mark>'
                    );
                    node.replaceWith(...span.childNodes);
                }
            } else if (
                node.nodeType === NODE_TYPE.ELEMENT &&
                node.tagName !== "SCRIPT" &&
                node.tagName !== "STYLE" &&
                node.tagName !== "FORM" &&
                document.querySelector("article").contains(node)
            ) {
                node.childNodes.forEach(walk);
            }
        };

        walk(document.querySelector("article"));
    });
};
