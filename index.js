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
	console.dir(JSON.stringify(reportData, null, 2));
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
	console.dir(curTest.pairs)
	let diffUnequals = 0
	let diffsSum = {
		count: {
			r: 0,
			g: 0,
			b: 0,
			t: 0,
		},
		max: {
			r: 0,
			g: 0,
			b: 0,
			a: 0,
		},
		sum: {
			r: 0,
			g: 0,
			b: 0,
			t: 0,
		},
		avg: {
			r: 0,
			g: 0,
			b: 0,
			t: 0,
		},
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

		diffsSum.count.r += diffRes.probe.count.r
		diffsSum.count.g += diffRes.probe.count.g
		diffsSum.count.b += diffRes.probe.count.b
		diffsSum.count.t += diffRes.probe.count.t
		diffsSum.max.r += diffRes.probe.max.r
		diffsSum.max.g += diffRes.probe.max.g
		diffsSum.max.b += diffRes.probe.max.b
		diffsSum.max.a += diffRes.probe.max.a
		diffsSum.sum.r += diffRes.probe.sum.r
		diffsSum.sum.g += diffRes.probe.sum.g
		diffsSum.sum.b += diffRes.probe.sum.b
		diffsSum.sum.t += diffRes.probe.sum.t
		diffsSum.avg.r += diffRes.probe.avg.r
		diffsSum.avg.g += diffRes.probe.avg.g
		diffsSum.avg.b += diffRes.probe.avg.b
		diffsSum.avg.t += diffRes.probe.avg.t

		if (curTest.should === 'equal'){
			console.log(`! probe totals`)
			if (diffRes.probe.count.t > 0){
				diffUnequals++
				console.log(`🚨FAIL`)
			} else {
				console.log(`👌pass`)
			}
		}
	} // end for pairs.length

	console.log('diffsSum =',diffsSum);
	// if (curTest.should === 'equal'){
		reportData[curTest.title].unequalPercent = diffUnequals/curTest.pairs.length*100
		if (diffUnequals > 0){
			console.log(`🚨FAILED ${reportData[curTest.title].unequalPercent}% Equal pairs: ${curTest.title}`)
		} else {
			console.log(`👌pass All pairs equal: ${curTest.title}`)
		}
	// }

} catch (err){
	console.log('💩testPairs write: ', err);
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
async function testImgPair(curTest, i){ try{
	console.log(`➰`);
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
	);
	console.log('diffRes '+ fileStub, diffRes);
	return diffRes
} catch (err){
	console.log('💩testImgPair: ', filepath, err);
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
		pixelsDiff[pixel] = origArr[pixel] - compArr[pixel]
		if (pixelsDiff[pixel]){
			pixelsDiffAmp[pixel] = pixelsDiff[pixel] * 0.9 + 25 //'signal boost' to visually notice diff
			countDiffR++
			maxDiffR = Math.max(maxDiffR, pixelsDiff[pixel])
			sumDiffR += pixelsDiff[pixel]
		}

		pixel++
		pixelsDiff[pixel] = origArr[pixel] - compArr[pixel]
		if (pixelsDiff[pixel]){
			pixelsDiffAmp[pixel] = pixelsDiff[pixel] * 0.9 + 25
			countDiffG++
			maxDiffG = Math.max(maxDiffG, pixelsDiff[pixel])
			sumDiffG += pixelsDiff[pixel]
		}

		pixel++
		pixelsDiff[pixel] = origArr[pixel] - compArr[pixel]
		if (pixelsDiff[pixel]){
			pixelsDiffAmp[pixel] = pixelsDiff[pixel] * 0.9 + 25
			countDiffB++
			maxDiffB = Math.max(maxDiffB, pixelsDiff[pixel])
			sumDiffB += pixelsDiff[pixel]
		}

		//assume no alpha channel
	}
	// console.log('pixelsDiff', pixelsDiff);
	const countTotal = countDiffR + countDiffG + countDiffB

		console.log(countTotal, fileStub);
	//TODO test for folder
	try {
		await writeImgArr(pixelsDiff, info, diffPath, fileStub, '.diff', title, 'simple', !!countTotal)
		// console.log(countTotal);
		if (countTotal){
			await writeImgArr(pixelsDiffAmp, info, diffPath, fileStub, '.diffamp', title, 'amplify', !!countTotal)
		}
	} catch (err){
		console.log('💩pixelDiff write: ', err);
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
				t: sumTotal / countTotal,
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
	console.log('💩loadUint8Arr: ', filepath, err);
}}
