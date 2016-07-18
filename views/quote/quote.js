(function() {
	$("#submitContactBtn").on("click", function() {
		 $.ajax({
            url: NET.SERVER + 'getAQuote',
            type:'POST',
            data: {
                nickname: $("#nickName").val(),
				email: $("#email").val(),
                phone: $("#phone").val(),
                company: $("#company").val(),
				content: $("#content").val()
            },
            success: function(resp) {
                if (resp.status === 'success') {
                    $("#nickName").val("");
                    $("#email").val("");
                    $("#phone").val("");
                    $("#company").val("");
                    $("#content").val("");
                	alert("询价成功");
                } else {
                    alert("询价失败");
                }
            },
            fail: function(e) { 
                alert("询价失败");
            }
        });
	})
})();