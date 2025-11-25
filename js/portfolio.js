jQuery("#gallery")
	.justifiedGallery({
		captions: false,
		lastRow: "hide",
		rowHeight: 180,
		margins: 8
	})
	.on("jg.complete", function () {
		window.lightGallery(
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