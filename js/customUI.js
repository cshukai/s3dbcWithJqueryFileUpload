var s3dbURL='http://204.232.200.16/uabs3db';
var username={};
 var password={};
 s3dbc.setDeployment(s3dbURL);
 s3dbc.setJSONP(false);
 s3dbc.login(username, password, function (err, key) {console.log(key);})
 // not preferred
 //$.get('http://204.232.200.16/uabs3db/uploads.php?key=Gpwyctifs5z28GG&filename=Export_1excelBC.txt&filesize=849.59');
//"<TABLE><TR><TD>error_code</TD><TD>message</TD><TD>filekey</TD></TR><TR><TD>0</TD><TD>This filekey is to be used instead of key for file transfer, it will expire in 24h. Break the file in base64 encoded fragments, replacing the character '+' with it's URL equivalent '%2b'</TD><TD>tQwJk7dJdyqd</TD></TR></TABLE>"


//preferred:

$("#fileupload").attr('action', s3dbURL+'/multiupload.php?key='+'Gpwyctifs5z28GG'+'&collection_id='+'89'+'&rule_id='+'99'+'&format=json');
