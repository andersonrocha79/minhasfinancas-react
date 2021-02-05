import toastr from 'toastr';

toastr.options = 
{
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function exibirMensagem(titulo, mensagem, tipo)
{
    toastr[tipo](mensagem, titulo);
}

export function mensagemErro(mensagem)
{
    exibirMensagem("Erro", mensagem, "error");
}

export function mensagemSucesso(mensagem)
{
    exibirMensagem("Sucesso", mensagem, "success");
}

export function mensagemAlerta(mensagem)
{
    exibirMensagem("Alerta", mensagem, "warning");
}