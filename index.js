var selectType = document.querySelector('#selectType');
var idQttDiv = document.querySelector('#idQttDiv');
var btnDiv = document.querySelector('#btnDiv');
var selection = document.querySelector('#selectType');
var encode = document.querySelector('#codeId');
var decode = document.querySelector('#decodeId');

encode.addEventListener('click', function () {
    if (encode.checked == true) {
        btnDiv.innerHTML = '<input class="btnEnviar" id="btnEnviar" type="submit" value="Codificar">';
    }
})

decode.addEventListener('click', function () {
    if (decode.checked == true) {
        btnDiv.innerHTML = '<input class="btnEnviar" id="btnEnviar" type="submit" value="Decodificar">';
    }
})

selectType.addEventListener('click', function () {
    if (selectType.value == 'cifra') {
        idQttDiv.style.display = 'flex';
    } else {
        idQttDiv.style.display = 'none';
    }
})

var btn = document.querySelector('#btnDiv');
btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.getElementById('decodeId').checked) {
        var code = document.getElementById('decodeId').value;
    } else if (document.getElementById('codeId').checked) {
        var code = document.getElementById('codeId').value;
    } else {
        alert('Selecione a opção Codificar ou Decodificar')
    }
    var text = document.querySelector('#text').value;
    var passo = document.querySelector('#quantity').value;
    var selection = document.querySelector('#selectType').value;
    if ((selection == 'Base64') && (code == 'encode')) {
        encodeBase64(text);
    } else if ((selection == 'Base64') && (code == 'decode')) {
        decodeBase64(text);
    } else if (selection == 'cifra' && (Number(passo) > 0) && (code == 'encode')) {
        cifraEncode(text, passo);
    } else if (selection == 'cifra' && (Number(passo) > 0) && (code == 'decode')) {
        cifraDecode(text, passo);
    } else if ((selection == 'empty') || (passo == 0)) {
        alert('Preencha todos os campos');
    }
})

function encodeBase64(text) {
    var result = document.querySelector('#textResult');
    outputText = btoa(text);
    result.innerText = outputText;
}

function decodeBase64(text) {
    var result = document.querySelector('#textResult');
    outputText = atob(text);
    result.innerText = outputText;
}

function cifraEncode(text, passo) {
    var outputText = '';
    var adjust = 0;
    var result = document.querySelector('#textResult');
    for (var i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90)) {
            adjust = (Number(text.charCodeAt(i))) - 65;
            adjust = (adjust + (Number(passo))) % 26;
            adjust += 65;
            outputText += String.fromCharCode(adjust);
        } else if (text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122) {
            adjust = (Number(text.charCodeAt(i))) - 97;
            adjust = (adjust + (Number(passo))) % 26;
            adjust += 97;
            outputText += String.fromCharCode(adjust);
        } else {
            outputText += String.fromCharCode(text.charCodeAt(i));
        }
    }
    result.innerText = outputText;
}

function cifraDecode(text, passo) {
    var outputText = '';
    var adjust = 0;
    var result = document.querySelector('#textResult');
    for (var i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90)) {
            adjust = (Number(text.charCodeAt(i))) - 65;
            adjust = (adjust - (Number(passo - 26))) % 26;
            adjust += 65;
            outputText += String.fromCharCode(adjust);
        } else if (text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122) {
            adjust = (Number(text.charCodeAt(i))) - 97;
            adjust = (adjust - (Number(passo - 26))) % 26;
            adjust += 97;
            outputText += String.fromCharCode(adjust);
        } else {
            outputText += String.fromCharCode(text.charCodeAt(i));
        }
    }
    result.innerText = outputText;
}
