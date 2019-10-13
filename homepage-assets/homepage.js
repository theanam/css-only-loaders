var baseURL = "https://raw.githubusercontent.com/theanam/css-only-loaders/master/loaders";
var size    = 70;
var color   = "#27ae60";
var line    = 3;
var dur     = 2;
function getBaseCSS(){
	return `
	/*
	The loaders use CSS custom properties (variables) to control the attributes of the loaders
	*/
	:root{
		--loader-width: ${size}px;
		--loader-height: ${size}px;
		--loader-color-primary: ${color};
		--loader-color-secondary: #eee;
		--line-width: ${line}px;
		--animation-duration: ${dur}s;
		--loader-initial-scale: 0.1;
	}
	.loader,.loader:before,.loader:after{
		box-sizing: border-box;
		flex-grow: 0;
		flex-shrink: 0;
	}
	/*
	In order to get optimal results, please only change the variables above and don't change anything in the actual loader code
	*/
	
	`;
}
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
	$(".actual-code").text(getBaseCSS() + "\n\n" + data);
}

$(".loader").on("click",function(e){
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
$(".size").on("mousemove",function(){
	let _size = $(this).val() || size;
	size = _size;
	document.querySelector(":root").style.setProperty("--loader-width",`${_size}px`);
	document.querySelector(":root").style.setProperty("--loader-height",`${_size}px`);
});
$(".line").on("mousemove",function(){
	let _line = $(this).val() || line;
	line = _line;
	document.querySelector(":root").style.setProperty("--line-width",`${_line}px`);
});
$(".dur").on("mousemove",function(){
	let _dur = $(this).val() || dur;
	dur = _dur;
	document.querySelector(":root").style.setProperty("--animation-duration",`${_dur}s`);
});
$(".color").on("change",function(){
	let _color = $(this).val() || color;
	color = _color;
	document.querySelector(":root").style.setProperty("--loader-color-primary",_color);
});