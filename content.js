let disclaimer = "Disclaimer: This is my own personal opinion.";

function startWhenReady() {
  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      replaceComments();
    }
  };
}

function replaceComments() {
  let comments = document.querySelectorAll('div[id="-post-rtjson-content"]');

  comments.forEach(function (c) {
    let paragraphs = c.querySelectorAll("p");
    let p = paragraphs[paragraphs.length - 1];

    let disclaimerClass = "hasDisclaimer";
    if (!p.classList.contains(disclaimerClass)) {
      p.innerText = p.innerText + "\n\n" + disclaimer;
      p.classList.add(disclaimerClass);
    }
  });
}

function listenForChanges() {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var observer = new MutationObserver(function (mutations, observer) {
    replaceComments();
  });

  observer.observe(document, {
    subtree: true,
    attributes: true,
  });
}

startWhenReady();
listenForChanges();
