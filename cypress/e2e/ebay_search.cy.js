import {scrapeData} from './functions.js';
const numPages = Cypress.env('number_of_pages')
let len = 0;
//const cypress = require("cypress");

describe("Search Ebay", () => {

    context("Website Navigation", () => {
      
            //navigate to baseUrl 'ebay.com'
            it("Navigate to Ebay", () => {
                cy.visit("/");
                cy.url().should("include", "ebay");
            })

            it("Hover mouse over electronics menu", () => {

                //as cypress does not have a hover function we will trigger the electronics element to show the categories
                cy.get('.hl-cat-nav__container')
                    .contains("Electronics")
                    .trigger("mouseover");
                cy.screenshot({capture : 'fullPage'})

                //select apple from the pop-up menu
                cy.get("#mainContent > div.hl-cat-nav > ul > li:nth-child(3) > div.hl-cat-nav__flyout")
                    .invoke("show")
                    .contains("Apple")
                    .click();
            });

            //choose macbook air from popular products section
            //text case doesnt matter - cypress searches for lower and upper case
            it('Should choose "MacBook Air" from "Explore popular products" section', () => {
                cy.url().should("include", "Apple");
                cy.get('.b-visualnav__grid')
                    .contains("MacBook")
                    .click();
                cy.screenshot({capture : 'fullPage'})
            });
        })
       
        //test scrapes data an returns a csv file with title name and their prices
        //can change the number of pages we want in env variables in cypress.config file
        context('run scraping test on multiple pages', () => {
            while (len < numPages) {
                scrapeData();
                it('clicks to the next page', () => {
                    cy.get('.pagination__next').click();
                    cy.url().should('include', 'pgn='+(len+1))
                })
                len++;
            }
        })
})