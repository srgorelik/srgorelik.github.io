#!/usr/bin/env Rscript

library(magick)

imgs <- list.files(path = 'img/full', full.names = T)

downsample.image <- function(f.in, sizes = c(400, 600)) {

	# read image and get file name and extension
	img <- image_read(f.in)
	f.name <- tools::file_path_sans_ext(basename(f.in))
	f.ext <- tools::file_ext(f.in)

	# first convert input to png
	if (f.ext != 'png') {
		f.png <- gsub(f.ext, 'png', f.in)
		image_write(img, path = f.png, format = 'png')
		unlink(f.in)
	}

	# resize image proportionally to width sizes provided
	for (size in sizes) {
		img.scaled <- image_scale(img, paste0(size, 'x'))
		dir.out <- paste0('img/p', size)
		dir.create(dir.out, recursive = T, showWarnings = F)
		f.out <- paste0(dir.out, '/', f.name, '_', size, '.png')
		image_write(img.scaled, path = f.out, format = 'png')
	}
}

catch <- lapply(imgs, downsample.image, sizes = c(600))
