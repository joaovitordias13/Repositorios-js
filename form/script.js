let JoaoValidator = {
    handleSubmit:(event) => { //
        event.preventDefault()    //Função que para o comportamento padrão

        let send = true;
        let inputs = form.querySelectorAll("input");

        JoaoValidator.clearErrors(); 

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = JoaoValidator.checkInput(input);
            if( check !== true) {
                send = false;
                JoaoValidator.showError(input, check);
                //exibir erro
            }
        }
        if(send){
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('/');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case "required":
                       if(input.value == '') {
                        return "Campo obrigatório.";
                       }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return "Campo tem que ter pelo menos " +rDetails+ ' caracteres'
                        }
                    break;
                    case'email':
                    if(input.value != "") {
                       let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Regra para expressão irregular
                       if(!regex.test(input.value.toLowerCase())){
                        return "E-mail não e válido!";
                       }
                    }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
       input.style.borderColor = '#FF0000';

       let errorElement = document.createElement('div');
       errorElement.classList.add('error');
       errorElement.innerHTML = error;

       input.parentElement.insertBefore(errorElement, input.ElementSibling)// insertBefore --- Eu consigo adicionar um elemento antes do campo
    },//ElementSibling -- antes do meu campo                                            //parentElement -- Volta um item pra cima
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for( let i=0;i<inputs.length;i++) {
            inputs[i].style = "";
        }

        let errorElementS = document.querySelectorAll('.error');
        for(let i =0;i<errorElementS.length;i++) {
            errorElementS[i].remove();
        }
    }
};

let form = document.querySelector('.joaovalidator');
form.addEventListener('submit', JoaoValidator.handleSubmit);