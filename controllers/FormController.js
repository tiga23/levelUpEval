class FormController {
  form(req, res) {
    return res.render("form");
  }

  check(req, res) {
    const today = new Date();

    //varify card number lenght
    if (req.body.cardNum.length < 16 || req.body.cardNum.length > 19)
      return res
        .status(400)
        .json({ error: "Error Card number must be 16 to 19 digits long" });

    //verify year
    if (req.body.year < today.getFullYear().toString().substr(2)) {
      return res.status(401).json({ error: "Error Card is outdated" });
    }

    //verify month
    if (req.body.year == today.getFullYear().toString().substr(2)) {
      if (req.body.month < today.getMonth() + 1) {
        return res.status(402).json({ error: "Error Card is outdated" });
      }
    }

    //verify type of card
    if (req.body.cardType == "AExpress") {
      if (req.body.cvv.length != 4)
        return res.status(403).json({ error: "Error cvv must be 4 digits" });
      //verift CVV
      if (
        (req.body.cardNum[0] != 3 || req.body.cardNum[1] != 4) &&
        (req.body.cardNum[0] != 3 || req.body.cardNum[1] != 7)
      )
        return res
          .status(404)
          .json({ error: "Error Card number must start by 34 or 37" });
    } else {
      //other cards
      if (req.body.cvv.length != 3)
        return res.status(405).json({ error: "Error cvv must be 3 digits" });
    }

    
    //Luhn algorithm
    let luhnVal = 0;

    for (let index = 0; index < req.body.cardNum.length; index++) {
      let aux;
      if (index == 0 || index % 2 == 0) {
        //for even numbers, multiplies by 2
        aux = req.body.cardNum[index] * 2;
        if (aux > 9) 
            //if the result of the multiplication is above 10, the algorithm splits the number in two, and adds both numbers
            aux = (aux % 10) + Math.trunc(aux / 10);
        luhnVal += aux;
        continue;
      }
      //sum of all the numbers
      luhnVal += parseInt(req.body.cardNum[index]);
    }

    //if the rest of the division of the sum of all the numbers is diferent than zero, then the card number is invalid
    if (luhnVal % 10 != 0){
        return res.status(406).json({ error: "Error Card invalid" });
    }

    return res.status(200).json({ sucess: "Card is valid" });
  }
}

module.exports = new FormController();
