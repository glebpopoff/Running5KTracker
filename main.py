#!/usr/bin/env python
#
import os
from datetime import datetime, date, time
import datetime
import calendar
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp 
from google.appengine.ext.webapp import util
from google.appengine.ext import db
import base64
import Cookie
import logging
import urllib
import email.utils
import operator

#
# Acsys 5K: Built over a weekend by GlebP, 2011
#

class PersonDB(db.Model):
	userid = db.StringProperty()
	recordid = db.StringProperty()
	milesno = db.FloatProperty()
	rundate = db.DateTimeProperty()
	addeddate = db.DateTimeProperty(auto_now_add=True)

class BasePage(webapp.RequestHandler):
	def get(self):
		#get username either from cookies or request
		userName = ''
		cookieName = "UserName5K"
		now = datetime.datetime.now()
		todayDateStr = "%s/%s/%s" % (now.month,now.day,now.year)#'05/11/2011'
		
		if (cookieName in self.request.cookies):
			#read cookie
			userName = self.request.cookies[cookieName]
		else:
			#get it from URL & set cookie (e.g. http://localhost:8080/?u=R2xlYlA%3D (GlebP) 
			userParam = 'u'
			if (userParam in self.request.params):
				userName = urllib.unquote(base64.decodestring(self.request.params[userParam]))
				logging.debug('base: setting new cookie: %s' % userName);
				userCookie = Cookie.BaseCookie()
				userCookie[cookieName] = userName
				expires = datetime.datetime.utcnow() + datetime.timedelta(days=30)
				timestamp = calendar.timegm(expires.utctimetuple())
				userCookie[cookieName]["expires"] = email.utils.formatdate(timestamp,localtime=False,usegmt=True)
				for morsel in userCookie.values():
					self.response.headers.add_header('Set-Cookie',morsel.OutputString(None))
			else:
				
				logging.error('base: missing user request parameter');
				self.response.out.write('Application Error: Invalid Username')
				return
		
		#validate that we have username
		if (userName == None or userName == ''):
			logging.error('base: unable to retrieve username from cookies or request parameters');
			self.response.out.write('Application Error: Invalid Username')
			return
				
		#get all entities
		userAllMilesContainer = {}
		userMilesContainer = {}
		allPersonRecords = db.GqlQuery("SELECT * FROM PersonDB")
		for person in allPersonRecords:
			#update user container
			if userMilesContainer.has_key(person.userid):
				#store total miles
				tmp = userMilesContainer[person.userid]
				newMiles = tmp + person.milesno
				userMilesContainer[person.userid] = newMiles
				
				#store daily miles
				tmpContainer = userAllMilesContainer[person.userid]
				tmpContainer[person.recordid] = person.milesno
				userAllMilesContainer[person.userid] = tmpContainer
			else:
				#store total miles
				miles = person.milesno
				userMilesContainer[person.userid] = miles
				
				#store daily miles
				tmpContainer = {}
				tmpContainer[person.recordid] = miles
				userAllMilesContainer[person.userid] = tmpContainer
		
		#JS for all miles
		userContainerJS = ''
		for key in userAllMilesContainer.keys():
			#go through record/miles container
			tmpUserContainer = userAllMilesContainer[key]
			tmpUserJS = ''
			for childKey in tmpUserContainer.keys():
				tmp = "'%s':'%s'," % (childKey, tmpUserContainer[childKey])
				tmpUserJS = "%s%s" % (tmpUserJS, tmp)
			tmpUserJS = tmpUserJS[0:len(tmpUserJS)-1]
			tmpUserMiles = "milesPeopleContainer['%s'] = {%s};\n" % (key, tmpUserJS)
			userContainerJS = "%s%s" % (userContainerJS, tmpUserMiles)
		
		#JS for total miles
		userTotalContainerJS = ''
		totalAcsysUsers = 0
		for key in userMilesContainer.keys():
			tmpUserMiles = "totalPeopleContainer['%s'] = %s;\n" % (key, userMilesContainer[key])
			userTotalContainerJS = "%s%s" % (userTotalContainerJS, tmpUserMiles)
			totalAcsysUsers = totalAcsysUsers + 1
		
		#ok, this is super ineffecient calling storage again...get all entities for this user
		personRecords = db.GqlQuery("SELECT * FROM PersonDB WHERE userid='%s'" % userName)
		displayMilesDay = ''
		userMilesJS = ''
		totalAcsysMiles = 0.0
		for person in personRecords:
			#get total miles per day
			tmpMiles = "milesContainer['%s'] = %s;\n" % (person.recordid, person.milesno)
			userMilesJS = "%s%s" % (userMilesJS, tmpMiles)
			
			#display total miles per day
			dateObj = person.rundate.strftime('%A, %d')
			dayOfWeek = dateObj
			tmpHTML = "milesHTMLContainer['%s'] = ['%s', '%s'];\n" % (person.recordid, dayOfWeek, person.milesno)
			displayMilesDay = "%s%s" % (displayMilesDay, tmpHTML)
					
		#load custom template filters
		webapp.template.register_template_library('templatefilters')
		#potato award
		displayPotatoAward = False
		if (userName.lower() == 'tasham'):
			displayPotatoAward = True
		
		#keyboard cat
		displayKeyboardCat = False
		if (userName.lower() == 'bryanm' or 
			userName.lower() == 'jacobb' or 
			userName.lower() == 'mattw' or 
			userName.lower() == 'devadmin' or
			userName.lower() == 'prodadmin'
			):
			displayKeyboardCat = True
			displayPotatoAward = True
			
		template_values = {'today_date': todayDateStr, 
							'user_miles_js': userMilesJS, 
							'html_miles_js':  displayMilesDay,
							'acsys_users_miles_js': userTotalContainerJS,
							'acsys_users_total_js': totalAcsysUsers,
							'my_username': userName,
							'total_acsys_miles_js': totalAcsysMiles,
							'acsys_people_miles_js': userContainerJS,
							'is_potato_award': False,
							'is_keyboard_cat': False
							}
		path = os.path.join(os.path.dirname(__file__), 'templates')
		templateName = 'index.html'
		path = os.path.join(path, templateName)
		self.response.out.write(template.render(path, template_values))
 
#ajax call 
class SavePage(BasePage):
	title = 'Welcome!'
	def get(self):
		cookieName = "UserName5K"
		if cookieName in self.request.cookies:
			username = self.request.cookies[cookieName]
		recordid = self.request.get("id")
		milesno = self.request.get("mi")
		datestring = self.request.get("d")
		dateArr = datestring.split('/')
		runYear = 0
		runMonth = 0
		runDay = 0
		if (len(dateArr) == 3):
			runYear = int(int(dateArr[2]))
			runMonth = int(int(dateArr[0]))
			runDay = int(int(dateArr[1]))
		
		if (username and recordid and milesno and runYear > 0 and runMonth > 0 and runDay > 0):
			
			logging.debug('save: username=%s,recordid=%s,milesno=%s,date=%s' % (username,recordid,milesno,datestring))
			
			person_k = db.Key.from_path('PersonDB', '%s_%s' % (recordid,username))
			personRec = db.get(person_k)
			if (personRec != None):
				#self.response.out.write(personRec.milesno)
				logging.debug('save: updating existing instnace')
			else :
				personRec = PersonDB(key_name='%s_%s' % (recordid,username))
				logging.debug('save: creating new instnace')
				
			personRec.recordid = recordid
			personRec.userid = username
			personRec.milesno = eval(milesno)
			personRec.rundate = datetime.datetime(runYear, runMonth, runDay, 12,30)
			logging.debug('save: about to save')
			personRec.put()
			
			self.response.out.write('success')
		else:
			logging.error('save: invalid parameters')
			self.response.out.write('error: invalid parameter(s)')
		

		
def main():
    application = webapp.WSGIApplication([('/', BasePage), 
										('/save', SavePage)
										],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
