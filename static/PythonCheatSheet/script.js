
document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('input[type="checkbox"]');
  
    toggle.addEventListener('change', function () {
      if (toggle.checked) {
        console.log('Checked');
        document.querySelector('html').style.filter = 'invert(95%)'
      } else {
        console.log('Not checked');
        document.querySelector('html').style.filter = 'invert(0%)'
      }
    });
  });


/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


// window.print();

var Config = {};
Config.pixelsPerInch = 96;
Config.pageHeightInCentimeter = 29.7; // must match 'min-height' from 'css/sheets-of-paper-*.css' being used
Config.pageMarginBottomInCentimeter = 2; // must match 'padding-bottom' and 'margin-bottom' from 'css/sheets-of-paper-*.css' being used

window.addEventListener("DOMContentLoaded", function () {
    applyPageBreaks();
});

function applyPageBreaks() {
    applyManualPageBreaks();
    applyAutomaticPageBreaks(Config.pixelsPerInch, Config.pageHeightInCentimeter, Config.pageMarginBottomInCentimeter);

    document.querySelectorAll(".document .page").forEach(function (element) {
        if (!element.classList.contains("has-events")) {
            element.addEventListener("blur", function () {
                applyPageBreaks();
            });

            element.classList.add("has-events");
        }
    });
}

/* Applies any manual page breaks in preview mode (screen, non-print) where CSS Paged Media is not fully supported */
function applyManualPageBreaks() {
    var docs, pages, snippets;
    docs = document.querySelectorAll(".document");

    for (var d = docs.length - 1; d >= 0; d--) {
        pages = docs[d].querySelectorAll(".page");

        for (var p = pages.length - 1; p >= 0; p--) {
            snippets = pages[p].children;

            for (var s = snippets.length - 1; s >= 0; s--) {
                if (snippets[s].classList.contains("page-break")) {
                    pages[p].insertAdjacentHTML("afterend", "<div class=\"page\" contenteditable=\"false\"></div>");

                    for (var n = snippets.length - 1; n > s; n--) {
                        pages[p].nextElementSibling.insertBefore(snippets[n], pages[p].nextElementSibling.firstChild);
                    }

                    snippets[s].remove();
                }
            }
        }
    }
}

/* Applies (where necessary) automatic page breaks in preview mode (screen, non-print) where CSS Paged Media is not fully supported */
function applyAutomaticPageBreaks(pixelsPerInch, pageHeightInCentimeter, pageMarginBottomInCentimeter) {
    var inchPerCentimeter = 0.393701;
    var pageHeightInInch = pageHeightInCentimeter * inchPerCentimeter;
    var pageHeightInPixels = Math.ceil(pageHeightInInch * pixelsPerInch);
    var pageMarginBottomInInch = pageMarginBottomInCentimeter * inchPerCentimeter;
    var pageMarginBottomInPixels = Math.ceil(pageMarginBottomInInch * pixelsPerInch);
    var docs, pages, snippets, pageCoords, snippetCoords;
    docs = document.querySelectorAll(".document");

    for (var d = docs.length - 1; d >= 0; d--) {
        pages = docs[d].querySelectorAll(".page");

        for (var p = 0; p < pages.length; p++) {
            if (pages[p].clientHeight > pageHeightInPixels) {
                pages[p].insertAdjacentHTML("afterend", "<div class=\"page\" contenteditable=\"false\"></div>");
                pageCoords = pages[p].getBoundingClientRect();
                snippets = pages[p].querySelectorAll("h1, h2, h3, h4, h5, h6, p, ul, ol");

                for (var s = snippets.length - 1; s >= 0; s--) {
                    snippetCoords = snippets[s].getBoundingClientRect();

                    if ((snippetCoords.bottom - pageCoords.top + pageMarginBottomInPixels) > pageHeightInPixels) {
                        pages[p].nextElementSibling.insertBefore(snippets[s], pages[p].nextElementSibling.firstChild);
                    }
                }

                pages = docs[d].querySelectorAll(".page");
            }
        }
    }
}