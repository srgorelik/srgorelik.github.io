jQuery("#gallery")
	.justifiedGallery({
		captions: false,
		lastRow: "hide",
		rowHeight: 180,
		margins: 5
	})
	.on("jg.complete", function () {
		window.lightGallery(
			document.getElementById("gallery"), {
				plugins: [lgZoom],
				download: false,
				mobileSettings: {
					controls: false,
					showCloseIcon: false,
					download: false,
					rotate: false
				}
			}
		);
	});