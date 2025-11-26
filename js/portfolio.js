function initGallery() {
	// set row height larger if on small screen
    let rowHeight = ($(window).width() < 480) ? 360 : 180;

    $("#gallery")
        .justifiedGallery('destroy') // important: clean reset
        .empty()                     // required before re-init (keeps DOM sane)
        .append(window._galleryItems) // restore items
        .justifiedGallery({
            captions: false,
            lastRow: "hide",
            rowHeight: rowHeight,
            margins: 8
        })
        .on("jg.complete", function () {
            lightGallery(
                document.getElementById("gallery"), {
                    plugins: [lgZoom],
                    download: false,
                    mode: 'lg-fade',
                    height: '95%',
                    mousewheel: true,
                    mobileSettings: {
                        controls: false,
                        showCloseIcon: true,
                        download: false,
                        rotate: false
                    }
                }
            );
        });
}

$(document).ready(function () {
    // store original content to re-insert on re-init
    window._galleryItems = $("#gallery").children().clone();

    initGallery();

    // debounce resize handler (smooth and efficient)
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            initGallery();
        }, 250);
    });
});
