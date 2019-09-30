$(function(){
    $("#shortener_button").click(shortenerUrl);
    $("#reset_button").click(resetUI);
    $("#copy_button").click(copyResult);


function shortenerUrl(){
    var longUrl = $("#long_url").val();
    $("#shortener_button").addClass("disabled");

    participantsRequest = $.post("shorten", {
        long_url: longUrl,
    }, function(data, status) {
        $("#shortener_button").removeClass("disabled");
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