# Price Chart - Testing

[Back to README.md](README.md)

Throughout the development of the project I used Chrome developer tools to assist with the design when making any changes to HTML and CSS. It is a great tool to assist deciding font sizing, margin, padding etc. before commiting any changes. As it was a mobile first design, by testing with Chrome Developer Tools I was able to add media queries to improve the experience on larger screen sizes. I am happy with how the website turned out I think that it is clear and easy to read on mobile, tablet and desktop devices. Although the website works on all device sizes, I would have to say that it performs better on larger screens as the charts are not as compacted and the data is easier to read.

When I first built the pages with the charts I was having issues with the chart overflowing into the footer. After some testing with Chrome developer tools I found that the issue was that I had set the main section to a fixed height of 100vh which did not allow the section to expand to allow space for the chart and table. By setting the height to min-height 100vh I was able to resolve this issue.

One criticism I have that I found while testing is that with tablet devices (iPad, iPad Pro) there is some whitespace on the contact page due to the aspect ratio of the iPad screens, but overall I am very happy with the project.

## Validation

#### W3C Validator

I ran validator tests throughout the project for the HTML and CSS with the W3C Validator. See below some of the errors that were caught.

![W3C-html-1](assets/documents/testing-images/w3c-html-1.png)

![W3C-html-2](assets/documents/testing-images/w3c-html-2.png)

I investigated and corrected these errors and on the final test there were no errors found for HTML.

When testing the CSS in the validator the following errors were found:

![W3C-css](assets/documents/testing-images/w3c-css.png)

These errors are in the Bootstrap CDN and are therefore out of my control. I ran my own CSS through the validator via direct input and there were no errors found.

#### JSHint

I ran all the JavaScript code through JSHint and I found a few errors which I was able to fix. 

- There were multiple counts of 'missing semicolon' which was easily resolved.
- There was another warning as follows : 'Function declarations should not be placed in blocks. Use a function expression or move the statement to the top of the outer function.' I researched the problem and refactored the code to remove this warning.
- There is another warning that remains present across all JavaScript files: 'template literal syntax is only available in ES6(use esversion:6)'. This can be ignored as Javascript version ES6 is used in the project.

## Web Browser and Device Testing

I tested the functionality of the website across a number of browsers and devices to verify that the website is responsive and the code is supported across different browsers.

- Browsers tested:
    - Google Chrome
    - Firefox
    - Brave 
    - Microsoft Edge
    - Samsung Browser

- Devices tested: 
    - Laptop
    - Desktop
    - Samsung Galaxy S20
    - Xiaomi Mi 9

All website features worked across all browsers and devices tested and the website was responsive on all devices.

## Testing User Stories
