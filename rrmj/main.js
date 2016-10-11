$(document).ready(function() {
	
	var seasonId
	
	var videohandler = function(index, element) {
		console.log(element.episode)
		var id = "episod" + index
		
		$("#list").append("<li ><a href='#' id='" + id + "'>" + element.episode + "</a></li")	
		
		$("#" + id).click(function(){
			$.ajax({
				type: 'POST',
				url: "http://api.rrmj.tv/video/findM3u8ByEpisodeSid",
				data: "seasonId=" + seasonId + '&episodeSid=' + element.sid + '&quality=high',
				headers: {
					"clientVersion" : "99.99"
				},
				success: function(data) {
					console.log(data.data.m3u8.url);
					$("#url").empty()
					$("#url").append("<a target='_blank' href='" + data.data.m3u8.url + "'> Play the episode </a>")
				},
			})
		})
	}
	
	var liHandler = function(index, element) {
		
		console.log(element.title)
		var id = "episod" + index
		$("#list").append("<li ><a href='#' id='" + id + "'>" + element.title + "</a></li>")
		var epHandler = function() {
			seasonId = element.id
			$.ajax({
				type: 'POST',
				url: "http://api.rrmj.tv/season/detail/",
				data: "seasonId=" + element.id,
				headers: {
					"clientVersion" : "99.99"
				},
				success: function(data) {
					console.log(data);
					$("#list").empty();
					$.each(data.data.season.episode_brief, videohandler)
				},
			})
		}
		$("#" + id).click(epHandler)
	};
	
	
	var handler = function(e) {
		console.log('click button')
		var keyword = $("#stxt").val();
		console.log(keyword)
		$.ajax({
			type: 'POST',
			url: "http://api.rrmj.tv/season/search/",
			data: "page=1&rows=20&name=" + keyword,
			headers: {
				"clientVersion" : "99.99"
			},
			success: function(data) {
				console.log(data);
				$("#list").empty();
				$.each(data.data.results, liHandler)
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('error')
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
		
	};
	$("#sbtn").click(handler);
	console.log('ready')
	
});