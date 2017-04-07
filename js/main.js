var items=[];
var loadTop,lastScrollTop=0,page=0,tempScrollTop;
// var jsonURLNew="https://crossorigin.me/https://www.kickstarter.com/discover/advanced?format=json&sort=popularity&page=2";

var htmlCode1='<div class="col s12 m6 l4 xl4';
var htmlCode13='""><div class="card"><div class="card-image" style="background:url(';
var htmlCode12=');"><div class="mask-div"></div><span class="card-title"><p class="project-name">';
var htmlCode2='</p><p class="project-creator">by ';
var htmlCode3='</p><p class="project-location"><span>';
var htmlCode4='</span></p></span><a class="btn-floating halfway-fab waves-effect waves-light KS-link-button" href="';
var htmlCode5='" target="_blank"><i class="material-icons" id="linkButton">open_in_new</i></a></div><div class="card-content"><div class="project-description">';
var htmlCode6='</div><div class="percent-complete" style="left:';
var htmlCode7='%</div><div class="progress-bar"><div class="progress-bar-completed" style="width: '; //style="amount of progress bar completed"
var htmlCode8='%;"></div></div></div><div class="card-action"><div class="funding-stats row"><div class="amt-pledged col s4"><span>$';
var htmlCode9='</span> pledged</div><div class="backers col s4"><span>';
var htmlCode10='</span> backers</div><div class="days-left col s4"><span>';
var htmlCode11='</span> days<br/>left</div></div></div></div></div>';


function greater(x) {
	if (x<100) {
		return x;
	}else{
		return 100;
	}
}

function days_left(endTime) {
	
	oneDay=60*60*24;

	var today = new Date();
	var todayTime = today.getTime()/1000;

	var numberOfDays=Math.floor((endTime-todayTime)/oneDay);
	
	return numberOfDays;
}

function getWebsiteURL(){

	var websiteURL='https://crossorigin.me/https://www.kickstarter.com/discover/advanced?format=json';
	websiteURL+=getSortBy();
	websiteURL+=getPageNumber();
	return websiteURL;
}

function getSortBy() {
	return "&sort="+"popularity";
}

function getPageNumber() {
	++page;
	return "&page="+page;
}

function addLoadClass(index) {
	if (index===5) {
		return " load";
	}
	else{
		return "";
	}
}

function needToLoad() {
		
	var scrollTop=$(window).scrollTop();

	if ((scrollTop>=loadTop)&&(lastScrollTop<loadTop)) {
		
		lastScrollTop=scrollTop;
		return true;
	}else{
		
		lastScrollTop=scrollTop;
		return false;
	}
}

function populateHTML(jsonURL){
	$.getJSON(jsonURL,function (jsonItem) {
		jsonItem["projects"].map(function (thisJsonItem,index) {

				var name=thisJsonItem["name"];
				var creator=thisJsonItem["creator"]["name"];
				var location=thisJsonItem["location"]["displayable_name"]+", "+thisJsonItem["country"];
				var description=thisJsonItem["blurb"];
				var currency=thisJsonItem["currency"];
				var currencySymbol=thisJsonItem["currency_symbol"];
				var pledged=thisJsonItem["pledged"];
				var usdPledged=Number(Math.floor(thisJsonItem["usd_pledged"])).toLocaleString('en');
				var backersCount=thisJsonItem["backers_count"];
				var deadline=thisJsonItem["deadline"];
				var goal=thisJsonItem["goal"];
				var url=thisJsonItem["urls"]["web"]["project"];
				var cardImage=thisJsonItem["photo"]["ed"];
				
				var percentFunded= Math.floor((pledged/goal)*100);
				
				var indicateLoadMore=addLoadClass(index); // add "load" class to 9th div on each json call


				var generatedHTML = htmlCode1+indicateLoadMore+htmlCode13+cardImage+htmlCode12+name+htmlCode2+creator+htmlCode3+location+htmlCode4+url+htmlCode5
								    +description+htmlCode6+(greater(percentFunded)-5)+'%;">'
									+percentFunded+htmlCode7+greater(percentFunded)
									+htmlCode8+usdPledged+htmlCode9+backersCount+htmlCode10
									+days_left(deadline)+htmlCode11;
			
				items.push(thisJsonItem);

				$('#targetElement').append(generatedHTML);
				console.log("after"+$(window).scrollTop());
				$(window).scrollTop(tempScrollTop);

		});
		loadTop=$(".load").offset().top;
		// console.log(loadTop);
		$('.card').matchHeight({byRow:true});
	});
}


//MAIN PROGRAM STARTS HERE

$('#targetElement').html(" ");

var jsonURL = getWebsiteURL();
console.log("before"+$(window).scrollTop());
populateHTML(jsonURL);

$(window).on("scroll",function () {
	if(needToLoad()){
		$(".load").removeClass("load");
		jsonURL = getWebsiteURL();
		tempScrollTop=$(window).scrollTop();
		console.log("before"+$(window).scrollTop());
		populateHTML(jsonURL);
		$(window).scrollTop(tempScrollTop);
		console.log("Need  to load");
	}
});






