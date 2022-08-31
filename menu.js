const sheetId = '1aGalaCMAjNACgszhRG8nWrLMDMPraeMdq4C0d9AM0gU';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'menu';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
const colz = [];
var jsonData;


(function( win ){
	var doc = win.document;
	if( !location.hash && win.addEventListener ){
		win.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );
		
		win.addEventListener( "load", function(){
			setTimeout(function(){
				if( getScrollTop() < 20 ){
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		}, false );
	}
})( this );

var category;
window.onload = function () {
    var documentUrl = document.location.href;
    const url = new URL(documentUrl);
    category = url.searchParams.get('category');
    console.log(category);
    $(".selected").text(category);
}

const output = document.querySelector('.menulist')
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");

const trigger = document.querySelector('.trigger');
const nav = document.querySelector('.full-screen-nav');
const backdrop = document.querySelector('.backdrop');

if (window.innerWidth > 500) {
    document.querySelector(".splash").style.zIndex = "10";
    document.querySelector(".splash").style.opacity = "1";
    document.querySelector(".error").style.display = "block";
} else {
    document.querySelector(".splash").style.zIndex = "-10";
    document.querySelector(".splash").style.opacity = "0";
    document.querySelector(".error").style.display = "none";
}

trigger.addEventListener('click', () => nav.classList.add('open-nav'));
backdrop.addEventListener('click', () => nav.classList.remove('open-nav'));
selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

function dropdownclicklistener() {
    $(".option").click(function () {
        $(".selected").text($(this).children("label").text())
        var tableHeaderRowCount = 1;
        var rowCount = output.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            output.deleteRow(tableHeaderRowCount);
        }
        fetchRows(jsonData, $(".selected").text())
        optionsContainer.classList.remove("active");
    })
}

document.addEventListener('DOMContentLoaded', init)

function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            initheading(jsonData)
        })
}

function initheading(jsonData) {
    const tr = document.createElement('tr');

    jsonData.table.cols.forEach((heading) => {
        if (heading.label) {
            let column = heading.label;
            if (column != 'Category') {
                colz.push(column);
                const th = document.createElement('th');
                if (column == 'Price (Rs.)') {
                    th.style.width = 85 + "px";
                }
                th.innerText = column;
                tr.appendChild(th);
            }
        }
    })
    output.appendChild(tr);
    var distinct = []
    jsonData.table.rows.forEach((rowData) => {
        if (!distinct.includes(rowData.c[2].v)) {
            distinct.push(rowData.c[2].v)
        }
    })
    distinct.forEach((value) => {
        $(".options-container").append('<div class="option">' +
            '<input type="radio" class="radio" name="category" />' +
            '<label>' + value + '</label>' + '</div>')
    })
    dropdownclicklistener();
    fetchRows(jsonData, category);
}

function fetchRows(jsonData, key) {
    const data = []
    jsonData.table.rows.forEach((rowData) => {
        const row = {};
        if (rowData.c[2].v == key) {
            colz.forEach((ele, ind) => {
                row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
            })
            data.push(row);
        }
    })
    processRows(data);
}

function processRows(json) {
    json.forEach((row) => {
        const tr = document.createElement('tr');
        const keys = Object.keys(row);

        keys.forEach((key) => {
            if (key != 'Category') {
                const td = document.createElement('td');
                td.textContent = row[key];
                tr.appendChild(td);
            }
        })
        output.appendChild(tr);
    })
}


