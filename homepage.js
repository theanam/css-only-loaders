var baseURL = "https://raw.githubusercontent.com/theanam/css-only-loaders/master/spinners/";


function getDefination(cssClass,callback){
	$.get(`${baseURL}/${cssClass}/${cssClass}.css`)
		.then(data=>{
			callback(data);
		})
		.catch(e=>{
			console.log("CSS defination fetch error");
		});
}

$(".spinner,.ripple").on("click",function(e){
	var classes = $(this).attr("class");
	var defName = classes.split(" ")[1];
	if(!defName) return console.log("Defination class missing");
	getDefination(defName,function(data){
		console.log(data);
	});
})