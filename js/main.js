var cardHTML;
var items=[];
var jsonURL="/Kickstarter-Browser/assets/dataSet.json";
var jsonURLNew="https://www.kickstarter.com/discover/popular?format=json";

var htmlCode1='<div class="col s12 m6 l4 xl4"><div class="card"><div class="card-image"><span class="card-title"><p class="project-name">';
var htmlCode2='</p><p class="project-creator">by ';
var htmlCode3='</p><p class="project-location"><span>';
var htmlCode4='</span></p></span><a class="btn-floating halfway-fab waves-effect waves-light KS-link-button" href="https://www.kickstarter.com';
var htmlCode5='" target="_blank"><i class="material-icons" id="linkButton">open_in_new</i></a></img></div><div class="card-content"><div class="project-description">';
var htmlCode6='</div><div class="percent-complete" style="left:';
var htmlCode7='%</div><div class="progress-bar"><div class="progress-bar-completed" style="width: '; //style="amount of progress bar completed"
var htmlCode8='%;"></div></div></div><div class="card-action"><div class="funding-stats row"><div class="amt-pledged col s4"><span>$';
var htmlCode9='</span> pledged</div><div class="backers col s4"><span>';
var htmlCode10='</span> backers</div><div class="days-left col s4"><span>';
var htmlCode11='</span> days left</div></div></div></div></div>';

function greater(x) {
	if (x<100) {
		return x;
	}else{
		return 100;
	}
}

function days_left(endDate) {
	
	oneDay=1000*60*60*24;

	var yr=parseInt(endDate.substring(0,4));
	var mon=parseInt(endDate.substring(5,7));
	var day=parseInt(endDate.substring(8,10));

	var today = new Date();
	var givenDate= new Date(yr,mon-1,day);

	var numberOfDays=Math.round((givenDate.getTime()-today.getTime())/oneDay);
	
	return numberOfDays;
}

$.ajax({
  url: jsonURLNew,
  dataType: 'text/html',
  success: function(data){
    console.log( "success" );
  }
});

$.getJSON(jsonURL,{"callback":"?"},function (jsonItem) {
	$('#targetElement').html(" ");
	jsonItem.map(function (thisJsonItem) {
		
			var generatedHTML= htmlCode1+thisJsonItem["title"]+htmlCode2+thisJsonItem["by"]+htmlCode3+thisJsonItem["location"]
									+", "+thisJsonItem["country"]+htmlCode4+thisJsonItem["url"]+htmlCode5+thisJsonItem["blurb"]+htmlCode6
									+(greater(thisJsonItem["percentage.funded"])-5)+'%;">'+thisJsonItem["percentage.funded"]
									+htmlCode7+greater(thisJsonItem["percentage.funded"])+htmlCode8+thisJsonItem["amt.pledged"]
									+htmlCode9+thisJsonItem["num.backers"]+htmlCode10+days_left(thisJsonItem["end.time"])
									+htmlCode11;
		
			items.push(generatedHTML);
			$('#targetElement').append(generatedHTML);
	});
	$('.card').matchHeight({byRow:true});
});

$(window).on('resize',function(){
	if($(window).width()<600){
		// $('#targetElement').html(" ");
	}

});


