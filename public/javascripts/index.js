
    var addresses = document.getElementsByClassName('.address');
        for(var i = 0; i < addresses.length; i++) {
            addresses[i].onclick = function() {
                for(var j = 0; j < clicks.length; j++){
                    if (i == j) {
                        clicks[j] ++;
                        alert(clicks);
                    }
                }
            };
        }

$(window).on('load', function(){ 
    document.getElementById("search_input").value = localStorage.getItem("search");
    localStorage.removeItem("search");
});

$(function(){
    var clicks = document.getElementsByClassName('.address');
    $("#shortener_button").click(shortenerUrl);
    $("#reset_button").click(resetUI);
    $("#copy_button").click(copyResult);
    $('#search_button').click(search);
    $('')

    // clear
    $('input').on('focus', function() {
        $('label.error').remove();
    });
    
    function search(e){
        e.preventDefault();
        var data = {
            search_text: $('#search_input').val()
        };
        const search = encodeURIComponent(data.search_text).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
        localStorage.setItem("search", `${search}`);
        window.open(`/search/${search}`, "_self");
    }

function shortenerUrl(){
    var longUrl = $("#long_url").val();
    $("#shortener_button").addClass("d-none");

    participantsRequest = $.post("shorten", {
        long_url: longUrl,
    }, function(data, status) {
        $("#shortener_button").removeClass("d-none");
        if (status === "success") {
            if (data.error) {
                $("#shortener_input").addClass("form-control-error");
                $("#long_url_error").removeClass("d-none");
                $("#long_url_error").text(data.error);
            } else {
                $("#shortener_input").addClass("d-none");
                $("#shortener_output").removeClass("d-none");
                $("#result_url").empty();
                $("#result_url").append(data.result);
            }
        } else {
            $("#shortener_input").addClass("form-control-error")
        }
    });
}

function resetUI(){
    $("#shortener_input").removeClass("d-none");
    $("#shortener_output").addClass("d-none");
    $("#shortener_input").removeClass("form-control-error");
    $("#long_url_error").addClass("d-none");
    $("#long_url").val('');
}

function copyResult(){
    copyToClipboard($("#result_url"));
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
});