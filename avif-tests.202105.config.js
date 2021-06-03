exports.tests = {
	meta: {
		note:`checking discolorization in Chrome & firefox`,
		author:`tom byrer`,
		destRootFolder:`../avif-results/202105/diff/squoosh/`,
	},
	src_PNG_vs_avif_lossless7_canary:{
		note:`Test if AVIF-lossless is truely lossless in canary`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossless7/canary/`,
			destSub:`lossless7/canary/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../png/202105/`,
				compare:`../avif/202105/squoosh/losssless7/`,
			}
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
	src_PNG_vs_avif_lossless7_fxdev:{
		note:`Test if AVIF-lossless is truely lossless in fxdev`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossless7/fxdev/`,
			destSub:`lossless7/fxdev/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../png/202105/`,
				compare:`../avif/202105/squoosh/losssless7/`,
			}
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

	src_PNG_vs_avif_lossy7chromahalf_canary:{
		note:`Test AVIF-lossy with Chroma half (default) in canary`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromahalf/canary/`,
			destSub:`lossy7chromahalf/canary/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../png/202105/`,
				compare:`../avif/202105/squoosh/lossy7chromahalf/`,
			}
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
	src_PNG_vs_avif_lossy7chromahalf_fxdev:{
		note:`Test if AVIF-lossy with Chroma half (default) in fxdev`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromahalf/fxdev/`,
			destSub:`lossy7chromahalf/fxdev/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../png/202105/`,
				compare:`../avif/202105/squoosh/lossy7chromahalf/`,
			}
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

	src_PNG_vs_avif_lossy7chromaoff_canary:{
		note:`Test if AVIF-lossy with Chroma OFF in canary`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromaoff/canary/`,
			destSub:`lossy7chromaoff/canary/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../png/202105/`,
				compare:`../avif/202105/squoosh/lossy7chromaoff/`,
			}
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
	src_PNG_vs_avif_lossy7chromaoff_fxdev:{
		note:`Test if AVIF-lossy with Chroma OFF (default) in fxdev`,
		should:`equal`,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif-results/202105/screenshots/lossy7chromaoff/fxdev/`,
			destSub:`lossy7chromaoff/fxdev/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../png/202105/`,
				compare:`../avif/202105/squoosh/lossy7chromaoff/`,
			}
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

	avif_lossy7_chroma_half_vs_off_canary:{
		note:`Test AVIF-lossy, Chroma half vs OFF in canary`,
		should:`equal`,
		folders:{
			orig:`../avif-results/202105/screenshots/lossy7chromahalf/canary/`,
			compare :`../avif-results/202105/screenshots/lossy7chromaoff/canary/`,
			destSub:`lossy7-chroma-halfvsoff/canary/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../avif/202105/squoosh/lossy7chromahalf/`,
				compare:`../avif/202105/squoosh/lossy7chromaoff/`,
			}
		},
		pairs:[
			[`cs-gray-7f7f7f.avif.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.avif.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.avif.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.avif.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
	avif_lossy7_chroma_half_vs_off_fxdev:{
		note:`Test AVIF-lossy, Chroma half vs OFF in fxdev`,
		should:`equal`,
		folders:{
			orig:`../avif-results/202105/screenshots/lossy7chromahalf/fxdev/`,
			compare :`../avif-results/202105/screenshots/lossy7chromaoff/fxdev/`,
			destSub:`lossy7-chroma-halfvsoff/fxdev/`,
			// for filesize only: AVIF folder
			src:{
				orig:`../avif/202105/squoosh/lossy7chromahalf/`,
				compare:`../avif/202105/squoosh/lossy7chromaoff/`,
			}
		},
		pairs:[
			[`cs-gray-7f7f7f.avif.png`,
			 `cs-gray-7f7f7f.avif.png`],
			[`ia-forrest.avif.png`,
			 `ia-forrest.avif.png`],
			[`pg-coral.avif.png`,
			 `pg-coral.avif.png`],
			[`web-jakearchibald.avif.png`,
			 `web-jakearchibald.avif.png`],
		],
	},
}
