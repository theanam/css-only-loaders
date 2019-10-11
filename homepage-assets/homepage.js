var baseURL = "https://raw.githubusercontent.com/theanam/css-only-loaders/master/spinners/";
var base_css = "";
function getDefination(cssClass,callback){
	$.get(`${baseURL}/${cssClass}/${cssClass}.css`)
		.then(data=>{
			callback(data);
		})
		.catch(e=>{
			console.log("CSS defination fetch error");
		});
}

function prepareSourceCode(data){
	console.log(data);
	$(".sourceholder").css("display","flex");
	$(".actual-code").text(base_css + "\n\n" + data);
}

$(".spinner,.ripple").on("click",function(e){
	var classes = $(this).attr("class");
	var defName = classes.split(" ")[1];
	if(!defName) return console.log("Defination class missing");
	getDefination(defName,function(data){
		prepareSourceCode(data);
	});
});

$(".source").on("click",function(e){
	e.stopPropagation();
});

$(".sourceholder").on("click",function(){
	$(this).css("display","none");
});

$(function(){
	$.get(`${baseURL}/vars.css`)
		.then(data=>{
			base_css = data;
		})
		.catch(e=>{
			console.log("Failed to load base CSS");
		})
})