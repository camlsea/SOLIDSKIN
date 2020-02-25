	$("textarea").attr("cols","150").autoGrow().attr("style", "width:100%").attr("rows","5");

	$("textarea")
	  .bind('blur',function(event) {
		 	$(this).attr("cols","150").autoGrow().attr("style", "width:100%");
			if($(this).attr("rows")>5) {
			    $(this).attr("rows","5");
			}
    }).bind('click',function(event) {
			if($(this).attr("rows")<5) {
				$(this).attr("rows","5").autoGrow().attr("style", "width:100%");
			}
    });