#!/usr/bin/env bash
set -euo pipefail
mkdir -p public
# Pexels CC/free-to-use source pages:
# https://www.pexels.com/video/close-up-shot-of-a-person-preparing-sushi-8908334/
# https://www.pexels.com/video/woman-at-table-typing-on-phone-7550763/
try_pexels () {
 local id="$1" out="$2"
 for spec in "hd_1080_1920_25fps" "hd_1080_1920_30fps" "hd_720_1280_25fps" "hd_720_1280_30fps" "hd_1080_1920_24fps"; do
   local url="https://videos.pexels.com/video-files/${id}/${id}-${spec}.mp4"
   echo "Checking media: ${id} ${spec}"
   if curl -fLsS --retry 2 --connect-timeout 12 --max-time 80 -o "$out.download" "$url" && \
      ffprobe -v error -show_entries stream=codec_type -of csv=p=0 "$out.download" | grep -q video;then
      mv "$out.download" "$out"; echo "Ready $(du -h "$out")";return 0
   fi
 done
 return 1
}
if ! try_pexels 8908334 public/chef.mp4;then
 echo 'Pexels chef clip unavailable; using opening footage from pre-existing licensed EzSites ad asset';
 # only possible if caller supplied chef fallback, never silently substitute a blank clip
 test -s public/chef-fallback.mp4 || exit 24
 cp public/chef-fallback.mp4 public/chef.mp4
fi
if ! try_pexels 7550763 public/customer.mp4;then
 echo 'Trying another real cafe/phone shot';
 try_pexels 7339418 public/customer.mp4 || { echo 'No live customer footage downloaded';exit 26; }
fi
ffprobe -v error -show_entries format=duration -of default=nw=1 public/chef.mp4
ffprobe -v error -show_entries format=duration -of default=nw=1 public/customer.mp4