'use strict';

console.log("Thanks for checking out the code. Reach out to us at team@lorem.tech");

var encodeEmail = function(email) {
	if (!email) return '';
	try {
		var encoded = btoa(unescape(encodeURIComponent(email)));
		return encoded;
	} catch (e) {
		return '';
	}
}

function createCookie(name,value,days,domain) {
	var expires = "";
	var domainStr = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}

	if (domain) domainStr = '; domain='+domain;
	document.cookie = name+"="+value+expires+domainStr+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function checkAndSetReffCookie(val) {
	var newString = '';
	var splitArr = val.split('|');
	while (newString.length < 2000 && splitArr.length) {
		var lastest = splitArr.pop();
		if (newString) lastest += '|';
		newString = lastest + newString;
	}
	createCookie('__reff', newString, 1000, '.lorem.tech');
}

var emailStr = readCookie('email') || '';
var typeStr = readCookie('type') || '';
var reffStr = readCookie('__reff') || '';

if (reffStr) checkAndSetReffCookie(reffStr);
if (emailStr) {
	var encoded = encodeEmail(emailQueryParam);
	if (encoded) ga('set', 'userId', encoded);
}
if (typeStr) {
	ga('set', 'dimension1', typeStr);
}