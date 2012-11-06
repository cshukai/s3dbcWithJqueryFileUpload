var s3dbURL='http://204.232.200.16/uabs3db';
var username='shukai';
var password='12345';
var s3db_key={};
var collection_id='89';
var rule_id='99';


var generateJFileUploadUIs=function(containerID){

    var buttonText=document.createElement('span');
    buttonText.textContent='select file...';
 
    var addFileButton=document.createElement('input');
    addFileButton.id='importer';
    addFileButton.type='file';
    addFileButton.name='files[]';
    $('#importer').attr('multiple','');
    var addFileSpan=document.createElement('span');
    addFileSpan.setAttribute('class','btn btn-success fileinput-button');
    addFileSpan.appendChild(buttonText);
    addFileSpan.appendChild(addFileButton);
    



    var uploadFileBtnText=document.createElement('span');
    uploadFileBtnText.textContent='upload to S3DB';
    var uploadFileBtn=document.createElement('button');
    uploadFileBtn.type='submit';
    uploadFileBtn.setAttribute('class','btn btn-primary start');
    uploadFileBtn.appendChild(uploadFileBtnText);

    

    var ButtonBarDiv=document.createElement('div');
    ButtonBarDiv.setAttribute('class','row fileupload-buttonbar');
    ButtonBarDiv.appendChild(addFileSpan);
    ButtonBarDiv.appendChild(uploadFileBtn);

    var fileLoadingDiv=document.createElement('div');
    fileLoadingDiv.setAttribute('class','fileupload-loading');
    fileLoadingDiv.style.visibility='hide';

    
    var presentTable=document.createElement('table');
    presentTable.setAttribute('role','presentation');
    presentTable.setAttribute('class','table table-striped');
    presentTable.style.visibility='hide';
    
    var fileUploadForm=document.createElement('form');
    fileUploadForm.id='fileupload';
    fileUploadForm.action='url:alterLater';
    fileUploadForm.method='POST';
    fileUploadForm.enctype="multipart/form-data";
    fileUploadForm.appendChild(ButtonBarDiv);
    fileUploadForm.appendChild(fileLoadingDiv);
    fileUploadForm.appendChild(presentTable);


    var container=document.getElementById(containerID);
    container.appendChild(fileUploadForm);
};


var send2S3dbUsingJquery=function(s3dbURL,s3db_key,collection_id,rule_id){
  // fileupload is the id of the form which jquery file upload applied to
 $("#fileupload").attr('action', s3dbURL+'/multiupload.php?key='+s3db_key+'&collection_id='+collection_id+'&rule_id='+rule_id+'&format=json');

};

 s3dbc.setDeployment(s3dbURL);
 s3dbc.setJSONP(false);
 s3dbc.login(username, password, function (err, key) {
 	console.log(err);
 	s3db_key=key;
 	send2S3dbUsingJquery(s3dbURL,s3db_key,collection_id,rule_id);
 });



 ///////////////////////////////////////////////////////////reference//////////////////////////////////////////////////////////////////////
 // not preferred
 //$.get('http://204.232.200.16/uabs3db/uploads.php?key=Gpwyctifs5z28GG&filename=Export_1excelBC.txt&filesize=849.59');
//"<TABLE><TR><TD>error_code</TD><TD>message</TD><TD>filekey</TD></TR><TR><TD>0</TD><TD>This filekey is to be used instead of key for file transfer, it will expire in 24h. Break the file in base64 encoded fragments, replacing the character '+' with it's URL equivalent '%2b'</TD><TD>tQwJk7dJdyqd</TD></TR></TABLE>"



