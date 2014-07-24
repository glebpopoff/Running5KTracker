		var debugEnabled = true;
		var daysContainer = new Array();
		function insertSelector(id, txt, defaultText)
		{
			logger('insertSelector: ' + id);
			
			//build date from ID
			var runMon = id.substring(3,5);
			var runDay = id.substring(5,7);
			var runYear = id.substring(7);
			var runDate = new Date(runMon + '/' + runDay + '/' + runYear);
			//logger('Mon=' + runMon + ';Day=' + runDay + ';Year=' + runYear);
			
			var isFutureDate = false;// (runDate.getTime() > currentDateParam.getTime()) ? true : false;
			logger('Date Comparison: ' + isFutureDate);
			
			if (!daysContainer[id] && !isFutureDate)
			{
				var tdColumn = document.getElementById(id);
				
				var val = 3.1;
				if (milesContainer[id])
				{
					val = milesContainer[id];
				}
				var html = '<div class="position"><div class="date2">' + txt + '</div><div class="positionInput">Miles: <input class="milesInput" id="miles_' + id + '" type="text" value="' + val + '" maxlength="4" size="5" /> <input class="saveBtn" type="button" value="save" onclick="event.cancelBubble = true; save(\'' + id + '\', \'' + defaultText + '\')" /></div></div>';
				
				tdColumn.innerHTML = html ;
				
				tdColumn.style.backgroundColor = '#D6E779';
				
				daysContainer[id] = 1;
			} 
		}
		
		function didMakeCheckMark(v)
		{
			if (v >= 3.1)
			{
				return "<img src='/static/images/checkmark_small.png' />";
			} else
			{
				return "";
			}
		}
		
		function save(id, txt)
		{
			logger('save: ID=' + id);
			var txtVal = document.getElementById('miles_' + id);
			var tdColumn = document.getElementById(id);
			
			if (!(id && txtVal && tdColumn))
			{
				alert('Cannot save: invalid calendar identifier');
				return;
			}
			
			var runMon = id.substring(3,5);
			var runDay = id.substring(5,7);
			var runYear = id.substring(7);
			var dateStr = runMon + '/' + runDay + '/' + runYear;
			
			if (floatVal(txtVal.value) >= 0 && dateStr)
			{
				logger('About to save...');
				//save value
				$.ajax({
				  url: "/save?id=" + id + "&mi=" + floatVal(txtVal.value).toFixed(1) + "&d=" + dateStr,
				  context: document.body,
				  success: function(){
					logger('ajax data saved');
				  }
				});
				milesContainer[id] = txtVal.value;
				
				tdColumn.innerHTML = '<div class="position"><div class="date2">' + txt + '</div><div class="no-miles"><strong>' + txtVal.value + '</strong> total miles</div></div>';
				tdColumn.style.backgroundColor = '#D6E779';
				
				daysContainer[id] = null;
				
				updateTotalMiles();
				
				updateAcsysMiles();
				
				updateTotalAcsysMiles();
				
			} else
			{
				alert('Please enter valid number');
			}
		}
		
		function updateAcsysMiles()
		{
			if (totalPeopleContainer[myAcsysUserName] == null)
			{
				totalAcsys5kPeople = totalAcsys5kPeople + 1;
			}
			totalPeopleContainer[myAcsysUserName] = getTotalMiles(1) + getTotalMiles(2) + getTotalMiles(3) + getTotalMiles(4) + getTotalMiles(5);
			
			sortPeopleContainer();
			
			updateLeaderName();
			
			/*for (var key in totalPeopleContainer)
			{
				logger(key + ':' + totalPeopleContainer[key]);
			}*/
			
			drawChart2();
		}
		
		function updateLeaderName()
		{
			//update acsys leader div
			var milesLeaderDiv = document.getElementById('milesLeader');
			if (milesLeaderDiv)
			{
				logger('Current Leader:' + currentLeaderName);
				milesLeaderDiv.innerHTML = currentLeaderName;
			} else
			{
				logger('Error: cannot find div by id \'milesLeader\'');
			}
		}
		
		function sortPeopleContainer() 
		{
			var tuples = [];
			for (var key in totalPeopleContainer) 
			{	tuples.push([key, totalPeopleContainer[key]]);
			}
			tuples.sort(function(a, b) { return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0 });
			
			totalPeopleContainer = new Array();
			
			//now populate our old array
			for (var i = 0; i < tuples.length; i++) 
			{
				var key = tuples[i][0];
				var value = tuples[i][1];
				
				if (i == 0)
				{
					currentLeaderName = key;
				}
				
				totalPeopleContainer[key] = value;
			}
		}

		function updateHTMLDisplay()
		{
			logger('updateHTMLDisplay');
			if (milesHTMLContainer != null)
			{
				for(var id in milesHTMLContainer)
				{
					var dataContainer = milesHTMLContainer[id];
					if (dataContainer)
					{
						var tdColumn = document.getElementById(id);
						if (tdColumn)
						{
							//logger('setting html for column: ' + id);
							tdColumn.innerHTML = '<div class="position"><div class="date2">' + dataContainer[0] + '</div><div class="no-miles"><strong>' + dataContainer[1] + '</strong> total miles</div></div>';
							tdColumn.style.backgroundColor = '#D6E779';
						} else
						{
							logger("failed to retrieve table column by id: " + id);
						}
					} else
					{
						logger('failed to retrieve data container for key: ' + i);
					}
				}
			} else
			{
				logger('milesHTMLContainer: empty array');
			}
		}
		
		function getTotalParticipants()
		{
			logger('getTotalParticipants: ' + totalAcsys5kPeople);
			return totalAcsys5kPeople;
		}
		
		function getTotalMiles(weekNo)
		{
			//logger('getTotalMiles: ' + weekNo);
			if (weekNo == 1)
			{
				return floatVal(milesContainer['id-10022011']) + floatVal(milesContainer['id-10032011']) + floatVal(milesContainer['id-10042011']) + floatVal(milesContainer['id-10052011']) + floatVal(milesContainer['id-10062011']) + floatVal(milesContainer['id-10072011']) + floatVal(milesContainer['id-10082011']);
			}
			
			if (weekNo == 2)
			{
				return floatVal(milesContainer['id-10092011']) + floatVal(milesContainer['id-10102011']) + floatVal(milesContainer['id-10112011']) + floatVal(milesContainer['id-10122011']) + floatVal(milesContainer['id-10132011']) + floatVal(milesContainer['id-10142011']) + floatVal(milesContainer['id-10152011']);
			}
			
			if (weekNo == 3)
			{
				return floatVal(milesContainer['id-10162011']) + floatVal(milesContainer['id-10172011']) + floatVal(milesContainer['id-10182011']) + floatVal(milesContainer['id-10192011']) + floatVal(milesContainer['id-10202011']) + floatVal(milesContainer['id-10212011']) + floatVal(milesContainer['id-10222011']);
			}
			
			if (weekNo == 4)
			{
				return floatVal(milesContainer['id-10232011']) + floatVal(milesContainer['id-10242011']) + floatVal(milesContainer['id-10252011']) + floatVal(milesContainer['id-10262011']) + floatVal(milesContainer['id-10272011']) + floatVal(milesContainer['id-10282011']) + floatVal(milesContainer['id-10292011']);
			}
			
			if (weekNo == 5)
			{
				return floatVal(milesContainer['id-10302011']) + floatVal(milesContainer['id-10312011']);
			}
		}
		
		function updateTotalMiles()
		{
			logger('updateTotalMiles');
			
			//week 1
			var totalElm1 = document.getElementById('week1-total');
			var totalVal1 = '0 miles';
			
			totalVal1 = getTotalMiles(1) ;
			
			logger('Total Value Week 1: ' + totalVal1);
			
			if (totalVal1 > 0)
			{
				totalVal1 = totalVal1.toFixed(1) + ' miles';
			} else
			{
				totalVal1 = '0 miles'
			}
			
			if (totalElm1)
			{
				totalElm1.innerHTML = totalVal1;
			}
			
			//week 2
			var totalElm2 = document.getElementById('week2-total');
			var totalVal2 = '0 miles';
			
			totalVal2 = getTotalMiles(2) ;
			
			logger('Total Value Week 2: ' + totalVal2);
			
			if (totalVal2 > 0)
			{
				totalVal2 = totalVal2.toFixed(1) + ' miles';
			} else
			{
				totalVal2 = '0 miles'

			}
			
			if (totalElm2)
			{
				totalElm2.innerHTML = totalVal2;
			}
			
			//week 3
			var totalElm3 = document.getElementById('week3-total');
			var totalVal3 = '0 miles';
			
			totalVal3 = getTotalMiles(3);
			
			logger('Total Value Week 3: ' + totalVal3);
			
			if (totalVal3 > 0)
			{
				totalVal3 = totalVal3.toFixed(1) + ' miles';
			} else
			{
				totalVal3 = '0 miles'
			}
			
			if (totalElm3)
			{
				totalElm3.innerHTML = totalVal3;
			}
			
			//week 4
			var totalElm4 = document.getElementById('week4-total');
			var totalVal4 = '0 miles';
			
			totalVal4 = getTotalMiles(4) ;
			
			logger('Total Value Week 4: ' + totalVal4);
			
			if (totalVal4 > 0)
			{
				totalVal4 = totalVal4.toFixed(1) + ' miles';
			} else
			{
				totalVal4 = '0 miles'
			}
			
			if (totalElm4)
			{
				totalElm4.innerHTML = totalVal4;
			}
			
			//week 5
			var totalElm5 = document.getElementById('week5-total');
			var totalVal5 = '0 miles';
			
			totalVal5 = getTotalMiles(5) ;
			
			logger('Total Value Week 5: ' + totalVal4);
			
			if (totalVal5 > 0)
			{
				totalVal5 = totalVal5.toFixed(1) + ' miles';
			} else
			{
				totalVal5 = '0 miles'
			}
			
			if (totalElm5)
			{
				totalElm5.innerHTML = totalVal5;
			}
			
			drawChart1();
			
			//update total acsys miles
			updateTotalAcsysMiles();
		}
		
		function updateTotalAcsysMiles()
		{
			logger('updateTotalAcsysMiles');
			if (document.getElementById('totalAcsysMiles'))
			{
				var totalMiles = 0;
				for(var name in totalPeopleContainer)
				{
					totalMiles += totalPeopleContainer[name];
				}
				logger('Total Acsys Miles: ' + totalMiles);
				document.getElementById('totalAcsysMiles').innerHTML = totalMiles.toFixed(1);
			}
		}
		
		function logger(txt) 
		{
			if (!debugEnabled) return;
			try {
				if (typeof (console) != "undefined") {
					console.log(txt);
				}
			} catch (ex) { }
		}
		
		function floatVal(val)
		{
			if (val != null && val) 
			{
				//logger('intVal: val=' + val + ';parseIntVal=' + parseInt(val));
				return parseFloat(val);
			} else
			{
				return 0;
			}
		}
		
		
		
