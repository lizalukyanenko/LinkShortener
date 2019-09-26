
$(function(){
    $("#signin_button").click(signIn);
    $("#signup_button").click(signUp);

    // clear
    $('input').on('focus', function() {
        $('label.error').remove();
        $('input').removeClass('error');
    });

function signUp(e){
    e.preventDefault();

    var data = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        login: $('#login').val(),
        password: $('#password').val(),
        passwordConfirm: $('#passwordConfirm').val()
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/user/signup'
    }).done(function(data){
        if (!data.ok) {
            var html2Addd = "<h3><label class='form-control error'>" + data.error + "</label></h3>";
            $('#signup').prepend(html2Addd);
            if (data.fields) {
                data.fields.forEach(function(item){
                    $("#"+item).addClass('error');
                });
            }
        } else {
            // var html2Addd = "<h3><label class='form-control success'>Отлично</label></h3>";
            // $('#signup').prepend(html2Addd);
            $(location).attr('href', '/');
        }
    });
}

function signIn(e){
    e.preventDefault();

    var data = {
        login: $('#login').val(),
        password: $('#password').val()      
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/user/signin'
    }).done(function(data){
        if(!data.ok) {
            var html2Addd = "<h3><label class='error'>" + data.error + "</label></h3>";
            $('#signin').prepend(html2Addd);
            if (data.fields) {
                data.fields.forEach(function(item){
                    $("#"+item).addClass('error');
                });
            }
        }else{
            // var html2Addd = "<h3><label class='success'>Отлично</label></h3>";
            // $('#signin').prepend(html2Addd); 
            $(location).attr('href', '/');
        }
    });
}

});