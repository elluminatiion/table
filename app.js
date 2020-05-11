let form_data;
let count_pagination = 4; //Количество строк для вывода
let table_name = 'table_form&rows=' + count_pagination;//название таблицы
loadurl('request.php?table_name=' + table_name, 'GET');

function parsejs(obj) {
    return JSON.parse(obj);
}

function createtable(data, pagination = null) {
    let tbodyid = document.getElementById('table_class');
    tbodyid.innerHTML = '';
    if (data.array.length) {
        let pag = document.getElementById('pagination');
        pag.innerHTML = '';
        countrows = Math.ceil(data.countall[0][0] / count_pagination);
        if (pagination === null) {
            pagination = 1;
        }
        for (i = 1; i <= countrows; i++) {
            if (i !== pagination) {
                addclass = ' point';
            } else {
                addclass = '';
            }
            pag.innerHTML += '<div class="pag' + addclass + '" onclick="switch_pag(' + i + ')">' + i + '</div>';
        }
        data.array.forEach(elem => {
                tbodyid.innerHTML += '<tr>' +
                    '<td>' + elem.table_date + '</td>' +
                    '<td>' + elem.table_name + '</td>' +
                    '<td>' + elem.table_count + '</td>' +
                    '<td>' + elem.table_distance + '</td>' +
                    '</tr>'
            }
        );
    } else {
        document.getElementById('pagination').innerHTML = 'Ничего не найдено';
    }
}

function switch_pag(y) {
    limit = (y - 1) * count_pagination;
    loadurl('request.php?table_name=' + table_name + '&limit=' + limit, 'POST', form_data, y++);
}

function loadurl(filename, method, send = null, pagination = null) {
    xhr = new XMLHttpRequest();
    xhr.open(method, filename, true);
    xhr.send(send);
    xhr.onload = function (e) {
        if (this.readyState === 4 && this.status === 200) {
            createtable(parsejs(this.responseText), pagination);
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
        document.getElementById('symbol_filter').style.display = 'inline-block';
    }
}

function table_filter() {
    form_data = new FormData(document.forms.tableform);
    loadurl('request.php?table_name=' + table_name, 'POST', form_data);
}