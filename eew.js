var document = window.document;
function updateAmedas() {
	let domTemp = document.querySelector('.temp');
	fetch('https://www.jma.go.jp/bosai/amedas/data/latest_time.txt')
		.then(response => response.text())
		.then(result => {
			console.log(result);
			let amedasCode = '44132'; // アメダス地点コード：東京
			let latestDate = result.substr(0,4) + result.substr(5,2) + result.substr(8,2);
			let latestHour = result.substr(11,2);
			let latestMinute = result.substr(14,2);
			let division = '0' + Math.floor(latestHour / 3) * 3;
			let requestURL = 'https://www.jma.go.jp/bosai/amedas/data/point/' + amedasCode + '/' + latestDate + '_' + division.slice(-2) + '.json';
			console.log(requestURL);
			fetch(requestURL)
				.then(response => response.json())
				.then(result => {
					console.log(result);
					let nextMinute = Number(latestMinute) + 10;
					let nextHour = latestHour;
					if (nextMinute == 60) {
						nextHour = ('0' + ((latestHour) + 1)).slice(-2);
						nextMinute = '00'
					}
					let latestTime = latestDate + latestHour + latestMinute + '00';
					let nextTime = latestDate + nextHour + nextMinute + '00';
					console.log(latestTime);
					console.log(nextTime);
					let latestAmedas = result[nextTime];
					if (!(latestAmedas)) {
						latestAmedas = result[latestTime];
					}
					domTemp.innerHTML = latestAmedas.temp[0] + '°　RH' + latestAmedas.humidity[0] + '%';
			});
	});
}

function updateForecast() {
	var weather = document.querySelector('.weather');
	var weathersep = document.querySelector('.weatherseparator');
	var weatheralt = document.querySelector('.weatheralt');
	fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json')
		.then(response => response.json())
		.then(result => {
			console.log(result[0].timeSeries[0]);
			let weathers = result[0].timeSeries[0].areas[0].weathers[0];
			let weatherSplit = weathers.split('　');
			var ite = 0;
			weather.innerHTML = wordToIcon(weatherSplit, ite);
			console.log(weatherSplit, ite);
			while (weatherSplit.length > ++ite) {
				weathersep.innerHTML = wordToSeparator(weatherSplit, ite);
				ite ++;
				weatheralt.innerHTML = wordToIcon(weatherSplit, ite);
			}
	});
}

function wordToIcon(split, iter) {
	let word = split[iter];
	if (word == '晴れ') {
		return '☀';
	} else if (word == 'くもり') {
		return '☁';
	} else if (word == '雨') {
		if (((split.length-1) > iter) && (split[iter+1] == '所により')) {
			iter += 2;
			return '☂⚡';
		}
		return '☂';
	} else if (word == '雪') {
		return '⛄';
	} else {
		return word;
	}
}

function wordToSeparator(split, iter) {
	let word = split[iter];
	console.log(word);
	if (word == '夜' ) {
		return '➡🌛';
	} else if (word == '時々') {
		return '／';
	} else if (word.charAt(0) == '昼' || word.charAt(0) == '明') {
		if (wordSplit[ite+2] == '時々') {
			return '／';
		}
		ite ++;
	} else {
		return '➡';
	}
}

function getEew() {
	var sokuhot = document.querySelector('.sokuhou-title');
	var sokuhod = document.querySelector('.sokuhou-details');
	let sound = new Audio('https://raw.githubusercontent.com/sleepyspecies/sleepyspecies.github.io/main/eew-alert-iphone.webm');
	var recentTime = Date.now() /1000- 60;
	var timer;
	fetch('https://api.iedred7584.com/eew/json/').then(function(response) {
		return response.json();
	}).then(function(data) {
		if (recentTime < data.AnnouncedTime.UnixTime) {
			sokuhot.innerHTML = data.Type.Detail;
			sokuhod.innerHTML = data.AnnouncedTime.String + '　震源地：' + data.Hypocenter.Name + '　震度：' + data.MaxIntensity.LongString + '　マグニチュード：' + data.Hypocenter.Magnitude.Float + '　震源の深さ：' + data.Hypocenter.Location.Depth.String;
			console.log(data);
			if (data.MaxIntensity.String > 3) {
				sound.play();
			}
			recentTime = data.AnnouncedTime.UnixTime;
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				sokuhot.innerHTML = data.AnnouncedTime.String + '頃、地震がありました';
				sokuhod.innerHTML = '震源地：' + data.Hypocenter.Name + '　震度：' + data.MaxIntensity.LongString + '　マグニチュード：' + data.Hypocenter.Magnitude.Float + '　震源の深さ：' + data.Hypocenter.Location.Depth.String;
				timer = setTimeout(function() {
					sokuhot.innerHTML = '';
					sokuhod.innerHTML = '';
				}, 300000);
			}, 60000);
		}
	}).catch(function(error) {
		console.log(error);
	});
}

updateForecast();
updateAmedas();
let elapsedTime = 0;
let currentForecast, currentAmedas;
setInterval(function() {
	getEew();
	let nowTime = Date.now();
	if (date - elapsedTime >= 6000) {
		console.log(date,  elapsedTime);
		updateAmedas();
		if ((minsec == '00') &&((date.getHour()%3) == 0)) {
			console.log('updateForecast');
			updateForecast();
		}
	}
	lastminsec = minsec;
}, 1000);