(function() {
	$("#submitContactBtn").on("click", function() {
		 $.ajax({
            url: NET.SERVER + 'leaveMsg',
            type:'POST',
            data: {
                nickname: $("#nickName").val(),
				email: $("#email").val(),
				content: $("#content").val()
            },
            success: function(resp) {
                if (resp.status === 'success') {
                    $("#nickName").val("");
                    $("#email").val("");
                    $("#content").val("");
                	alert("留言成功");
                } else {
                    alert("留言失败");
                }
            },
            fail: function(e) { 
                alert("留言失败");
            }
        });
	})
})();