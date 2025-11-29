$(document).ready(function () {
    const originalGalleryHtml = $("#gallery").html();

    let lastWidth = window.innerWidth || $(window).width();
    let isMobile = lastWidth < 480;
    let lgInstance = null;

    function initGallery() {
        const rowHeight = isMobile ? 360 : 160;

        $("#gallery")
            .justifiedGallery('destroy')
            .off("jg.complete")
            .html(originalGalleryHtml)
            .justifiedGallery({
                captions: false,
                lastRow: "hide",
                rowHeight: rowHeight,
                margins: 20
            })
            .on("jg.complete", function () {
                if (lgInstance) {
                    lgInstance.destroy(true);
                }
                lgInstance = window.lightGallery(
                    document.getElementById("gallery"),
                    {
                        plugins: [lgZoom, lgFullscreen],
                        download: false,
                        mode: 'lg-fade',
                        height: '95%',
                        mousewheel: true,
                        actualSize: false,
                        mobileSettings: {
                            controls: false,
                            showCloseIcon: true,
                            download: false,
                            rotate: false,
                            fullScreen: false
                        }
                    }
                );
            });
    }

    // initial load
    initGallery();

    let resizeTimer;
    $(window).on('resize', function () {
        const currentWidth = window.innerWidth || $(window).width();

        // ignore address-bar resize jitter on mobile
        if (Math.abs(currentWidth - lastWidth) < 10) {
            return;
        }
        lastWidth = currentWidth;

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const newIsMobile = currentWidth < 480;

            // only rebuild if we *actually* switch categories
            if (newIsMobile !== isMobile) {
                isMobile = newIsMobile;
                initGallery();
            }
        }, 200);
    });
});
