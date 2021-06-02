exports.tests = {
	meta: {
		note:`checking discolorization in Chrome & firefox`,
		author:`tom byrer`,
		destRootFolder:`../avif-results/202105/diff/`,
	},
	src_PNG_vs_avifTO_lossless7_canary:{
		note:`Test if AVIF-lossless is truely lossless in canary`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossless7/canary/`,
			destSub:`squoosh/lossless7/canary/`,
			// to get AVIF filesizes only
			src:`../avif/202105/squoosh/losssless7/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
	src_PNG_vs_avifTO_lossless7_fxdev:{
		note:`Test if AVIF-lossless is truely lossless in fxdev`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossless7/fxdev/`,
			destSub:`squoosh/lossless7/fxdev/`,
			// to get AVIF filesizes only
			src:`../avif/202105/squoosh/losssless7/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
	src_PNG_vs_avifTO_lossy7chromahalf_canary:{
		note:`Test if AVIF-lossless in canary`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromahalf/canary/`,
			destSub:`squoosh/lossy7chromahalf/canary/`,
			// to get AVIF filesizes only
			src:`../avif/202105/squoosh/lossy7chromahalf/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
	src_PNG_vs_avifTO_lossy7chromahalf_fxdev:{
		note:`Test if AVIF-lossless in fxdev`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromahalf/fxdev/`,
			destSub:`squoosh/lossy7chromahalf/fxdev/`,
			// to get AVIF filesizes only
			src:`../avif/202105/squoosh/lossy7chromahalf/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
	src_PNG_vs_avifTO_lossy7chromaoff_canary:{
		note:`Test if AVIF-lossless in canary`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromaoff/canary/`,
			destSub:`squoosh/lossy7chromaoff/canary/`,
			// to get AVIF filesizes only
			src:`../avif/202105/squoosh/lossy7chromaoff/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
	src_PNG_vs_avifTO_lossy7chromaoff_fxdev:{
		note:`Test if AVIF-lossless in fxdev`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromaoff/fxdev/`,
			destSub:`squoosh/lossy7chromaoff/fxdev/`,
			// to get AVIF filesizes only
			src:`../avif/202105/squoosh/lossy7chromaoff/`,
		},
		pairs:[
			[`cs-gray-7f7f7f.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
}
