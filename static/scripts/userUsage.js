//google.setOnLoadCallback(drawTableUsage);
google.load('visualization', '1', { packages: ['table'] });

function drawTableUsage(username) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Week1');
    data.addColumn('number', 'Week2');
    data.addColumn('number', 'Week3');
	data.addColumn('number', 'Week4');
	data.addColumn('number', 'Week5');
    
	//7 days
	data.addRows(7);
	
	var userData = milesPeopleContainer[username];
	//logger(userData);
	for(var dataObj in userData)
	{
		//week 1
		data.setCell(0, 0, floatVal(userData['id-10022011']), "<span class='calendar_date_item'>October 2:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10022011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10022011'])), {'style': 'font-weight: normal;'});
		data.setCell(1, 0, floatVal(userData['id-10032011']), "<span class='calendar_date_item'>October 3:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10032011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10032011'])), {'style': 'font-weight: normal;'});
		data.setCell(2, 0, floatVal(userData['id-10042011']), "<span class='calendar_date_item'>October 4:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10042011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10042011'])), {'style': 'font-weight: normal;'});
		data.setCell(3, 0, floatVal(userData['id-10052011']), "<span class='calendar_date_item'>October 5:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10052011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10052011'])), {'style': 'font-weight: normal;'});
		data.setCell(4, 0, floatVal(userData['id-10062011']), "<span class='calendar_date_item'>October 6:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10062011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10062011'])), {'style': 'font-weight: normal;'});
		data.setCell(5, 0, floatVal(userData['id-10072011']), "<span class='calendar_date_item'>October 7:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10072011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10072011'])), {'style': 'font-weight: normal;'});
		data.setCell(6, 0, floatVal(userData['id-10082011']), "<span class='calendar_date_item'>October 8:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10082011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10082011'])), {'style': 'font-weight: normal;'});
		
		//week 2
		data.setCell(0, 1, floatVal(userData['id-10092011']), "<span class='calendar_date_item'>October 9:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10092011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10092011'])), {'style': 'font-weight: normal;'});
		data.setCell(1, 1, floatVal(userData['id-10102011']), "<span class='calendar_date_item'>October 10:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10102011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10102011'])), {'style': 'font-weight: normal;'});
		data.setCell(2, 1, floatVal(userData['id-10112011']), "<span class='calendar_date_item'>October 11:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10112011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10112011'])), {'style': 'font-weight: normal;'});
		data.setCell(3, 1, floatVal(userData['id-10122011']), "<span class='calendar_date_item'>October 12:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10122011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10122011'])), {'style': 'font-weight: normal;'});
		data.setCell(4, 1, floatVal(userData['id-10132011']), "<span class='calendar_date_item'>October 13:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10132011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10132011'])), {'style': 'font-weight: normal;'});
		data.setCell(5, 1, floatVal(userData['id-10142011']), "<span class='calendar_date_item'>October 14:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10142011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10142011'])), {'style': 'font-weight: normal;'});
		data.setCell(6, 1, floatVal(userData['id-10152011']), "<span class='calendar_date_item'>October 15:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10152011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10152011'])), {'style': 'font-weight: normal;'});
		
		//week 3
		data.setCell(0, 2, floatVal(userData['id-10162011']), "<span class='calendar_date_item'>October 16:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10162011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10162011'])), {'style': 'font-weight: normal;'});
		data.setCell(1, 2, floatVal(userData['id-10172011']), "<span class='calendar_date_item'>October 17:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10172011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10172011'])), {'style': 'font-weight: normal;'});
		data.setCell(2, 2, floatVal(userData['id-10182011']), "<span class='calendar_date_item'>October 18:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10182011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10182011'])), {'style': 'font-weight: normal;'});
		data.setCell(3, 2, floatVal(userData['id-10192011']), "<span class='calendar_date_item'>October 19:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10192011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10192011'])), {'style': 'font-weight: normal;'});
		data.setCell(4, 2, floatVal(userData['id-10202011']), "<span class='calendar_date_item'>October 20:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10202011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10202011'])), {'style': 'font-weight: normal;'});
		data.setCell(5, 2, floatVal(userData['id-10212011']), "<span class='calendar_date_item'>October 21:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10212011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10212011'])), {'style': 'font-weight: normal;'});
		data.setCell(6, 2, floatVal(userData['id-10222011']), "<span class='calendar_date_item'>October 22:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10222011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10222011'])), {'style': 'font-weight: normal;'});
		
		//week 4
		data.setCell(0, 3, floatVal(userData['id-10232011']), "<span class='calendar_date_item'>October 23:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10232011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10232011'])), {'style': 'font-weight: normal;'});
		data.setCell(1, 3, floatVal(userData['id-10242011']), "<span class='calendar_date_item'>October 24:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10242011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10242011'])), {'style': 'font-weight: normal;'});
		data.setCell(2, 3, floatVal(userData['id-10252011']), "<span class='calendar_date_item'>October 25:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10252011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10252011'])), {'style': 'font-weight: normal;'});
		data.setCell(3, 3, floatVal(userData['id-10262011']), "<span class='calendar_date_item'>October 26:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10262011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10262011'])), {'style': 'font-weight: normal;'});
		data.setCell(4, 3, floatVal(userData['id-10272011']), "<span class='calendar_date_item'>October 27:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10272011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10272011'])), {'style': 'font-weight: normal;'});
		data.setCell(5, 3, floatVal(userData['id-10282011']), "<span class='calendar_date_item'>October 28:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10282011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10282011'])), {'style': 'font-weight: normal;'});
		data.setCell(6, 3, floatVal(userData['id-10292011']), "<span class='calendar_date_item'>October 29:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10292011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10292011'])), {'style': 'font-weight: normal;'});
		
		//week 5
		data.setCell(0, 4, floatVal(userData['id-10302011']), "<span class='calendar_date_item'>October 30:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10302011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10302011'])), {'style': 'font-weight: normal;'});
		data.setCell(1, 4, floatVal(userData['id-10312011']), "<span class='calendar_date_item'>October 31:</span> <span class='calendar_date_item_miles'>" + floatVal(userData['id-10312011']) + " miles</span>" + didMakeCheckMark(floatVal(userData['id-10312011'])), {'style': 'font-weight: normal;'});
		
	}
	 
	document.getElementById('user_usage_name').style.display = 'block';
    document.getElementById('user_usage_name').innerHTML = username;    
    
    var table = new google.visualization.Table(document.getElementById('user_usage_div'));
    table.draw(data, { showRowNumber: false, allowHtml: true });
    
    google.visualization.events.addListener(table, 'select', function() {
        var row = table.getSelection()[0].row;
        //logger('Selected Row: ' + data.getValue(row, 0));
      });

}

