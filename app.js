var data = '';

loadurl('request.php?table=task_bj');

function parsejs(obj) {
    return JSON.parse(obj);
}

function filter_bj(filter) {
    loadurl('request.php?table=task_bj&filter=' + filter);
}

function addel() {
    var obj = '';
    if (window.showModalDialog) {
        var modalview = showModalDialog('modal.html', obj, 'dialogWidth:200px; dialogHeight:200px;dialogMargin:auto');
    } else {
        var modalview = window.open('modal.html', null, 'width=200,height=200,margin=auto,modal=yes,alwaysRaised=yes', null);
        modalview.dialogArguments = obj;
    }
}


function createtable(data) {
    tbodyid = document.getElementById('table_class');
    tbodyid.innerHTML = '';
    i = 1;
    y = 0;
    pag = document.getElementById('pagination');
    data.forEach(elem => {
            if (i <= 3) {
                i++;
            } else {
                i = 1;
                y++;
                if (y === 1){
                    pag.innerHTML = '<div class="pag" onclick="switch_pag(1)">1</div><div class="point pag" onclick="switch_pag(2)"> 2</div>';
                } else {
                    pag.innerHTML += '<div class="point pag" onclick="switch_pag('+y+')">' + '</div>';
                }
            }
            tbodyid.innerHTML += '<tr class="pag' + y + ' hide">' +
                '<td>' + elem.name + '</td>' +
                '<td>' + elem.email + '</td>' +
                '<td>' + elem.task + '</td>' +
                '<td>' + elem.status + '</td>' +
                '</tr>'
        }
    );
    hide_elem = document.getElementsByClassName('pag0');
    for (i=0;i<hide_elem.length;i++){
        hide_elem[i].style.display='table-row';

    }
}
function switch_pag(y) {
    pag = document.getElementsByClassName('pag');
    for (i=0;i<pag.length;i++){
        pag[i].classList.add('point');
        pagi = document.getElementsByClassName('pag' + i);
        for (z=0;z<pagi.length;z++){
            pagi[z].style.display = 'none';
        }

    }
    y--;
    pag[y].classList.remove('point');
    pagi = document.getElementsByClassName('pag' + y);
    for (z=0;z<pagi.length;z++){
        pagi[z].style.display = 'table-row';
    }
}
function loadurl(filename) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', filename, true);
    xhr.send();
    xhr.onload = function (e) {
        if (this.readyState === 4 && this.status === 200) {
        createtable(parsejs(this.responseText));
           return this.responseText;
        }
    };

}