var bmiBtn = document.getElementById('bmiBtn');
var bmiIcon = document.getElementById('bmiIcon');
var infoShow = document.getElementById('infoShow');
var bmiList = document.getElementById('bmiList');
var bmiArray = JSON.parse(localStorage.getItem('myBmi')) || [];

loadBmiInfo(bmiArray);

function bmiAnswer(e) {
    var cm = document.getElementById('cm').value;
    var kg = document.getElementById('kg').value;
    var alertEr = '';
    if (cm == "") {
        alert("請輸出身高");
    } else if (kg == "") {
        alert("請輸出體重");
    } else if (cm == "" && kg == "") {
        alert("請輸出身高及體重");
    } else {
        var dt = new Date();
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var year = dt.getFullYear();
        var nowTime = month + '-' + day + '-' + year;
        var bmi = parseInt(kg) / ((parseInt(cm) / 100) * (parseInt(cm) / 100));
        var bmiFix = bmi.toFixed(2);
        var bmiInfo = '';
        var bmiColor = '';
        if (bmiFix < 18.5) {
            bmiInfo = "過輕";
            bmiColor = "#31BAF9";
        } else if (bmiFix > 18.5 && bmiFix < 22) {
            bmiInfo = "一般體重";
            bmiColor = "#86D73E";
        } else if (bmiFix > 22 && bmiFix < 24) {
            bmiInfo = "理想";
            bmiColor = "#FF982D";
        } else if (bmiFix > 24 && bmiFix < 30) {
            bmiInfo = "過重";
            bmiColor = "#FF6C02";
        } else if (bmiFix > 30 && bmiFix < 40) {
            bmiInfo = "嚴重超重";
            bmiColor = "#FF6C02";
        } else if (bmiFix > 40) {
            bmiInfo = "重度肥胖";
            bmiColor = "#FF1200";
        }
        infoShow.textContent = bmiInfo;
        infoShow.style.color = bmiColor;
        bmiBtn.textContent = bmiFix;
        bmiBtn.style.color = bmiColor;
        bmiBtn.style.background = "#424242"; 
        bmiBtn.style.border = "6px solid " + bmiColor + ""; 
        bmiIcon.style.display = "block";
        bmiIcon.style.background = bmiColor;


        var bmiSave = {
            color: bmiColor,
            info: bmiInfo,
            bmiNum: bmiFix,
            weight: kg,
            height: cm,
            nT: nowTime
        }

        bmiArray.unshift(bmiSave);
        localStorage.setItem('myBmi', JSON.stringify(bmiArray));

        loadBmiInfo(bmiArray);
    }
}

function loadBmiInfo(bmiA) {
    var len = bmiA.length;
    var str = '';
    for (var a = 0; a < len; a++) {
        str += '<ul class="bmiCol" style="border-left: 5px solid ' + bmiA[a].color + ';" ><li class="info">' + bmiA[a].info + '</li><li class="num"> <span>BMI </span>' + bmiA[a].bmiNum + '</li><li class="weight"> <span>weight </span>' + bmiA[a].weight + 'kg</li><li class="height"> <span>height</span>' + bmiA[a].height + 'cm</li><li class="time"> <span>' + bmiA[a].nT + '</span></li><li><i class="clear fa fa-trash" data-num = "' + [a] + '"></i></li></ul>';
    }
    bmiList.innerHTML = str;
    console.log(bmiA);
}

function bmiDel(e) {
    var n = e.target.dataset.num;
    if (e.target.nodeName != "I") {
        return }
    console.log(n);
    bmiArray.splice(n, 1);
    localStorage.setItem('myBmi', JSON.stringify(bmiArray));
    loadBmiInfo(bmiArray);
}

bmiBtn.addEventListener('click', bmiAnswer);
bmiList.addEventListener('click', bmiDel);
