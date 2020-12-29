var word_list = [];
var mean_list = [];

getCSV(); //最初に実行される

//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "collect_word.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
        console.log(word_list.length);
        console.log(mean_list.length);
        showWord();
        showQuestion();
        showTable();
    }
}
 
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    // console.log(tmp)

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        split_data = tmp[i].split(',');
        word_list.push(split_data[1]);
        mean_list.push(split_data[2]);
    }
}

function showWord(){
    var ind = Math.floor( Math.random() * ((word_list.length-1) + 1 - 1)) + 1;
    document.getElementById("word").innerText = word_list[ind];
    document.getElementById("mean").innerText = mean_list[ind].replace(/"/g, ' ');
}

function showTable(){
    var tbody_1 = document.getElementById("tbody1");
    var tbody_2 = document.getElementById("tbody2");
    for(var i=1; i<word_list.length/2 - 31;i++){
        // tr要素を生成
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.textContent = i;
        tr.appendChild(th);
        var td = document.createElement('td');
        td.textContent = word_list[i];
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = mean_list[i].replace(/"/g, ' ');
        tr.appendChild(td);
        tbody_1.appendChild(tr);
    }
    for(var i=word_list.length/2 - 31; i<word_list.length-1;i++){
        // tr要素を生成
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.textContent = i;
        tr.appendChild(th);
        var td = document.createElement('td');
        td.textContent = word_list[i];
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = mean_list[i].replace(/"/g, ' ');
        tr.appendChild(td);
        tbody_2.appendChild(tr);
    }
}

function showQuestion(){
    document.getElementById("a_mean").style.visibility ="hidden";
    var ind = Math.floor( Math.random() * ((word_list.length-1) + 1 - 1)) + 1;
    document.getElementById("q_word").innerText = word_list[ind];
    document.getElementById("a_mean").innerText = mean_list[ind].replace(/"/g, ' ');
}

function showAnswer(){
    document.getElementById("a_mean").style.visibility ="visible";
    window.setTimeout("showQuestion()", 2000);
}