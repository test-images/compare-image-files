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
			destSub:`squoosh/lossless7/srcdiff/`,
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
	// src_PNG_vs_avif_canary_alt:{
	// 	note:`Squoosh AVIF-lossless Canry display manual screenshots on first Win10 computer`,
	// 	should:`equal`,
	// 	orig:`../png/202105/`,
	// 	compare :`/squoosh/lossless7/canary-alt/`,
	// 	destSub:`squoosh/lossless7/canary-alt/diff/`,
	// 	pairs:[
	// 		[`cs-gray-7f7f7f.png`,
	// 		 `cs-gray-7f7f7f.avif.png`],
	// 		[`ia-forrest.png`,
	// 		 `ia-forrest.avif.png`],
	// 		[`pg-coral.png`,
	// 		 `pg-coral.avif.png`],
	// 		[`web-jakearchibald.png`,
	// 		 `web-jakearchibald.avif.png`],
	// 	],
	// },
	// src_PNG_vs_avif_canary:{
	// 	note:`Squoosh AVIF-lossless Canry display manual screenshots on second Win10 computer`,
	// 	should:`equal`,
	// 	orig:`../png/202105/`,
	// 	compare :`/squoosh/lossless7/canary/`,
	// 	destSub:`squoosh/lossless7/canary/diff/`,
	// 	pairs:[
	// 		[`cs-gray-7f7f7f.png`,
	// 		 `cs-gray-7f7f7f.avif.png`],
	// 		[`ia-forrest.png`,
	// 		 `ia-forrest.avif.png`],
	// 		[`pg-coral.png`,
	// 		 `pg-coral.avif.png`],
	// 		[`web-jakearchibald.png`,
	// 		 `web-jakearchibald.avif.png`],
	// 	],
	// },
	// src_PNG_vs_avif_fxdev:{
	// 	note:`Squoosh AVIF-lossless renders losslessly in Firefox`,
	// 	should:`equal`,
	// 	orig:`../png/202105/`,
	// 	compare :`/squoosh/lossless7/fxdev/`,
	// 	destSub:`squoosh/lossless7/fxdev/diff/`,
	// 	pairs:[
	// 		[`cs-gray-7f7f7f.png`,
	// 		 `cs-gray-7f7f7f.avif.png`],
	// 		[`ia-forrest.png`,
	// 		 `ia-forrest.avif.png`],
	// 		[`pg-coral.png`,
	// 		 `pg-coral.avif.png`],
	// 		[`web-jakearchibald.png`,
	// 		 `web-jakearchibald.avif.png`],
	// 	],
	// },
	// src_PNG_vs_squoosh_avif_lossy7_chroma_half:{
	// 	note:``,
	// 	should:`equal`,
	// 	orig:`../png/202105/`,
	// 	compare :`../avif/202105/squoosh/lossy7chromahalf/`,
	// 	destSub:`../testresults/202105/squoosh/avif/lossy7chromahalf/srcdiff/`,
	// 	pairs:[
	// 		[`cs-gray-7f7f7f.png`,
	// 		 `cs-gray-7f7f7f.avif`],
	// 		[`ia-forrest.png`,
	// 		 `ia-forrest.avif`],
	// 		[`pg-coral.png`,
	// 		 `pg-coral.avif`],
	// 		[`web-jakearchibald.png`,
	// 		 `web-jakearchibald.avif`],
	// 	],
	// },
	src_PNG_vs_squoosh_avif_lossy7_chroma_off:{
		note:``,
		should:`equal`,
		total:true,
		folders:{
			orig:`../png/202105/`,
			compare :`../avif/202105/squoosh/lossy7chomraoff/`,
			destSub:`squoosh/avif/lossy7chomraoff/srcdiff/`,
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
