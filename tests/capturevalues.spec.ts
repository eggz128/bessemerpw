import { test, expect } from '@playwright/test';

test('Assertions', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');
    
    /* 
    <head>
        <title>Get this text</title>
    </head>
    */
    const pageTitle = await page.title();
    await page.pause();
    console.log(`The page title is: ${pageTitle}`);
    //I did not expect this to work as title content is in head and not shown in viewport
    console.log(`The page title is: ${await page.locator('title').textContent()}`);
    console.log(`The page title is: ${await page.locator('title').innerText()}`);

    /* 
    <body>
        <h1>Get this text</h1><!--or the text of any other element with text between a start and end tag-->
    </body> 
    */
    const pageHeading = await page.getByRole('heading'/* , { name: 'Forms' } */)
    console.log(`The page heading is: ${await pageHeading.textContent()}`)
    /*
        <div id='right-column'>
            <h1>Get this</h1>
            <div>
                <p>And this</p>
            </div>
        </div>
    */
    const rightColumn = await page.locator('#right-column')
    console.log(`The right column text is: \n ${await rightColumn.textContent()}`) //Returns all text of target and decendant elements *even if not visible* after layout
    console.log(`VS the right column inner text is: \n ${await rightColumn.innerText()}`) //Returns text *after* layout. Hidden text will not be included. Text transformed using CSS (text-transform: uppercase;} will be UPPERCASE (may be lowercase in browser DOM view)

    console.log(`HTML of right column: \n ${await rightColumn.innerHTML()}`)


    /*
        <element someattr=getthisval></element>
    */

    const checkbox = await page.locator('input#checkbox');
    console.log(`name attribute is: ${await checkbox.getAttribute('name')}`)
    console.log(`checked property is: ${await checkbox.evaluate(e => (e as HTMLInputElement).checked)}`) //'as' is TS not JS 

    /*
        <input />
        <textarea>Default Content by developer</textarea>
        <div contenteditable></div>
    */

    const inputElm = await page.locator('#textInput');
    await inputElm.fill("Input elements have no inner text");
    const textareaElm = await page.locator('#textArea');
    await textareaElm.fill("Text areas do but \n it is default content")
    
    console.log(`This will be blank: ${await inputElm.textContent()}`)
    console.log(`This will be blank: ${await textareaElm.textContent()}`)
    //Attempt to do this as Selenium Webdriver does
    //fail - getAttribute really is just for attributes you see in the DOM
    console.log(`To read the values get the value attr: ${await inputElm.getAttribute('value')}`)
    console.log(`To read the values get the value attr: ${await inputElm.getAttribute('value')}`)

    const inputVal = await inputElm.inputValue();
    console.log(`Input typed val was: ${inputVal}`)
    const textAreaVal = await textareaElm.inputValue();
    console.log(`TextArea typed val was: ${textAreaVal}`)

    //In either case if you are capturing a value to assert on e.g:
    expect(inputVal).toBe('Input elements have no inner text')
    //Prefer to do this (act on the locator directly):
    await expect(inputElm).toHaveValue('Input elements have no inner text')

});

test('Generic methods', async ({ page }) => {
    /*
    Discouraged
    This method does not wait for the element to pass actionability checks and therefore can lead to the flaky tests.
    Use locator.evaluate(), other Locator helper methods or web-first assertions instead.
    */

    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');
    const headingText = await page.$eval('h1', elm => elm.textContent) //Note textContent here is a property, not a method as before. elm is a HTMLElement, not a Playwright Locator.
    //Change h1 to h2 and note no waits or retries for non existent h2
    console.log(`Heading is: ${headingText}`)

    const menuLinks = await page.$$eval('#menu a', (links) => links.map((link) => link.textContent))
    console.log(`There are ${menuLinks.length} links`)
    console.log('Those links are:')
    for (const iterator of menuLinks) {
        console.log(iterator?.trim())
    }
    //But you should prefer to do something like this:
    const preferredMenuLinks = await page.locator('#menu a').all()
    for (const elm of preferredMenuLinks) {
        console.log(`${await elm.textContent().then(text => text?.trim())}`)
    }
});