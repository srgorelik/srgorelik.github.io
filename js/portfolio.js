$(document).ready(function () {
    // Save the original gallery HTML so we can reset cleanly
    const originalGalleryHtml = $("#gallery").html();

    // Track whether we're currently in "mobile" mode
    let isMobile = $(window).width() < 650;

    let lgInstance = null; // lightGallery instance

    function initGallery() {
        const rowHeight = isMobile ? 260 : 180;

        // Reset gallery DOM and destroy previous plugins
        $("#gallery")
            .justifiedGallery('destroy')   // safe even if not initialized yet
            .off("jg.complete")            // avoid stacking listeners
            .html(originalGalleryHtml)     // restore original items
            .justifiedGallery({
                captions: false,
                lastRow: "hide",
                rowHeight: rowHeight,
                margins: 8
            })
            .on("jg.complete", function () {
                // Destroy previous lightGallery instance if any
                if (lgInstance) {
                    lgInstance.destroy(true);
                }
                lgInstance = window.lightGallery(
                    document.getElementById("gallery"),
                    {
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

    // Initial load
    initGallery();

    // Re-init ONLY when we cross the 480px breakpoint
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const newIsMobile = $(window).width() < 480;

            // Only rebuild if we switched between mobile/desktop
            if (newIsMobile !== isMobile) {
                isMobile = newIsMobile;
                initGallery();
            }
        }, 200);
    });
});
