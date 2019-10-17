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
In order to get optimal results, please only change the 
variables above and don't change anything in the actual loader code
*/
	
	`;
}
function getDefination(cssClass,callback){
	$(".loadingindicator").css("display","flex");
	$.get(`${baseURL}/${cssClass}/${cssClass}.css`)
		.then(data=>{
			callback(data);
			$(".loadingindicator").css("display","none");
		})
		.catch(e=>{
			console.log("CSS defination fetch error");
			$(".loadingindicator").css("display","none");
		});
}

function prepareSourceCode(data,defName){
	$(".sourceholder").css("display","flex");
    $(".html-code").text(`<div class="loader ${defName}"></div>`);
    $(".actual-code").text(getBaseCSS() + "\n\n" + data);
    $(".current-loader-name").val(defName);
}

$(".loader").on("click",function(e){
	var classes = $(this).attr("class");
	var defName = classes.split(" ")[1];
	if(!defName) return console.log("Defination class missing");
	getDefination(defName,function(data){
		prepareSourceCode(data,defName);
	});
});

$(".source").on("click",function(e){
	e.stopPropagation();
});

$(".sourceholder").on("click",function(){
	$(this).css("display","none");
});
$(".size").on("mousemove change",function(){
	let _size = $(this).val() || size;
    size = _size;
    $(".lsize").html(size);
	document.querySelector(":root").style.setProperty("--loader-width",`${_size}px`);
	document.querySelector(":root").style.setProperty("--loader-height",`${_size}px`);
});
$(".line").on("mousemove change",function(){
	let _line = $(this).val() || line;
    line = _line;
    $(".lline").html(line);
	document.querySelector(":root").style.setProperty("--line-width",`${_line}px`);
});
$(".dur").on("mousemove change",function(){
	let _dur = $(this).val() || dur;
    dur = _dur;
    $(".ldur").html(dur);
	document.querySelector(":root").style.setProperty("--animation-duration",`${_dur}s`);
});
$(".color").on("change",function(){
	let _color = $(this).val() || color;
    color = _color;
    $(".lcolor").html(color);
	document.querySelector(":root").style.setProperty("--loader-color-primary",_color);
});
$(".copy").on("click",function(){
    let target = $(this).data('target');
    let targetEl = $(`.${target}`);
    targetEl.select();
    document.execCommand("copy");
});

$(function(){
    $(".lcolor").html(color);
    $(".ldur").html(dur);
    $(".lline").html(line);
    $(".lsize").html(size);
    $.each($(".loader"),function(idx,item){
        let _cls = $(item).attr("class").split(" ")[1];
        $(item).attr("title",_cls);
    })
});