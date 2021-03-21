# Website for Price Chart

![Price Chart](assets/documents/mockups/pricechart-mockup.png)

## Code Institute Milestone Project 2 : Interactive Front End Development

Price Chart is a website designed to provide users with the ability to search for real-time and historical data for stocks, foreign exchange and crypto-currency prices and view this data on a chart. The website will be easy to navigate and the information will be simple to comprehend by users who are familiar with and also those who are not so familiar with financial data. 

A link to the live website can be found [here.](https://shaneoh10.github.io/price-chart-ms2/)

## UX

## Strategy

The price chart website is for users who are looking for real-time and historical data on stocks, foreign exchange and crypto-currency prices.The users may be interested in viewing this data for their own personal reasons like investing or trading, or they may want to view this data for research they may be performing as part of a project for a college course. The website will be simple to navigate and the data will be presented in a clear and easy to read format. As this website will only contain basic stock data it is targeted towards users with less experience with financial data as it may not be suited for experienced traders who are looking for more comprehensive data for their analysis, however, the website will have a professional feel to it and the data will be accurate so it is not strictly limited to beginners. The users of the price chart website will want to see clean and clearly labeled charts (price, date, time, stock name) that will not cause them any confusion with only relevant information being displayed to the user.

#### As a user I want to:
* be able to instinctively navigate the website to efficienty find the required information
* be able to understand what the site is about and how it works
* easily search for and view price charts for stocks, foreign exchange and crypto-currencies
* be able to choose different time intervals on the price charts
* be able to view the website on various devices (mobile, tablet, desktop)
* be able to easily contact price chart with any questions or issues I am have regarding the website
* be easily directed to any social media channels to remain up to date with price chart

## Scope 

After analysing the user stories, I have decided to include the following features as my minimum scope:
* Responsive design
* Information on how the website works
* Individual sections for stocks, crypto-currency and foreign exchange (forex)
* Price charts for each section with buttons to choose time interval of chart
* Contact form
* Social media links in footer

## Structure 

I did some research on other websites that provide stock data and price charts to give me an idea of what users are familiar with. During my research I found that some websites provide a lot of data which may be difficult to understand and can be intimidating to less experienced users. Because of this I decided to design the website in a traditional manner similar to what I found on my research but with just the basic price data in the chart sections so as not to give users an overload of information. The website is designed to be easy to navigate and all information is displayed in a clean manner so that users will have a familiar and enjoyable experience.

I have structuted the website with: 
* A brand logo on the top left with a navbar to the right as is common to most websites
* A collapsible navbar with a hamburger icon for smaller screens
* 5 seperate pages - Home, Stocks, Forex, Crypto, Contact
* Navbar and footer common to all 5 pages
* Social media icons in the footer
* Main content written in bootstrap for responsive design

## Skeleton 

I designed wireframes for mobile, tablet and desktop using Balsamiq. These wireframes can be viewed [here.](https://github.com/shaneoh10/price-chart-ms2/tree/master/assets/documents/wireframes)

## Surface

#### Colours

I chose a neutral colour palette for the website so as not to distract the users from the information that they are looking for. The main buttons and charts are blue which provides a good contrast from the neutral palette and makes it easier for users to find their way around the site and read the chart data.

* #FAFAFA - Cultured (off-white)
* #F8F8F8 - Cultured (off-white)
* #242424 - Eerie Black
* #5086FC - United Nations Blue
* #D6D4D4 - Light Gray
* #286CFD - Ultramarine Blue
* #EBEBEB - Platinum

#### Typography 

I chose 'Cabin' as the font for the project as it is easy to read and it provides users with a sense of professionalism about the website.

## Features 

#### Across all pages:

* The navbar will be visible at the top of the page across all pages of the website. The navbar has the Price Chart logo on the left and there are three navigation items on the right-hand side: Home, Charts & Contact. The Charts item has a dropdown menu with links to travel to three pages: Stocks, Forex & Crypto. The navbar collapses into a hamburger icon on smaller screens.
* The footer will be visible at the bottom of the page across all pages of the website. The footer contains the pricechart logo, a copyright notice, social media links, a navigation menu and a list of contact details. I decided to include all of this information in the footer so that it can be accessed by users from any page of the website and it makes the website feel more professional and legitimate as there is no information being hidden from users.

#### Home page: 

##### Header:
* There is a background image of a newspaper containing charts and financial data. With this high-quality image it will immediately become apparent to users what the subject of the website is and it will give users a first impression of a professional service. The image also ties in with the neutral colour palette chosen for the site.
* A main heading containing the company slogan and sub-heading providing a brief description of the service, quickly draw user attention to this area of the page.
* Two buttons, a Go! call-to-action and a Contact Us button to encourage users to either browse the website and use to the service or contact the company to learn more about the service or raise any issues. The go button is a contrasting blue colour to attract user attention. Both buttons change colour on hover to provide feedback to the user.
* On larger screen sizes there is a table containing real stock data on Tesla Inc which is fetched from an API. This is to show users an example of the type of data that is available on the website.

##### Chart Section:
* This section contains three cards that contain a brief description of each of the financial charts that are available on the website (Stocks, Forex, Crypto) and a button to go to each page. The purpose of this section is to provide users with less of an understanding of the financial markets a bit of information on the charts that they will be looking at.

#### Stocks page: 
* This page contains a description on how to generate a chart, a search bar to enter a stock symbol and four buttons to choose the desired time interval of the chart. The chart is then generated when users press the Go! button next to the search bar. When the user presses the Go button the chart is displayed on the page below the time interval buttons. Below the chart a table containing stock data on the company that the user has searched for is displayed. All data in the chart and table is real data fetched from an API.
* A loading gif is displayed when a chart is being generated to provide users with feedback that the page is loading.
* If the user tries to generate a chart without entering a stock symbol they will be prompted to enter a symbol.
* Any errors that occur when generating a chart will be displayed on screen to the user. (invalid symbol, too many API requests etc.)
* To improve user experience I decided to program the chart to load when the page is opened with a default value (Microsoft Corp) so that users are not greeted with an empty page.

#### Forex page: 
* This page contains a description on how to generate a chart, a dropdown menu to choose a currency pair and four buttons to choose the desired time interval of the chart. The chart is then generated when users press the Go! button next to the search bar. When the user presses the Go button the chart is displayed on the page below the time interval buttons. Below the chart a table containing market data on the currency pair that the user has chosen is displayed. All data in the chart and table is real data fetched from an API.
* A loading gif is displayed when a chart is being generated to provide users with feedback that the page is loading.
* Any errors that occur when generating a chart will be displayed on screen to the user. (invalid symbol, too many API requests etc.)
* To improve user experience I decided to program the chart to load when the page is opened with a default value (EUR/USD) so that users are not greeted with an empty page.

#### Crypto page: 
* This page contains a description on how to generate a chart, a dropdown menu to choose a cryptocurrency and four buttons to choose the desired time interval of the chart. The chart is then generated when users press the Go! button next to the search bar. When the user presses the Go button the chart is displayed on the page below the time interval buttons. Below the chart a table containing market data on the cryptocurrency that the user has chosen is displayed. All data in the chart and table is real data fetched from an API.
* A loading gif is displayed when a chart is being generated to provide users with feedback that the page is loading.
* Any errors that occur when generating a chart will be displayed on screen to the user. (invalid symbol, too many API requests etc.)
* To improve user experience I decided to program the chart to load when the page is opened with a default value (BTC- Bitcoin) so that users are not greeted with a blank page.

#### Contact page: 
* There is a contact form which is set up with email.js so that users can send a message with any questions or concerns they have about the website.
* When the user presses the send button a loader gif is displayed and when the message has successfully sent a message providing that feedback is displayed.
* On larger screens a list of contact details is displayed on screen. The email address and phone number on display have anchors attached to open up your email or phone when clicked to make it easier to get in contact.

