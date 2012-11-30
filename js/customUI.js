
var send2S3dbFmCustomUI=function(inputFileId,filesList,s3dbURL,s3db_key,collection_id,rule_id){
 $("#"+inputFileId).fileupload({
  url:s3dbURL+'/multiupload.php?key='+s3db_key+'&collection_id='+collection_id+'&rule_id='+rule_id+'&format=json',
    sequentialUploads: true
  });

  console.log(filesList);
  $("#"+inputFileId).fileupload('add', {files: filesList});
  $("#"+inputFileId).fileupload('send', {files: filesList});
}

/*
    var inputField=document.getElementBy
@purpose: wrapping up the process of application of JQuery file upload
@dependencies: function send2S3dbFmCustomUI

*/
var setupFileUploader=function(inputFileId,s3db_key,collection_id,rule_id){
Id(inputFileId);
    inputField.setAttribute('onchange','send2S3dbFmCustomUI('+'"'+inputFileId+'"'+',this.files,'+'"'+ s3dbURL+'"'+','+'"'+s3db_key+'"'+','+'"'+collection_id+'"'+','+rule_id+')'
     );
   
};



var displayFileInfoByCollectionAndRule=function(collectionID,ruleID){
      // display file name, file size and url of selected file
     s3dbc.selectItemsByCollection(collectionID, function(err,results){
          console.log(err);
          console.log(results);
         // var itemsId=[];
          for(var i=0;i<results.length;i++){
              //itemsId[i]=results[i].item_id;
              kinomics.s3db_selected_items=results[i].item_id;
          }
          
     });

 };


 var getFileMetaByRuleIdInTheCollection=function(ruleID,collectionID,callback){

   s3dbc.selectItemsByCollection(collectionID, function(err,results){
    //console.log(err);
    //console.log(results);
    var itemsId=[];
    for(var i=0;i<results.length;i++){
     (function(i){
       s3dbc.selectStatementsByRuleAndItem(ruleID,results[i].item_id,function(err,results){
        // console.log(err);
         //console.log(results);
         var tableRow=document.createElement('tr');
         var td_fileSize=document.createElement('td');
         var td_fileName=document.createElement('td');
         var td_fileLink=document.createElement('td');

         td_fileSize.textContent=results[0].file_size;
         td_fileName.textContent=results[0].file_name;
         td_fileLink.textContent=results[0].value.match(/"([^"]+)"/)[1];
         tableRow.appendChild(td_fileSize);
         tableRow.appendChild(td_fileName);
         tableRow.appendChild(td_fileLink);

          callback(tableRow);       
       });

     })(i);
   }
 });

 };


var listS3dbProject_sparql=function(){
    var sparql_query;
    //permission issue 
    var sparql_template= [   
                           "prefix rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
                           "prefix rdfs:<http://www.w3.org/2000/01/rdf-schema#>",                          
                           "prefix owl:<http://www.w3.org/2002//07/owl#>",                       
                           "prefix dc:<http://purl.org/dc/ele07/owl#>",
                           "prefix dc:<http://purl.org/dc/elements/1.1/>",
                           "prefix dcterms:<http://purl.org/dc/terms/>",
                           "prefix foaf:<http://xmlns.com/foaf/0.1/>",
                           "prefix fti:<http://franz.com/ns/allegrograph/2.2/textindex/>",
                            "prefix skos:<http://www.w3.org/2004/02/skos/core#>",
                            "prefix s3db:<http://www.s3db.org/core#> ",
                           "SELECT  ?GenomicCharacterization WHERE { ",
                           "?GenomicCharacterization rdf:type :C89 . " , 
                           // not  working with 
                           // "??GenomicCharacterization   rdf:type s3db:project . " ,                                       
                           "}"
                         ];

    var sparql_query=sparql_template.join(" ");
    return sparql_query;
};


var sparqlFectch=function(backend,sparqlQuery){
    if(backend=="s3db"){
      s3dbc.sparqlQuery(sparqlQuery, function(err,results){
           //callback(results);
           console.log(err);
           console.log(results);
      });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



window.kinomics={};

kinomics.login={};
kinomics.s3dbURL={};
kinomics.s3db_usrname={};
kinomics.s3db_password={};
kinomics.s3db_collectionId={};
kinomics.s3db_ruleId={};
kinomics.s3db_key={};
kinomics.s3dbc_deleteStatement={};
kinomics.s3dbc_updateStatement={};
kinomics.getFileMetaByRuleIdInTheCollection={};
kinomics.setupFileUploader={};

kinomics.login=function(username,password,s3dbURL,callback){
     // setting up s3dbc's env
     s3dbc.setDeployment(s3dbURL);
     s3dbc.setJSONP(false);
     s3dbc.login(username, password, function (err, key) {
     console.log(err);
     
     //setting up function for file manipulation
     kinomics.s3db_key=key;    
     kinomics.s3db_selectStatementsByRuleAndItem=s3dbc.selectStatementsByRuleAndItem; 
     kinomics.setupFileUploader=setupFileUploader;
     kinomics.s3dbc_deleteStatement=s3dbc.deleteStatement;
     kinomics.s3dbc_updateStatement= s3dbc.updateStatement;
     kinomics.getFileMetaByRuleIdInTheCollection=getFileMetaByRuleIdInTheCollection; 
     kinomics.sparqlFectch=sparqlFectch;
     callback;
   });
};



// example for testing
var collection_id='89';
var rule_id='99';
var s3dbURL='http://204.232.200.16/uabs3db';





