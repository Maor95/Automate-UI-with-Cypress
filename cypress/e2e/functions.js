export function scrapeData(){ 
    it("Scrape Data", function() {
    let results = ["Title of Item, Price"];
    let prices = [];
    let titles = [];
    cy.get(":nth-child(1)").within(() => {
        cy.get(".s-item__title").each(($title) => {
          titles.push($title.text())
        })
        cy.get(".s-item__price").each(($price) => {
          prices.push($price.text())
        });
    }).then(() => {
        titles.forEach((tit, titIndex)=> {
          prices.forEach((pri, priIndex) => {
            if (titIndex === priIndex) {
               const regexed = `${tit}, ${pri}`
               let finalizedRegex = regexed.replace(/,/g, '')
               finalizedRegex = finalizedRegex.replace(/ILS/g, ", ILS")
              results.push(finalizedRegex)
            }
          })
        })
        let csv = results.join("\n")

        cy.writeFile("results.csv", csv, { flag: 'a+' });
        cy.writeFile("results.csv", '\n', {flag: 'a+'})
      })
    })
  }

