exports.tests = {
	meta: {
		note:`checking discolorization in Chrome & firefox`,
		author:`tom byrer`,
		destRootFolder:`../avif-test-results/202105/`,
	},
	src_PNG_vs_avifTO_lossless7:{
		note:`Test if AVIF-lossless is truely lossless`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif/202105/squoosh/losssless7/`,
			destSub:`squoosh/lossless7/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif`],
			[`ia-forrest.png`,
			 `ia-forrest.avif`],
			[`pg-coral.png`,
			 `pg-coral.avif`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif`],
		],
	},
	src_PNG_vs_squoosh_avif_lossy7_chroma_off:{
		note:``,
		should:`equal`,
		total:true,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif/202105/squoosh/lossy7chomraoff/`,
			destSub:`squoosh/avif/lossy7chomraoff/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif`],
			[`ia-forrest.png`,
			 `ia-forrest.avif`],
			[`pg-coral.png`,
			 `pg-coral.avif`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif`],
		],
	},
}
