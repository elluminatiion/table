let data = '';

loadurl('request.php?table=table_form', 'GET');

function parsejs(obj) {
    return JSON.parse(obj);
}

function createtable(data) {
    let tbodyid = document.getElementById('table_class');
    tbodyid.innerHTML = '';
    let i = 0;
    let y = 0;
    let pag = document.getElementById('pagination');
    pag.innerHTML = '';
    data.forEach(elem => {
            if (i <= 3) {
                i++;
            } else {
                i = 1;
                y++;
                if (y === 1) {
                    pag.innerHTML = '<div class="pag" onclick="switch_pag(1)">1</div>';
                } else {
                    pag.innerHTML += '<div class="point pag" onclick="switch_pag(' + y + ')">' + y + '</div>';
                }
            }
            tbodyid.innerHTML += '<tr class="pag' + y + ' hide">' +
                '<td>' + elem.table_date + '</td>' +
                '<td>' + elem.table_name + '</td>' +
                '<td>' + elem.table_count + '</td>' +
                '<td>' + elem.table_distance + '</td>' +
                '</tr>'
        }
    );
    let hide_elem = document.getElementsByClassName('pag0');
    for (i = 0; i < hide_elem.length; i++) {
        hide_elem[i].style.display = 'table-row';
    }
}

function switch_pag(y) {
    pag = document.getElementsByClassName('pag');
    for (i = 0; i < pag.length; i++) {
        pag[i].classList.add('point');
        pagi = document.getElementsByClassName('pag' + i);
        for (z = 0; z < pagi.length; z++) {
            pagi[z].style.display = 'none';
        }

    }
    y--;
    pag[y].classList.remove('point');
    pagi = document.getElementsByClassName('pag' + y);
    for (z = 0; z < pagi.length; z++) {
        pagi[z].style.display = 'table-row';
    }
}

function loadurl(filename, method, send = null) {
    xhr = new XMLHttpRequest();
    xhr.open(method, filename, true);
    xhr.send(send);
    xhr.onload = function (e) {
        if (this.readyState === 4 && this.status === 200) {
            createtable(parsejs(this.responseText));
            return this.responseText;
        }
    };
}

function table_select_filter(table_filter_option) {
    if (table_filter_option) {
        let table_filter = document.getElementById('table_filter');
        let table_cond = '';
        if (table_filter_option !== 'table_name') {
            table_cond = ' type="number"'
        }
        table_filter.innerHTML = '<input name="result"' + table_cond + '> ' +
            '<input type="button" onclick="table_filter()" value="Найти">';
        document.getElementById('symbol_filter').style.display = 'block';
    }
}

function table_filter() {
    form_data = new FormData(document.forms.tableform);
    loadurl('request.php?table=table_form', 'POST', form_data);
}