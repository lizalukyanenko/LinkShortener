
$(function(){
    $("#signin_button").click(signIn);
    $("#registr_button").click(registr);

function registr(e){
    e.preventDefault();

    var data = {
        username: $('#firstName').val() + $('#lastName').val(),
        login: $('#email').val(),
        password: $('#password').val(),
        passwordConfirm: $('#password_confirm').val()
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/user/signup'
    }).done(function(data){
        console.log(data);
    });
};

function signIn(e){
    e.preventDefault();

    var data = {
        login: $('#inputEmail').val(),
        password: $('#inputPassword').val()        
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/user/signin'
    }).done(function(data){
        if(!data.ok) {
            $('#login h2').after('<p class="error">' + data.error + '</p>');
            if (data.fields) {
                data.fields.forEach(function(item){
                    $('input[name='+ item +']').addClass('error');
                });
            }
        }else{
            $('#login h2').after('<p class="success">Отлично!</p>');   
        }
    });
}

});