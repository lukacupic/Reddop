let disclaimer = "Disclaimer: This is my own personal opinion.";
let disclaimerClass = "hasDisclaimer";

function startWhenReady() {
    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            replaceComments();
        }
    }
}

function replaceComments() {
    let comments = document.querySelectorAll('[data-test-id="comment"] > div');
    
    comments.forEach(function (c) {
        let paragraphs = c.querySelectorAll("p");
        let p = paragraphs[paragraphs.length - 1];

        if (!p.classList.contains(disclaimerClass)) {
            p.innerText = p.innerText + "\n\n" + disclaimer;
            p.classList.add(disclaimerClass);
        }
    });
}

function listenForChanges() {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function (mutations, observer) {
        // console.log("Replacing comments...");
        replaceComments();
    });

    observer.observe(document, {
        subtree: true,
        attributes: true
    });
}

startWhenReady();
listenForChanges();