///////////////////////////////////////////////////////for adding file to s3db////////////////////////////////////////////

var send2S3dbFmForm=function(s3dbURL,s3db_key,collection_id,rule_id){
  // fileupload is the id of the form which jquery file upload applied to
 $("#fileupload").attr('action', s3dbURL+'/multiupload.php?key='+s3db_key+'&collection_id='+collection_id+'&rule_id='+rule_id+'&format=json');

};



var send2S3dbFmCustomUI=function(inputFileId,filesList,s3dbURL,s3db_key,collection_id,rule_id){
  // fileupload is the id of the form which jquery file upload applied to
 $("#"+inputFileId).fileupload({
  url:s3dbURL+'/multiupload.php?key='+s3db_key+'&collection_id='+collection_id+'&rule_id='+rule_id+'&format=json',
    sequentialUploads: true
  });

  console.log(filesList);
  $("#"+inputFileId).fileupload('add', {files: filesList});
  $("#"+inputFileId).fileupload('send', {files: filesList});
}

/*
@purpose: wrapping up the process of application of JQuery file upload
@dependencies: function send2S3dbFmCustomUI

*/
var setupFileUploader=function(inputFileId,collection_id,rule_id){

    var inputField=document.getElementById(inputFileId);
    inputField.setAttribute('onchange','send2S3dbFmCustomUI('+'"'+inputFileId+'"'+',this.files,'+'"'+ s3dbURL+'"'+','+'"'+s3db_key+'"'+','+'"'+collection_id+'"'+','+rule_id+')'
     );
   
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

//setting up functions
kinomics.setupFileUploader={};
kinomics.login=function(username,password,s3dbURL){
     s3dbc.setDeployment(s3dbURL);
     s3dbc.setJSONP(false);
     s3dbc.login(username, password, function (err, key) {
     console.log(err);
     
     kinomics.s3db_key=key;    
     kinomics.setupFileUploader=setupFileUploader;
     
   });
};


var collection_id='89';
var rule_id='99';
var s3dbURL='http://204.232.200.16/uabs3db';
var username='shukai';
var password='12345';




var login=function(usrname,password,callback){
    s3dbc.setDeployment(s3dbURL);
    s3dbc.login(username, password, function (err, key) {
         callback;
    });
};

var updateS3dbStatment=function(s3dbURL,s3db_key,collection_id,rule_id){
    s3dbc.setDeployment(s3dbURL);
    s3dbc.setJSONP(false);
    s3dbc.login(username, password, function (err, key) {
    console.log(err);
    console.log(key);
    // todo
    //s3dbc.updateStatement(string statementId, string value, (err, array results) callback)
};

// var deleteS3dbStatement=function(s3dbURL,statementId,callback){
//     s3dbc.setDeployment(s3dbURL);
//     s3dbc.setJSONP(false);
//     s3dbc.login(username, password, function (err, key) {
//     console.log(err);
//     console.log(key);
//     s3dbc.deleteStatement(statementId,callback);
//        console.log(err);
//        console.log(results);
//    });

// };

