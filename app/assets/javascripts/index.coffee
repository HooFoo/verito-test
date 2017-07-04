# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

changePass = null
changePassShow = () ->
	changePass.addClass "active"
changePassHide = () ->
	changePass.removeClass "active"

$(document).ready ->
	changePass = $(".change-pass_wrapper")
	$("#change-pass_open").on "click", (event) ->
		event.preventDefault()
		changePassShow()
	$(".change-pass_wrapper").on "click", (event) ->
		if event.target is @ or event.target is changePass.find(".change-pass_cross").get(0)
			changePassHide()
	changePass.find("input[type='submit']").on "click", (event) ->
		newpass = changePass.find("input[name='newpass']").val()
		repeatpass = changePass.find("input[name='repeatpass']").val()
		if newpass.length < 6 or newpass isnt repeatpass
			event.preventDefault()
	changePass.find("input[type='password']").on "change input", (event) ->
		newpass = changePass.find("input[name='newpass']")
		repeatpass = changePass.find("input[name='repeatpass']")
		if 0 < newpass.val().length < 6
			newpass.addClass "wrong"
			repeatpass.removeClass "wrong"
		else if 0 < newpass.val().length and newpass.val() isnt repeatpass.val()
			repeatpass.addClass "wrong"
			newpass.removeClass "wrong"
		else
			newpass.removeClass "wrong"
			repeatpass.removeClass "wrong"