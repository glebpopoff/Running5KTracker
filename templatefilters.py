from google.appengine.ext import webapp
from datetime import datetime
# get registry, we need it to register our filter later.
register = webapp.template.create_template_register()

def getCssForCalcDate(todayDate, calendarDate):
	todayDateObj = datetime.strptime(todayDate, '%m/%d/%Y')
	calendarDateObj = datetime.strptime(calendarDate, '%m%d%Y')
	if (todayDateObj > calendarDateObj):
		return 'calendar-date-past'
		
	if (todayDateObj == calendarDateObj):
		return 'calendar-date-today'
		
	if (todayDateObj < calendarDateObj):
		return 'calendar-date-future'
	
register = webapp.template.create_template_register()
register.filter(getCssForCalcDate)