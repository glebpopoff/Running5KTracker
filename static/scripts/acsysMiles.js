google.setOnLoadCallback(drawChart2);
var acsysChart;
	function drawChart2() {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Week');
		data.addColumn('number', 'Miles');
		data.addRows(getTotalParticipants());
		var counter = 0;
		for(var name in totalPeopleContainer)
		{
			data.setValue(counter, 0, name);
			data.setValue(counter, 1, totalPeopleContainer[name]);
			counter++;
		}
				
		acsysChart = new google.visualization.ColumnChart(document.getElementById('acsys_milesgraph_div'));
		acsysChart.draw(data, { width: 960, height: 240, is3D: true, title: 'Acsys Tracker',  colors:[{color:'#FF0000', darker:'#680000'}, {color:'cyan', darker:'deepskyblue'}] }); 
		
		// Add our over/out handlers.
		google.visualization.events.addListener(acsysChart, 'onmouseover', barMouseOverAcsys);
		google.visualization.events.addListener(acsysChart, 'onmouseout', barMouseOutAcsys);
		google.visualization.events.addListener(acsysChart, 'select', function() {
			var row = acsysChart.getSelection()[0].row;
			var userName = data.getValue(row, 0);
			if (userName)
			{
				logger('Displaying Table For User: ' + userName);
				drawTableUsage(userName);
			}
      });
	}
	
	function barMouseOverAcsys(e) 
	{
		acsysChart.setSelection([e]);
	}
  
	function barMouseOutAcsys(e) 
	{
		acsysChart.setSelection([{'row': null, 'column': null}]);
	}
