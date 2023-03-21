let JoaoValidator = {
    handleSubmit:(event) => { //
        event.preventDefault()    //Função que para o comportamento padrão

        let send = true;
        let inputs = form.querySelectorAll("input");
        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = JoaoValidator.checkInput(input);
            if( check !== true) {
                send = false;
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

                    break;
                }
            }
        }
        return true;
    }
}

let form = document.querySelector('.joaovalidator');
form.addEventListener('submit', JoaoValidator.handleSubmit);