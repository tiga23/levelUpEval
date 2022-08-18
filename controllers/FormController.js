class FormController{
    form(req, res){
        return res.render('form');
    }

    check(req, res){
        console.log("\n" + req.body.name + "\n");
        console.log("\n" +req.body.cvv + " tamnho: "+ req.body.cvv.length + "\n");
        console.log("\n" + req.body.cardNum[0] + + req.body.cardNum[1] + "\n");

        if(req.body.cardType == "AExpress"){
            //se o cvv tem 4 digitos
            if(req.body.cvv.length != 4)
                return res.status(400);
            //se começa por 34 ou 37
            //if(req.body.cardNum)
        
        }
        
        
        
        return res.render('index', { title: 'Express' });
    }
}

module.exports = new FormController();