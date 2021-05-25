/* SVGs used in image output creation */

const svgHeadline = `<svg viewBox="0 0 400 400" width="400" height="400" xmlns="http://www.w3.org/2000/svg" style="background:green;">
<rect width="16" height="400" fill="{{fill}}" />
<rect width="368" height="400" x="16" fill="#0c151c" />
<rect width="16" height="400" x="384" fill="{{fill}}" />
<text x="50%" y="15" font-family="Helvetica" font-size="12px" fill="{{decriptioncolor}}" text-anchor="middle">{{decription}}</text>
<text x="50%" y="33" font-family="Helvetica" font-size="14px" fill="{{statuscolor}}" text-anchor="middle">{{headline}}</text>
</svg>`

exports.simple = svgHeadline
	.replace('{{decriptioncolor}}', '#eeeffd')
	.replace('{{decription}}', 'Image Diff : {{title}}')

exports.amplify = svgHeadline
	.replace('{{decriptioncolor}}', '#ffa599')
	.replace('{{decription}}', 'Amplified Diff : {{title}}')
