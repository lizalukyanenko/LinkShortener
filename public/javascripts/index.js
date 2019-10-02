$(function(){
    $("#shortener_button").click(shortenerUrl);
    $("#reset_button").click(resetUI);
    $("#copy_button").click(copyResult);
    $('#search_input').on('input', search);

function search(e){
    e.preventDefault();
    var data = {
        search_text: $('#search_input').val()
    };

    $.ajax({
        type: 'GET',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/'
    }).done(function(data){
        if(!data.ok) {
            console.log("Ссылок не найдено");
        }else{
            var html2Addd = "<table class='table table-striped'><thead class='table-info'><tr><th>{{texts.original_url}}</th><th>{{texts.short_url}}</th><th>{{texts.author}}</th></tr></thead><tbody>{{#addresses}}<tr><td><a href='{{original_url}}'>{{original_url}}</a></td><td><a href='{{short_url}}'>{{short_url}}</a></td><td>{{author}}</td></tr>{{/addresses}}</tbody></table>"     
            $('#table').prepend(html2Addd);
        } 
    });
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