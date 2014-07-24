google.load("visualization", "1", { packages: ["columnchart"] });
var myMilesChart;
	google.setOnLoadCallback(drawChart1);
	function drawChart1() {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Week');
		data.addColumn('number', 'My Miles');
		data.addRows(5);
		
		data.setValue(0, 0, 'Week 1');
		
		data.setValue(1, 0, 'Week 2');
		
		data.setValue(2, 0, 'Week 3');
		
		data.setValue(3, 0, 'Week 4');
		
		data.setValue(4, 0, 'Week 5');
		
		data.setValue(0, 1, getTotalMiles(1));
		
		data.setValue(1, 1, getTotalMiles(2));
		
		data.setValue(2, 1, getTotalMiles(3));
		
		data.setValue(3, 1, getTotalMiles(4));

		data.setValue(4, 1, getTotalMiles(5));
		
		myMilesChart = new google.visualization.ColumnChart(document.getElementById('my_milesgraph_div'));
		myMilesChart.draw(data, { width: 300, height: 250, is3D: true, title: 'My Tracker' });
		google.visualization.events.addListener(myMilesChart, 'onmouseover', barMouseOverMyMiles);
		google.visualization.events.addListener(myMilesChart, 'onmouseout', barMouseOutMyMiles);
}

	function barMouseOverMyMiles(e) 
	{
		myMilesChart.setSelection([e]);
	}
  
	function barMouseOutMyMiles(e) 
	{
		myMilesChart.setSelection([{'row': null, 'column': null}]);
	}