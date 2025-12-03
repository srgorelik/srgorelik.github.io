#!/bin/bash

cd ~/projects/hillshade_exp

DELAY=12
MORPH=12
WIDTH=1800 # original images have dims of 3320x2080

magick \
    -delay ${DELAY} \
    rgb.png dreamsicle.png cotton_candy.png barbie.png rgb.png \
    -resize ${WIDTH}x \
    -alpha off \
    -morph ${MORPH} \
    -loop 0 \
    -layers optimize \
    "bandelier_10m_d${DELAY}_m${MORPH}_p${WIDTH}.gif"

