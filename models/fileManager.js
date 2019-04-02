/**
 * @file Manager for work with media files
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

const { exec } = require('child_process');

export default {

	getDuration(filepath, mimeType) {
		return new Promise((resolve) => {
			if (new RegExp(/^video\//).test(mimeType)) {
				exec(`ffmpeg -i ${filepath} 2>&1 | grep Duration | cut -d \' \' -f 4 | sed s/,// | sed s/\\\\./,/`, (err, stdout) => {
					if (err) console.error(err);
					else resolve(stdout.trim());
				});
			}
			else {
				resolve(null);
			}
		});
	}

}
