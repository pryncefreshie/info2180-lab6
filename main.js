window.onload = main;
 function ajax_query(word, all){
    let httpRequest = new XMLHttpRequest();
    let url = `/request.php?q=${word}&all=${all}`;
    
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === XMLHttpRequest.DONE ){
            if(httpRequest.status === 200){
                if(all){
                   parse_xml(httpRequest.responseXML); 
                }else{
                    update_results(httpRequest.responseText);
                }
            }else{
                alert("There was some error");
            }
        }
    }
    
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function parse_xml(response){
    let definitions = response.documentElement.children;
    let results = "<ol>";
    
    for(var i = 0; i < definitions.length; i++){
        results+=`<li><h3>${definitions[i].attributes[0].value.toUpperCase()}</h3><p>${definitions[i].innerHTML.trim()}</p><p> - ${definitions[i].attributes[1].value}</p></li>`;
    }
    
    results+= "</ol>"
    
    update_results(results)
}

function update_results(response){
    document.getElementById("update").innerHTML = response;
}

 function main(){
    let submit = $("#submission")[0];
    let submitAll = $("#all")[0];
    
    submit.onclick = function(event){
        event.preventDefault();
        ajax_query(document.getElementsByName("q")[0].value.trim().toLowerCase(),false);
        document.getElementsByName("q")[0].value = "";
    };
    
    submitAll.onclick = function(event){
        event.preventDefault();
        ajax_query('', true);
        document.getElementsByName("q")[0].value = "";
    }
} 