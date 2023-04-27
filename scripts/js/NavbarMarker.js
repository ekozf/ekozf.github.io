"use strict";
jQuery(function () {
    const url = window.location;
    $('.navbar ul li a').each(function () {
        const currElement = this;
        if (url.href === currElement.href) {
            MakeActive(currElement);
        }
        if (url.pathname == "/" && currElement.href.includes("Home")) {
            MakeActive(currElement);
        }
        if (currElement.href.includes("Article") && url.href.includes("Article")) {
            MakeActive(currElement);
        }
    });
    function MakeActive(element) {
        $(element).parent().addClass('nav-active');
    }
});
//# sourceMappingURL=NavbarMarker.js.map