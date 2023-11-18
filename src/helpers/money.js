function showMoney(value) {
    const formated = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        currencyDisplay: "symbol",
    })
        .format(value)
        .replace("R$", "")
        .trim();
    return formated
}

function moneyToDB(value) {
    let money;

    if (String(value).match(/^[0-9]*\.?[0-9]*$/)) {
        money = Number(value);
    } else {
        money = Number(
            value.replace("R$", "").replace(".", "").replace(",", ".").trim()
        );
    }
    return money;
}

export { showMoney, moneyToDB };