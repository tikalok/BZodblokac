var tok = '';
var toka = document.body.innerHTML.match(/name="birdztoken" value="\S*"/g);
if(toka){
tok = toka[0].replace('name="birdztoken" value="', '');
tok = tok.replace('"', '');
}

if (tok.length != 0){
   chrome.storage.local.set({'birdztoken': tok}, function() {
        });
}
else
{
  chrome.runtime.sendMessage({method:'getToken'},function(birdztoken){
    tok = birdztoken;
    if(tok.length != 0)
    {
      modify();
    }
  });
}

function modify(){

var empty = '';
var av = document.body.innerHTML.match(/class="av"><img src="http\S*jpg"\s*alt="Ja"><strong>\S*<\/strong>/g);
var ss1 = /class="av"><img src="http/g,
    ss2 = 'http';
var av1 = av[0].replace(ss1, ss2);
var ss3 = /jpg"\s*alt="Ja"><strong>\S*<\/strong>/g;
var sss = av1.match(ss3);
var regs = /jpg"\s*alt="Ja"><strong>/gm;
var nickname = sss[0].replace(regs, empty);
nickname = nickname.replace(/<\/strong>/g, empty);
var ss4 = 'jpg';
var avatarurl = av1.replace(ss3, ss4);
var firstb = document.URL.indexOf('birdz.sk/webka');
var linka = document.URL.substr(firstb+8);
var lasth = linka.lastIndexOf(".html");
linka = linka.substr(0, lasth+5);
var words = linka.split("/");
var blockername = words[2];
var type = words[3];
var lastd = linka.lastIndexOf("/");
var topic_title = linka.substr(lastd+1);
var lastt = topic_title.lastIndexOf("-");
var content_id = topic_title.substr(0, lastt);

var typ = 'nastenka';
if (type === 'fotoalbum'){
  typ = 'fotoalbumy';
}
if (type === 'videoblog'){
  typ = 'video';
}
if (type === 'blog'){
  typ = 'blogy';
}


var str1 = /<div class="nastred">.*<\/ul>.*<span class="maly">\s*Nemôžem komentovať\.\s*Zablokoval.? ma.*span>\s*<\/div>/gim;
var str2 = '<div id="pridajkoment" class="comment"><div class="cavatar"><img src="';
str2 = str2.concat(avatarurl);
var str3 = '" alt="2540900001414937718" class="avatar"></div>';
str2 = str2.concat(str3);
var str4 = '<div class="ccomment"><strong class="nick">'
str4 = str4.concat(nickname);
str4 = str4.concat('</strong><span class="desc">, napíš koment:</span>');
str2 = str2.concat(str4);

var strf = '<form action="http://www.birdz.sk/';
strf = strf.concat(typ);
strf = strf.concat('/komentovat" id="komentovat" method="post" accept-charset="utf-8"><div style="display:none"><input type="hidden" name="birdztoken" value="');
strf = strf.concat(tok);
strf = strf.concat('"></div>');
str2 = str2.concat(strf);

var stri1 = '<input type="hidden" name="linka" value="';
stri1 = stri1.concat(linka);
stri1 = stri1.concat('">');
str2 = str2.concat(stri1);
var stri2 = '<input type="hidden" name="title" value="Zablokané oné">';
str2 = str2.concat(stri2);
var stri3 = '<input type="hidden" name="topic_title" value="';
stri3 = stri3.concat(topic_title);
stri3 = stri3.concat('">');
str2 = str2.concat(stri3);
var stri4 = '<input type="hidden" name="content_id" value="';
stri4 = stri4.concat(content_id);
stri4 = stri4.concat('">');
str2 = str2.concat(stri4);
var stri5 = '<input type="hidden" name="notify" value="';
stri5 = stri5.concat(blockername);
stri5 = stri5.concat('">');
str2 = str2.concat(stri5);
var but = '<textarea name="textkomentu" cols="40" rows="10" id="pridajnovykoment" class="shi"></textarea><input type="submit" name="submit" value="Pridať koment" class="largeButton">';
str2 = str2.concat(but);

//smajle

//

str2 = str2.concat('</form>');
str2 = str2.concat('<div class="komentujem n"><div class="birdzloader"></div><span class="desc">Posielam koment, šup šup dáta idú svetom…</span></div>');

str2 = str2.concat("<script>\n/*\n$(function()\n{\n$('#komentovat').submit(function()\n{var form = $(this);\nconsole.log('ok');\n$.ajax('/nastenka/komentovat',{\ntype: 'POST',\ndata: form.serialize(),\nsuccess: function(data) {\n},\ndataType: 'JSON',\n});\n$('#komentovat').hide();\n$('.komentujem').fadeIn(400);\n});\n});\n*/\n</script>");
str2 = str2.concat('</div>\n</div>');

document.body.innerHTML = document.body.innerHTML.replace(str1, str2);

}
