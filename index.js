let fs = require('fs')
const sharp = require('sharp') // image processing github.com/lovell/sharp
const headlines = require('./headlines')
const {tests} = require(`./${process.argv[2]}.config`)
// console.dir(tests);
 let reportData = {}

async function main(){
	for (
		let i = 1, // index 0 = meta, no tests
			keyNames = Object.keys(tests),
			curTest = {};
		i < keyNames.length;
		++i
	){
		curTest = tests[keyNames[i]]
		curTest.destFolder = tests.meta.destRootFolder + curTest.folders.destSub
		if (!fs.existsSync(curTest.destFolder+'headline')) {
			fs.mkdirSync(curTest.destFolder +'headline', {recursive:true});
		}
		if(curTest.title === undefined){
			curTest.title = keyNames[i].replaceAll('_',' ')
		}

		reportData[curTest.title] = {}
		reportData[curTest.title].note = curTest.note
		reportData[curTest.title].pairs = {}

		if(curTest.should === 'equal'){
			await testPairs(curTest)
		// }else if(curTest.sum !== undefined){
		// 	testPairs(curTest)
		}else console.error();
	}
	const shortISOnow = new Date().toISOString().replaceAll(/[-:.]/g, '')
	fs.writeFile(tests.meta.destRootFolder + shortISOnow +'.report.json', JSON.stringify(reportData), function (err) {
		if (err) throw err;
	});
	// console.log(JSON.stringify(reportData, null, 2));
}
main()

/*
	curTest is object:
	{
		should: `equal`,
		src:`squoosh/`,
		dest:`squoosh/diff/avif-vs-avif/settings/lossless-eff/`,
		pairs:[
 			 [`black-000.lossless2.avif`, `black-000.lossless10.avif`],
		],
	},
*/
async function testPairs(curTest){ try {
	console.group(`\n➰${curTest.title}\n ${curTest.destFolder}`)
	let diffUnequals = 0
	let diffsSum ={
		count:{
			any: 0,
		},
		sum:{
			t: 0,
		},
		filesize:{
			orig: 0,
			compare: 0,
		}
	}
	// let shouldOutcome = ''

	/* make diffs */
	for (
		let i = 0;
		i < curTest.pairs.length;
		++i
	){
		const diffRes = await testImgPair(curTest, i)

		reportData[curTest.title].pairs[diffRes.fileStub] = diffRes.probe

		diffsSum.count.any += diffRes.probe.count.any
		diffsSum.sum.t += diffRes.probe.sum.t
		diffsSum.filesize.orig += diffRes.probe.filesize.orig
		diffsSum.filesize.compare += diffRes.probe.filesize.compare

		// console.group engaged
		if (curTest.should === 'equal'){
			if (diffRes.probe.count.t > 0){
				diffUnequals++
				console.log(`🚨FAIL`, diffRes.probe.count.t, diffRes.fileStub)
			} else {
				console.log(`👌pass`, diffRes.fileStub)
			}
		}
	} // end for pairs.length

	// console.log('diffsSum =',diffsSum);
	// if (curTest.should === 'equal'){
		console.groupEnd()
		reportData[curTest.title].unequalPercent = diffUnequals/curTest.pairs.length*100
		if (diffUnequals > 0){
			console.log(`🚨FAILED ${reportData[curTest.title].unequalPercent}% pairs,`, diffsSum.count.any, `pixels wrong, total color err=`, diffsSum.sum.t)
		} else {
			console.log(`👌pass All pairs equal`)
		}
		console.info(`Total filesize differance:`, +(diffsSum.filesize.compare/diffsSum.filesize.orig*100).toFixed(2), `%`);
	// }

} catch (err){
	console.error('💩testPairs write: ', err)
}}

// function getFilesizeBytes(filename) {
// 	var stats = fs.statSync(filename)
// 	return stats.size
// }

// const LOG10GOLDENELLIPSE = Math.log10(5.08320369232)
function signalBoost(x){
	return x * 0.9 + 25
}
/** loads 2 files to return comaprison results
 * @warning Since JS passes by value, might be faster to inline vs functon
 * @param  {object} curTest
 * @param  {int} i Index
 */
async function testImgPair(curTest, i){
	try{
		const origImg = await loadUint8Arr(curTest.folders.orig + curTest.pairs[i][0]) // refernce
		const compareImg = await loadUint8Arr(curTest.folders.compare + curTest.pairs[i][1]) // comparative
		const fileStub = curTest.pairs[i][0].replaceAll('/','~') +'_'+ curTest.pairs[i][1].replaceAll('/','~')
		const diffRes = await pixelDiff(
			new Uint8ClampedArray(origImg.data.buffer),
			new Uint8ClampedArray(compareImg.data.buffer),
			curTest.destFolder,
			fileStub,
			origImg.info,
			curTest.title,
		)
		//optimize the prvious & following could be promice.all
		const {size: origFilesize} = fs.statSync(curTest.folders.orig + curTest.pairs[i][0])
		//ugly puppeteer screen captures always capture as .png
		const {size: compareSrcFilesize} = fs.statSync(curTest.folders.src + curTest.pairs[i][1].slice(0,-4))
		const filesize = {}
		filesize.orig = origFilesize
		filesize.compare = compareSrcFilesize
		filesize.diff = compareSrcFilesize/origFilesize*100
		diffRes.probe.filesize = filesize
		return diffRes
	} catch (err){
		console.error('💩testImgPair: ', err)
	}
}

	/** Write to file the test results
 * @warning Since JS passes by value, might be faster to inline vs functon
 * @param  {Uint8ClampedArray[]} dataArr
 * @param  {object} info
 * @param  {string} diffPath
 * @param  {string} fileStub
 * @param  {string} fileSuffix
 * @param  {string} title
 * @param  {('simple'|'amplify')} headlineType
 * @param  {boolean} hasChange
 */
async function writeImgArr(dataArr, info, diffPath, fileStub, fileSuffix, title, headlineType, hasChange){
	let levelPNG = 7 // med-fast; 9 = slow & small
	let tempImg = await sharp(dataArr,{
		raw: {
			width: info.width,
			height: info.height,
			channels: info.channels,
		}
	})
	.png({ compressionLevel: levelPNG }) // only way to change compression level
	await tempImg.toFile(diffPath+fileStub+fileSuffix+'.png');

	let pngHeadline = await sharp(
		Buffer.from(
			headlines[headlineType]
				.replaceAll('{{fill}}', (hasChange) ? '#200a00' : '#073028')
				.replace('{{statuscolor}}', (hasChange) ? '#fed5c1' : '#defaf4')
				.replace('{{title}}', title)
				.replace('{{headline}}', fileStub)
				//IDEA filesizes
		))
		.resize({
			width: info.width,
			height: info.height + 40,
			fit: 'contain',
			position: 'top',
		})
		.composite([{
			input: `${diffPath + fileStub + fileSuffix}.png`,
			blend: 'atop',
			top: 40,
			left: 0,
			// premultiplied: true,
		}])
		.png({ compressionLevel: levelPNG })
	await pngHeadline.toFile(`${diffPath +'headline/'+ fileStub + fileSuffix}note.png`);
}

/* possible speed optimizations:
		unroll writeImgArr()
		assign pixelsDiff[pixel] to 1 or 2 temp var
*/
async function pixelDiff(origArr, compArr, diffPath, fileStub, info, title){
	countDiffR = 0
	countDiffG = 0
	countDiffB = 0
	countDiffAny = 0
	diffAny = false
	maxDiffR = 0
	maxDiffG = 0
	maxDiffB = 0
	sumDiffR = 0
	sumDiffG = 0
	sumDiffB = 0
	let pixelsDiff = new Uint8ClampedArray(info.size)
	let pixelsDiffAmp = new Uint8ClampedArray(info.size)
	for(
		let pixel = 0;
		pixel < info.size;
		pixel += 1
	){
		diffAny = false
		pixelsDiff[pixel] = origArr[pixel] - compArr[pixel]
		if (pixelsDiff[pixel]){
			//'signal boost' to visually notice diff
			pixelsDiffAmp[pixel] = pixelsDiff[pixel] * 0.9 + 25
			diffAny = true
			countDiffR++
			maxDiffR = Math.max(maxDiffR, pixelsDiff[pixel])
			sumDiffR += pixelsDiff[pixel]
		}

		pixel++
		pixelsDiff[pixel] = origArr[pixel] - compArr[pixel]
		if (pixelsDiff[pixel]){
			pixelsDiffAmp[pixel] = pixelsDiff[pixel] * 0.9 + 25
			diffAny = true
			countDiffG++
			maxDiffG = Math.max(maxDiffG, pixelsDiff[pixel])
			sumDiffG += pixelsDiff[pixel]
		}

		pixel++
		pixelsDiff[pixel] = origArr[pixel] - compArr[pixel]
		if (pixelsDiff[pixel]){
			pixelsDiffAmp[pixel] = pixelsDiff[pixel] * 0.9 + 25
			diffAny = true
			countDiffB++
			maxDiffB = Math.max(maxDiffB, pixelsDiff[pixel])
			sumDiffB += pixelsDiff[pixel]
		}

		//assume no alpha channel
		// comments: https://stackoverflow.com/a/7820695/1324588
		countDiffAny += (diffAny === true) ? 1 : 0
	}
	// console.log('pixelsDiff', pixelsDiff);
	const countTotal = countDiffR + countDiffG + countDiffB

	//TODO test for folder
	try {
		await writeImgArr(pixelsDiff, info, diffPath, fileStub, '.diff', title, 'simple', !!countTotal)
		// console.log(countTotal);
		if (countTotal){
			await writeImgArr(pixelsDiffAmp, info, diffPath, fileStub, '.diffamp', title, 'amplify', !!countTotal)
		}
	} catch (err){
		console.error('💩pixelDiff write: ', err)
	}

	const sumTotal = sumDiffR + sumDiffG + sumDiffB
	return {
		fileStub,
		probe: {
			count: {
				r: countDiffR,
				g: countDiffG,
				b: countDiffB,
				t: countTotal,
				any: countDiffAny,
			},
			max: {
				r: maxDiffR,
				g: maxDiffG,
				b: maxDiffB,
				a: Math.round(((maxDiffR + maxDiffG + maxDiffB) * 0.33333333 + Number.EPSILON) * 1000) *.001,
			},
			sum: {
				r: sumDiffR,
				g: sumDiffG,
				b: sumDiffB,
				t: sumTotal,
			},
			avg: {
				r: sumDiffR / countDiffR,
				g: sumDiffG / countDiffG,
				b: sumDiffB / countDiffB,
				a: sumTotal / countTotal,
			},
	}}
}

async function loadUint8Arr(filepath){ try {
	let raw = await sharp(filepath)
		.removeAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true })
	// console.log(`raw`, raw)
	return raw
} catch (err){
	console.error('💩loadUint8Arr: ', filepath, err)
}}
